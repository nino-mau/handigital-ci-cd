import { expect, test } from "vitest";
import {
	ajouterTache,
	compterTaches,
	supprimerTache,
	terminerTache,
} from "./taches.js";

test("ajoute une tâche à la liste", () => {
	const liste = ajouterTache([], "Lire");
	expect(liste.length).toBe(1);
	expect(liste[0].titre).toBe("Lire");
});

test("supprime une tâche", () => {
	const liste = ajouterTache([], "Lire");
	const vide = supprimerTache(liste, "Lire");
	expect(vide.length).toBe(0);
});

test("termine une tâche sans modifier la liste reçue", () => {
	const liste = ajouterTache(ajouterTache([], "Lire"), "Écrire");
	const resultat = terminerTache(liste, "Lire");

	expect(resultat).toEqual([
		{ titre: "Lire", terminee: true },
		{ titre: "Écrire", terminee: false },
	]);
	expect(liste[0].terminee).toBe(false);
	expect(resultat).not.toBe(liste);
});

test("ne change rien si la tâche à terminer n'existe pas", () => {
	const liste = ajouterTache([], "Lire");
	expect(terminerTache(liste, "Écrire")).toEqual(liste);
	expect(terminerTache([], "Lire")).toEqual([]);
});

test("une tâche déjà terminée reste terminée", () => {
	const liste = terminerTache(ajouterTache([], "Lire"), "Lire");
	expect(terminerTache(liste, "Lire")).toEqual(liste);
});

test("compte les tâches", () => {
	const liste = ajouterTache([], "Lire");
	expect(compterTaches(liste)).toBe(1);
});
