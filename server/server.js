import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Ajoute ça si tu as des erreurs CORS
import connectDB from './config/db.js';
import chaussureRoutes from './routes/chaussuresRoutes.js'; // Chemin corrigé ✅

dotenv.config(); // Charge les variables d’environnement
connectDB(); // Connexion à MongoDB

const app = express();
app.use(cors()); // Active CORS si besoin ✅
app.use(express.json());

// Utilisation des routes chaussures
app.use('/api/chaussures', chaussureRoutes); // Décommente cette ligne ✅

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
