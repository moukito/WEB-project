/**
 * Répartit les menus sur un certain nombre de semaines
 * @param {number} nbSemaines - Le nombre de semaines à répartir
 * @returns {Array} - Liste de semaines contenant des menus
 */

function genererRotationMenusAvecDates(menus, nbSemaines, dateDebut) {
  const nbJours = nbSemaines * 7;
  const resultats = [];

  let indexMenu = 0;
  const date = new Date(dateDebut); // dateDebut en format "YYYY-MM-DD"

  for (let i = 0; i < nbJours; i++) {
    const menuMidi = menus[indexMenu % menus.length];
    indexMenu++;
    const menuSoir = menus[indexMenu % menus.length];
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


const menus = [
  { titre: "Poulet Riz" },
  { titre: "Spaghetti Bolognaise" },
  { titre: "Salade César" },
  { titre: "Poisson Légumes" }
];

const dateDebut = "2025-04-07"; // format ISO (AAAA-MM-JJ)
const rotation = genererRotationMenusAvecDates(menus, 2, dateDebut);

rotation.forEach((jourObj, index) => {
  console.log(`Jour ${index + 1} - ${jourObj.jour}`);
  console.log(`  🥗 Midi : ${jourObj.menus.midi[0].titre}`);
  console.log(`  🍲 Soir : ${jourObj.menus.soir[0].titre}`);
  console.log('-------------------------------------');
});