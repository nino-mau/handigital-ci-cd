# Liste de tâches

Application d'exemple du module « CI/CD avec Jenkins ».

## 1. Le site

Adresse du site en ligne : <https://sweet-otter-48dee2.netlify.app/>.

## 2. Démarrer Jenkins

```sh
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts-jdk21
```

Ouvrir Jenkins à l'adresse : <http://localhost:8080>.

Pour récupérer le mot de passe initial :

```sh
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Pour redémarrer le conteneur après un arrêt : `docker start jenkins`.

## 3. Configuration

- Installer les plugins **NodeJS**, **Git**, **Pipeline** et **JUnit**.
- Dans **Administrer Jenkins > Outils**, ajouter Node.js 22 sous le nom exact `node22`.
- Ajouter deux identifiants de type **Secret text** :

  | ID Jenkins | Valeur |
  | --- | --- |
  | `netlify-token` | Jeton d'accès Netlify |
  | `netlify-site` | Identifiant du site Netlify |

- Créer un job **Pipeline**, choisir **Pipeline script from SCM > Git**, renseigner le dépôt et la branche à suivre, puis utiliser `Jenkinsfile` comme chemin du script.
- Si Netlify est relié au dépôt Git, désactiver ses déploiements automatiques pour conserver la validation Jenkins.

Ne jamais enregistrer les secrets dans Git.

## 4. Le pipeline

1. **Installer** : installe les dépendances avec `env SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm ci`.
2. **Tester** : lance `npm run test:ci` et produit le rapport JUnit `rapport.xml`.
3. **Construire** : lance `npm run build` et archive le dossier `dist` dans Jenkins.
4. **Prévisualiser** : publie `dist` sur une URL de prévisualisation avec `npm run deploy:preview`, sans modifier la production.
5. **Valider** : attend une approbation manuelle à la question « Mettre en ligne ? ».
6. **Déployer** : publie `dist` en production avec `npm run deploy`.

## 5. Mettre en ligne

1. Enregistrer les changements et les pousser sur la branche suivie par Jenkins :

   ```sh
   git add <fichiers-modifies>
   git commit -m "Décrire le changement"
   git push
   ```

2. Cliquer sur **Construire maintenant** pour la première exécution ; ensuite, Jenkins vérifie les changements Git environ toutes les deux minutes.
3. Attendre la réussite des tests et de la construction, puis ouvrir l'URL affichée dans la sortie console de l'étape **Prévisualiser**.
4. Vérifier la prévisualisation avec le [plan de tests](PLAN_DE_TESTS.md).
5. À l'étape **Valider**, approuver « Mettre en ligne ? » si tout fonctionne ; sinon, abandonner l'exécution pour laisser la production inchangée.
6. Après l'étape **Déployer**, vérifier le site en ligne.

## 6. Revenir en arrière

Abandonner les exécutions Jenkins en attente de validation qui contiennent le changement défectueux, puis annuler ce commit sur la branche suivie par Jenkins :

```sh
git pull --ff-only
git log --oneline
git revert <sha-du-commit-defectueux>
git push
```

Vérifier la prévisualisation du nouveau pipeline, puis approuver l'étape **Valider** pour remettre la version corrigée en production.
