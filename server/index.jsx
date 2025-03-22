import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.jsx';
import apiRoutes from './routes/api.jsx';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/examples', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));