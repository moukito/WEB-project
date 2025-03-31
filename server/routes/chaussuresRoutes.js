import express from 'express';
import Chaussure from '../models/chaussureModel.js'; // Importation du modèle

const router = express.Router();

//  Route pour créer une chaussure (Méthode POST)
router.post('/', async (req, res) => {
    try {
        const { titre, nom, marque, taille, couleur, categorie, prix, image, description } = req.body;
        
        // Création de l'objet chaussure
        const nouvelleChaussure = new Chaussure({
            titre,
            nom,
            marque,
            taille,
            couleur,
            categorie,
            prix,
            image,
            description
        });

        // Sauvegarde dans la base de données
        const chaussureSauvegardee = await nouvelleChaussure.save();
        
        res.status(201).json(chaussureSauvegardee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour supprimer une chaussure (Méthode DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const chaussureId = req.params.id;

        // Recherche et suppression de la chaussure
        const chaussureSupprimee = await Chaussure.findByIdAndDelete(chaussureId);

        if (!chaussureSupprimee) {
            return res.status(404).json({ message: "Chaussure non trouvée" });
        }

        res.status(200).json({ message: "Chaussure supprimée avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour filtrer les chaussures (Méthode POST)
router.post('/filtrer', async (req, res) => {
    try {
        // Vérifie les filtres envoyés par le client
        const { marque, taille, prix_min, prix_max, categorie } = req.body;
        const filtre = {};

        // Log des filtres reçus
        console.log('Filtres reçus:', req.body);

        // Applique les filtres uniquement si des données sont envoyées
        if (marque) filtre.marque = marque;
        if (taille) filtre.taille = taille;
        if (prix_min || prix_max) filtre.prix = {};
        if (prix_min) filtre.prix.$gte = prix_min;
        if (prix_max) filtre.prix.$lte = prix_max;
        if (categorie) filtre.categorie = categorie;

        // Log du filtre utilisé
        console.log('Filtre appliqué:', filtre);

        // Recherche les chaussures correspondant aux filtres (si aucun filtre, on récupère toutes les chaussures)
        const chaussuresFiltrees = await Chaussure.find(filtre);

        // Log des chaussures trouvées
        console.log('Chaussures trouvées:', chaussuresFiltrees);

        res.status(200).json(chaussuresFiltrees);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(400).json({ message: error.message });
    }
});




export default router;
