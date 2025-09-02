

// Services.js
// Ce fichier contient des fonctions utilitaires pour le quiz

export function selectionneurQuestion(nombreQuestions){
    // On crée un tableau avec les indices des questions possibles (32 questions)
    const indices = Array.from({length: 32}, (_, index) => index);

    // On mélange le tableau des indices avec l'algorithme de Fisher-Yates
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // On sélectionne les premiers 'nombreQuestions' indices du tableau mélangé
    return indices.slice(0, nombreQuestions);

}

export function MelangeurTableau(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
    }
    return tableau;
}
