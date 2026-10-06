# Plan de tests

Un cas de test par ligne.
La colonne « Vérifié par » contient `Test automatisé` ou `À la main`.

| N°  | Action                                                                                  | Résultat attendu                                                                                                                                         | Vérifié par     |
| --- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| 1   | Appeler `ajouterTache([], "Lire")`.                                                     | La liste renvoyée contient exactement 1 tâche, dont le titre est `Lire`.                                                                                 | Test automatisé |
| 2   | Ajouter `Lire` à une liste vide, puis appeler `supprimerTache(liste, "Lire")`.          | La liste renvoyée contient exactement 0 tâche.                                                                                                           | Test automatisé |
| 3   | Ajouter `Lire` à une liste vide, puis appeler `compterTaches(liste)`.                   | La fonction renvoie exactement `1`.                                                                                                                      | Test automatisé |
| 4   | Ouvrir la page, saisir `Courses` dans « Nouvelle tâche », puis cliquer sur « Ajouter ». | Une seule tâche, intitulée `Courses`, apparaît avec un bouton « Supprimer » ; le compteur affiche `Nombre de tâches : 1` et le champ de saisie est vide. | À la main       |
| 5   | Avec uniquement la tâche `Courses` dans la liste, cliquer sur son bouton « Supprimer ». | La liste est vide et le compteur affiche `Nombre de tâches : 0`.                                                                                         | À la main       |
