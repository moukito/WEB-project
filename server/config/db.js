import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {

    });
    console.log('Base de données connectée avec succès');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error.message);
    process.exit(1); // Quitte le programme en cas d'erreur
  }
};

export default connectDB;