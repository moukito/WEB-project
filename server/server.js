import express from 'express';
import connectDB from './config/db.js';  // Importer ta fonction de connexion
import Menu from './models/menuModel.js'; // Import du modèle Menu
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());

// Appeler la fonction pour se connecter à la base de données
connectDB();


// Route pour afficher les documents de la collection 20_repas
app.get('/api/20_repas', async (req, res) => {
    try {
      const collection = mongoose.connection.db.collection('20_repas');
      const data = await collection.find({}).toArray();
      res.json(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });