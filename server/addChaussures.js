import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Chaussure from './models/chaussureModel.js';

dotenv.config(); // Charge les variables d’environnement

// Connexion à la BDD
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connecté à MongoDB');

        // Création d'un objet
        const chaussure = new Chaussure({
            titre: "Adidas Ultraboost",
            nom: "Ultraboost",
            marque: "Nike",
            taille: 43,
            couleur: "Noir",
            categorie: "Running",
            prix: 180,
            image: "https://exemple.com/ultraboost.jpg",
            description: "Chaussures de running ultra confortables."
        });

        // Sauvegarde dans MongoDB
        await chaussure.save();
        console.log("✅ Chaussure ajoutée !");
        
        // Fermeture de la connexion
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Erreur :", error);
        process.exit(1);
    }
};

// Exécuter le script
connectDB();
