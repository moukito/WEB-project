function semaineParRotation(n, dateDebut = null) {
/* 
  Choisir le nombre de semaines en une rotation, renvoyer un tableau de dates sans celles de week-end
  Entrée: n: le nombre de semaines désiré,
          dateDebut: la date de début désiré. S'il est null, il sera défini par la date d'aujourd'hui
  Sortie: datesPossibles: un array contenant les dates possibles, ie sans week-end
*/
          
  if (dateDebut == null) {
    dateDebut = new Date();
  }

  let datesPossibles = [];
  let joursAjoutes = 0; // Compteur de jours ajoutés

  while (joursAjoutes < 5*n) {
    // Vérifie si ce n'est pas un samedi (6) ou dimanche (0)
    if (dateDebut.getDay() !== 0 && dateDebut.getDay() !== 6) {
      datesPossibles.push(dateDebut.toLocaleDateString('fr-FR'));
      joursAjoutes++;
    }
    dateDebut.setDate(dateDebut.getDate() + 1);
  }

  return datesPossibles;
}

console.log("Dates disponibles:")
console.log(semaineParRotation(6))


const menu =
      {
        "id": 1,
        "nom_menu": "Menu Gourmand",
        "entrees": [
          {
            "nom": "Salade de carottes",
            "ingredients": [
              {"type": "legume", "nom": "carotte", "prix": 5, "saison": "été", "allergenes": ""}
            ],
            "caracteristique": "froide"
          },
          {
            "nom": "Velouté de champignons",
            "ingredients": [
              {"type": "legume", "nom": "champignon", "prix": 6, "saison": "automne", "allergenes": ""}
            ],
            "caracteristique": "chaude"
          },
          {
            "nom": "Terrine de légumes",
            "ingredients": [
              {"type": "legume", "nom": "courgette", "prix": 7, "saison": "printemps", "allergenes": ""}
            ],
            "caracteristique": "froide"
          }
        ],
        "plats": [
          {
            "nom": "Steak de boeuf",
            "ingredients": [
              {"type": "viande", "nom": "boeuf", "prix": 15, "saison": "hiver", "allergenes": ""},
              {"type": "assaisonnement", "nom": "sel", "prix": 1, "saison": "toute", "allergenes": ""}
            ],
            "caracteristique": "grillé"
          },
          {
            "nom": "Poulet pané",
            "ingredients": [
              {"type": "volaille", "nom": "poulet", "prix": 12, "saison": "toute", "allergenes": "gluten"},
              {"type": "céréale", "nom": "chapelure", "prix": 2, "saison": "toute", "allergenes": "gluten"}
            ],
            "caracteristique": "pané"
          },
          {
            "nom": "Filet de saumon",
            "ingredients": [
              {"type": "poisson", "nom": "saumon", "prix": 18, "saison": "toute", "allergenes": "poisson"},
              {"type": "assaisonnement", "nom": "citron", "prix": 2, "saison": "toute", "allergenes": ""}
            ],
            "caracteristique": "cuit vapeur"
          }
        ],
        "desserts": [
          {
            "nom": "Yaourt nature",
            "ingredients": [
              {"type": "lacté", "nom": "yaourt", "prix": 4, "saison": "hiver", "allergenes": "lactose"}
            ],
            "caracteristique": "froid"
          },
          {
            "nom": "Fondant au chocolat",
            "ingredients": [
              {"type": "pâtisserie", "nom": "chocolat", "prix": 6, "saison": "toute", "allergenes": "gluten, lactose"},
              {"type": "produit laitier", "nom": "beurre", "prix": 3, "saison": "toute", "allergenes": "lactose"}
            ],
            "caracteristique": "chaud"
          },
          {
            "nom": "Tarte aux pommes",
            "ingredients": [
              {"type": "fruit", "nom": "pomme", "prix": 5, "saison": "automne", "allergenes": "gluten"},
              {"type": "pâtisserie", "nom": "pâte brisée", "prix": 4, "saison": "toute", "allergenes": "gluten"}
            ],
            "caracteristique": "tiède"
          }
        ]
      }

function elementsNonVides(elements) {
  /* Vérifier la liste d'entrées ou de plats ou de desserts est non vide */
  return (elements && elements.length > 0);
}
        

function menuParSaison(saison, menu){
/* Filtrer les entrées, les plats et les dessert par saison */
  function filtrerParSaison(elements) {
    /* Vérifier que tous les ingrédients de l'élément sont de la bonne saison */
    if (!elementsNonVides(elements)) {
      return [];
    }
    return elements.filter(element => (element.ingredients.every(ingredient => 
            ingredient.saison === saison || ingredient.saison === "toute")));
  };

  const menuFiltre = {
    ...menu,
    entrees: filtrerParSaison(menu.entrees),
    plats: filtrerParSaison(menu.plats),
    desserts: filtrerParSaison(menu.desserts)
  };

  return menuFiltre;
}

console.log("Menu filtré par saison:")
console.log(menuParSaison("hiver", menuParSaison("hiver", menu)))

function prixMoyenneSelection(menu) {
/* Calculer le prix moyenne d'une sélection du menu */
  function prixMoyenneElements(elements) {
    /* Calculer le prix moyenne d'un élément */
    if (!elementsNonVides(elements)) {
      return 0;
    }
    return elements.reduce((total, element) => 
      (total + element.ingredients.reduce((sum, ingredient) => 
        sum + ingredient.prix, 0)), 0) / elements.length;
  }
  return prixMoyenneElements(menu.entrees)
  + prixMoyenneElements(menu.plats)
  + prixMoyenneElements(menu.desserts);
}

console.log("Prix total des entrées:")
console.log(prixMoyenneSelection(menu))