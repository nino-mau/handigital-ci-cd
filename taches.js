// Les fonctions de la liste de tâches.
// Une tâche est un objet : { titre: 'Lire', terminee: false }
// Aucune fonction ne modifie la liste reçue : chaque fonction renvoie une nouvelle liste.

// Renvoie une nouvelle liste, avec une tâche en plus à la fin.
export function ajouterTache(liste, titre) {
	return [...liste, { titre: titre, terminee: false }];
}

// Renvoie une nouvelle liste, sans la tâche qui porte ce titre.
export function supprimerTache(liste, titre) {
	return liste.filter((tache) => tache.titre !== titre);
}

// Renvoie une nouvelle liste, avec la tâche qui porte ce titre terminée.
export function terminerTache(liste, titre) {
	return liste.map((tache) =>
		tache.titre === titre ? { ...tache, terminee: true } : tache,
	);
}

export function compterTaches(liste) {
	return liste.length;
}
