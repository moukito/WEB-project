import mongoose from 'mongoose';

const chaussureSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    nom: {
        type: String
    },
    marque: {
        type: String,
        required: true
    },
    taille: {
        type: Number, 
        required: true
    },
    couleur: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        enum: ['LifeStyle', 'Football', 'Basketball', 'Running'], // Exemples de catégories possibles
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Chaussure = mongoose.model('Chaussure', chaussureSchema);

export default Chaussure;
