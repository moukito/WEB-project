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