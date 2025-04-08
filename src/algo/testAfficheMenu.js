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
const menuSchema = new mongoose.Schema({}, { strict: false });
const Menu = mongoose.model('Menu', menuSchema, '20_repas'); // ← forcer le nom de la collection ici


// Fonction pour générer la rotation des menus avec dates
async function genererRotationMenusAvecDates(nbSemaines, dateDebut) {
  const nbJours = nbSemaines * 7;
  const resultats = [];

  // Récupérer les menus depuis la base de données
  const menusDB = await Menu.find();

  if (menusDB.length === 0) {
    console.log("Aucun menu trouvé dans la base de données.");
    return [];
  }

  let indexMenu = 0;
  const date = new Date(dateDebut); // dateDebut en format "YYYY-MM-DD"

  for (let i = 0; i < nbJours; i++) {
    const menuMidi = menusDB[indexMenu % menusDB.length];
    indexMenu++;
    const menuSoir = menusDB[indexMenu % menusDB.length];
    indexMenu++;

    const dateJour = new Date(date);
    dateJour.setDate(date.getDate() + i);

    const dateStr = dateJour.toISOString().split('T')[0]; // format YYYY-MM-DD

    resultats.push({
      [dateStr]: {
        midi: [menuMidi],
        soir: [menuSoir]
      }
    });
  }

  return resultats;
}


// Appeler la fonction pour générer la rotation des menus
const dateDebut = "2025-04-28"; // format ISO (AAAA-MM-JJ)
const rotation = await genererRotationMenusAvecDates(1, dateDebut);

// Afficher la rotation des menus dans la console
// Affichage lisible
rotation.forEach((jourObj, index) => {
  const dateStr = Object.keys(jourObj)[0];
  const menus = jourObj[dateStr];

  console.log(`Jour ${index + 1} - ${dateStr}`);
  console.log(`  🥗 Midi : ${formatMenu(menus.midi[0])}`);
  console.log(`  🍲 Soir : ${formatMenu(menus.soir[0])}`);
  console.log('-------------------------------------');
});

function formatMenu(menu) {
  if (!menu || !menu.plats) return "Aucun menu";

  const plats = menu.plats;

  // Entrées : vérifier si c'est un tableau et joindre les éléments s'il y en a
  const entrees = Array.isArray(menu.entrees) ? 
    menu.entrees.join(', ') : 'Aucune entrée';

  // Viande : on garde le texte tel quel, si présent
  const viande = plats.viande || 'Aucune viande';

  // Poisson : on garde le texte tel quel, si présent
  const poisson = plats.poisson || 'Aucun poisson';

  // Végétarien : pareil, texte ou 'Aucun'
  const vegetarien = plats.vegetarien || 'Aucun plat végétarien';

  // Desserts : vérifier si c'est un tableau et joindre les éléments s'il y en a
  const desserts = Array.isArray(menu.desserts) ? 
    menu.desserts.join(', ') : 'Aucun dessert';

  return `
    🥗 Entrées     : ${entrees}
    🍖 Viande      : ${viande}
    🐟 Poisson     : ${poisson}
    🥦 Végétarien  : ${vegetarien}
    🍰 Desserts    : ${desserts}
  `.trim();
}
