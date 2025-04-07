import Appetizer from '../models/Appetizer.js';
import mainDish from '../models/MainDish.js';
import Dessert from '../models/Dessert.js';
import Menu from '../models/Menu.js';

const saumonFume = new Appetizer(
    "Saumon fumé",
    "Tranches de saumon fumé avec citron et crème",
    8.50,
    ["Saumon", "Citron", "Crème fraîche"],
    true
);

const boeufBourguignon = new mainDish(
    "Bœuf Bourguignon",
    "Ragoût de bœuf mijoté au vin rouge",
    15.90,
    ["Bœuf", "Oignon", "Carotte", "Vin rouge"],
    "Purée de pommes de terre",
    "mijoté"
);

const moussChocolat = new Dessert(
    "Mousse au chocolat",
    "Mousse légère au chocolat noir",
    6.50,
    ["Chocolat noir", "Œufs", "Crème"],
    true
);

const menuClassique = new Menu("Classique", saumonFume, boeufBourguignon, moussChocolat);

console.log(menuClassique.print());

const saladeChevre = new Appetizer(
    "Salade de chèvre chaud",
    "Salade composée avec toast de chèvre",
    7.90,
    ["Salade", "Fromage de chèvre", "Miel", "Noix"]
);

const pouletRoti = new mainDish(
    "Poulet rôti aux herbes",
    "Cuisse de poulet rôti avec herbes de Provence",
    13.50,
    ["Poulet", "Thym", "Romarin", "Ail"],
    "Frites maison",
    "rôti"
);

const tarteTatin = new Dessert(
    "Tarte Tatin",
    "Tarte aux pommes caramélisées",
    6.90,
    ["Pommes", "Caramel", "Pâte feuilletée"]
);

const menuDuJour = new Menu("Menu du Jour", saladeChevre, pouletRoti, tarteTatin);
console.log("\n\n" + menuDuJour.print());
