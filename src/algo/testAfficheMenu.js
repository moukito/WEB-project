import mongoose from 'mongoose';

// Connecter à MongoDB
mongoose.connect('mongodb://localhost:27017/menus', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB', err);
  });

// Définition du schéma du menu
const menuSchema = new mongoose.Schema({
  menu_1: {
    entrees: [String],
    plats: {
      viande: String,
      poisson: String,
      vegetarien: String
    },
    desserts: [String]
  },
  menu_2: {
    entrees: [String],
    plats: {
      viande: String,
      poisson: String,
      vegetarien: String
    },
    desserts: [String]
  }
});

// Modèle Menu basé sur le schéma
const Menu = mongoose.model('Menu', menuSchema);

// Fonction pour générer la rotation des menus avec dates
async function genererRotationMenusAvecDates(nbSemaines, dateDebut) {
  const nbJours = nbSemaines * 7;
  const resultats = [];

  // Récupérer les menus depuis la base de données
  const menusDB = await Menu.find();

  if (menusDB.length === 0) {
    console.log("Aucun menu trouvé dans la base de données.");
    return;
  }

  let indexMenu = 0;
  const date = new Date(dateDebut); // dateDebut en format "YYYY-MM-DD"

  for (let i = 0; i < nbJours; i++) {
    const menu = menusDB[indexMenu % menusDB.length]; // Choisir le menu de manière cyclique

    // Alterner entre les deux menus (menu_1 et menu_2)
    const menuMidi = {
      titre: `Entrées: ${menu.menu_1.entrees.join(', ')}, Plats: Viande: ${menu.menu_1.plats.viande}, Poisson: ${menu.menu_1.plats.poisson}, Végétarien: ${menu.menu_1.plats.vegetarien}, Desserts: ${menu.menu_1.desserts.join(', ')}`
    };

    const menuSoir = {
      titre: `Entrées: ${menu.menu_2.entrees.join(', ')}, Plats: Viande: ${menu.menu_2.plats.viande}, Poisson: ${menu.menu_2.plats.poisson}, Végétarien: ${menu.menu_2.plats.vegetarien}, Desserts: ${menu.menu_2.desserts.join(', ')}`
    };

    indexMenu++;

    const dateJour = new Date(date); // clone la date
    dateJour.setDate(date.getDate() + i); // ajoute i jours

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = dateJour.toLocaleDateString('fr-FR', options);

    resultats.push({
      jour: dateStr,
      menus: {
        midi: [menuMidi],
        soir: [menuSoir]
      }
    });
  }

  return resultats;
}

// Appeler la fonction pour générer la rotation des menus
const dateDebut = "2025-04-07"; // format ISO (AAAA-MM-JJ)
const rotation = await genererRotationMenusAvecDates(2, dateDebut);

// Afficher la rotation des menus dans la console
rotation.forEach((jourObj, index) => {
  console.log(`Jour ${index + 1} - ${jourObj.jour}`);
  console.log(`  🥗 Midi : ${jourObj.menus.midi[0].titre}`);
  console.log(`  🍲 Soir : ${jourObj.menus.soir[0].titre}`);
  console.log('-------------------------------------');
});
