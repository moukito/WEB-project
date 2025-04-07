import mongoose from 'mongoose';

/* Définir le schéma d'un ingredient */
const ingredientSchema = new Schema({
    type: { type: String, required: true },
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    saison: { 
      type: String, 
      required: true,
      enum: ['été', 'automne', 'hiver', 'printemps', 'toute']
    },
    allergenes: { 
      type: String,
      default: ""
    }
  });

/* Définir le schéma d'un repas */
const repasSchema = new Schema({
    nom: { type: String, required: true },
    ingredients: [ingredientSchema],
    caracteristique: { type: String, required: true }
  });

/* Définir le schéma d'un menu */
const menuSchema = new Schema({
    id: { 
      type: Number, 
      required: true,
      unique: true 
    },
    nom_menu: { 
      type: String, 
      required: true,
      trim: true
    },
    entrees: [repasSchema],
    plats: [repasSchema],
    desserts: [repasSchema]
  });

const menu = mongoose.model('menu', menuSchema);

export default menu;
