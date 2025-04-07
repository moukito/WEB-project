import express from 'express';
import Chaussure from '../models/chaussureModel.js'; // Assure-toi que ce modèle existe et est bien importé

const router = express.Router();

// Route pour récupérer toutes les chaussures
router.get('/', async (req, res) => {
  try {
    const chaussures = await Chaussure.find(); // Récupère toutes les chaussures dans la base de données
    res.json(chaussures); // Envoie la réponse sous forme JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

export default router;
