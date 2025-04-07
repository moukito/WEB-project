import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connecté : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion MongoDB : ${error.message}`);
        process.exit(1); // Stoppe le serveur en cas d'erreur
    }
};

export default connectDB;
