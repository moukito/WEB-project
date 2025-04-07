import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const recettesPath = path.join(__dirname, '../data/liste recette.xlsx - Feuil1.csv');
const marchandisesPath = path.join(__dirname, '../data/liste marchandise.xlsx - Feuil1.csv');

// todo : change it with a better solution
const allergens = [
  { name: 'gluten', keywords: ['ble', 'gluten', 'farine', 'pain', 'pates', 'pizza', 'croute'] },
  { name: 'crustacés', keywords: ['crustace', 'crevette', 'crabe', 'homard', 'langouste', 'langoustine'] },
  { name: 'oeufs', keywords: ['oeuf', 'oeufs', 'mayonnaise'] },
  { name: 'poisson', keywords: ['poisson', 'cabillaud', 'saumon', 'thon', 'merlu', 'colin', 'truite', 'sardine', 'anchois'] },
  { name: 'arachides', keywords: ['arachide', 'cacahuete'] },
  { name: 'soja', keywords: ['soja'] },
  { name: 'lait', keywords: ['lait', 'fromage', 'beurre', 'creme', 'yaourt', 'emmental', 'mozzarella', 'feta', 'chevre'] },
  { name: 'fruits à coque', keywords: ['amande', 'noisette', 'noix', 'cajou', 'pecan', 'pistache'] },
  { name: 'céleri', keywords: ['celeri'] },
  { name: 'moutarde', keywords: ['moutarde'] },
  { name: 'sésame', keywords: ['sesame'] },
  { name: 'sulfites', keywords: ['sulfite', 'vin', 'vinaigre'] },
  { name: 'lupin', keywords: ['lupin'] },
  { name: 'mollusques', keywords: ['mollusque', 'calamar', 'moule', 'huitre', 'escargot'] }
];

function detectAllergens(ingredientName) {
  const detectedAllergens = [];
  const lowerName = ingredientName.toLowerCase();
  
  allergens.forEach(allergen => {
	for (const keyword of allergen.keywords) {
	  if (lowerName.includes(keyword.toLowerCase())) {
		detectedAllergens.push(allergen.name);
		break;
	  }
	}
  });
  
  return detectedAllergens;
}

function determineIngredientType(name, famille, sousFamille) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('boeuf') || lowerName.includes('veau') || lowerName.includes('agneau') || 
	  sousFamille.includes('VIANDE') || sousFamille.includes('BOEUF') || sousFamille.includes('VEAU')) {
	return 'viande rouge';
  }
  
  if (lowerName.includes('porc') || lowerName.includes('jambon') || lowerName.includes('saucisse') || 
	  lowerName.includes('saucisson') || sousFamille.includes('PORC')) {
	return 'porc';
  }
  
  if (lowerName.includes('poulet') || lowerName.includes('dinde') || lowerName.includes('volaille') || 
	  sousFamille.includes('VOLAILLE')) {
	return 'volaille';
  }
  
  if (lowerName.includes('poisson') || lowerName.includes('saumon') || lowerName.includes('thon') || 
	  lowerName.includes('cabillaud') || lowerName.includes('merlu') || lowerName.includes('truite') || 
	  sousFamille.includes('POISSON')) {
	return 'poisson';
  }
  
  if (lowerName.includes('crevette') || lowerName.includes('crabe') || lowerName.includes('moule') || 
	  lowerName.includes('fruit de mer') || lowerName.includes('crustace')) {
	return 'fruits de mer';
  }
  
  if (lowerName.includes('legume') || lowerName.includes('carotte') || lowerName.includes('tomate') || 
	  lowerName.includes('salade') || lowerName.includes('haricot') || sousFamille.includes('CRUDITES') || 
	  sousFamille.includes('CUIDITES')) {
	return 'légume';
  }
  
  if (lowerName.includes('riz') || lowerName.includes('pdt') || lowerName.includes('pomme de terre') || 
	  lowerName.includes('pate') || lowerName.includes('feculent') || sousFamille.includes('FECULENT')) {
	return 'féculent';
  }
  
  if (lowerName.includes('fromage') || lowerName.includes('lait') || lowerName.includes('creme') || 
	  lowerName.includes('beurre') || lowerName.includes('yaourt')) {
	return 'produit laitier';
  }
  
  return 'autre';
}

function determineDishCategory(name, famille, sousFamille) {
  if (sousFamille.includes('VEGETARIEN') || name.toLowerCase().includes('vegetarien')) {
	return 'vegetarien';
  }
  
  if (sousFamille.includes('POISSON') || name.toLowerCase().includes('poisson') || 
	  name.toLowerCase().includes('saumon') || name.toLowerCase().includes('thon')) {
	return 'poisson';
  }
  
  if (sousFamille.includes('VIANDE') || sousFamille.includes('BOEUF') || 
	  sousFamille.includes('PORC') || sousFamille.includes('VOLAILLE') || 
	  name.toLowerCase().includes('viande') || name.toLowerCase().includes('boeuf') || 
	  name.toLowerCase().includes('porc') || name.toLowerCase().includes('poulet')) {
	return 'viande';
  }
  
  return 'autre';
}

async function processData() {
  try {
	const recettesData = fs.readFileSync(recettesPath, 'utf8');
	const marchandisesData = fs.readFileSync(marchandisesPath, 'utf8');
	
	const recettesLines = recettesData.split('\n');
	const marchandisesLines = marchandisesData.split('\n');
	
	const recettes = recettesLines.slice(1).filter(line => line.trim() !== '');
	const marchandises = marchandisesLines.slice(1).filter(line => line.trim() !== '');
	
	const ingredients = [];
	marchandises.forEach((line, index) => {
	  const columns = line.split(',');
	  if (columns.length >= 3) {
		const name = columns[0].trim();
		const famille = columns[1].trim();
		const sousFamille = columns[2].trim();
		
		const ingredient = {
		  id: `ingredient_${index + 1}`,
		  name: name,
		  type: determineIngredientType(name, famille, sousFamille),
		  allergens: detectAllergens(name)
		};
		
		ingredients.push(ingredient);
	  }
	});
	
	const dishes = [];
	recettes.forEach((line, index) => {
	  const columns = line.split(',');
	  if (columns.length >= 3) {
		const name = columns[0].trim();
		const famille = columns[1].trim();
		const sousFamille = columns[2].trim();
		
		const potentialIngredients = [];
		const dishWords = name.toLowerCase().split(/[\s\/\-]/).filter(word => word.length > 2);
		
		ingredients.forEach(ingredient => {
		  const ingredientWords = ingredient.name.toLowerCase().split(/[\s\/\-]/).filter(word => word.length > 2);
		  
		  for (const dishWord of dishWords) {
			if (ingredientWords.some(ingredientWord => ingredientWord.includes(dishWord) || dishWord.includes(ingredientWord))) {
			  potentialIngredients.push(ingredient.id);
			  break;
			}
		  }
		});
		
		const dish = {
		  id: `dish_${index + 1}`,
		  name: name,
		  ingredients: potentialIngredients,
		  category: determineDishCategory(name, famille, sousFamille)
		};
		
		dishes.push(dish);
	  }
	});
	
	const menus = [];
	
	const appetizerDishes = dishes.filter(dish => dish.name.toLowerCase().includes('entree') || 
											   dish.name.toLowerCase().includes('salade') || 
											   dish.name.toLowerCase().includes('soupe'));
	
	const mainDishes = dishes.filter(dish => !appetizerDishes.includes(dish) && 
										   !dish.name.toLowerCase().includes('dessert'));
	
	const dessertDishes = dishes.filter(dish => dish.name.toLowerCase().includes('dessert') || 
											 dish.name.toLowerCase().includes('patisserie') || 
											 dish.name.toLowerCase().includes('gateau'));
	
	for (let i = 0; i < 5; i++) {
	  const appetizer = appetizerDishes[Math.floor(Math.random() * appetizerDishes.length)];
	  const mainDish1 = mainDishes[Math.floor(Math.random() * mainDishes.length)];
	  const mainDish2 = mainDishes[Math.floor(Math.random() * mainDishes.length)];
	  const mainDish3 = mainDishes[Math.floor(Math.random() * mainDishes.length)];
	  const dessert = dessertDishes[Math.floor(Math.random() * dessertDishes.length)];
	  
	  const menu = {
		id: `menu_${i + 1}`,
		name: `Menu ${i + 1}`,
		appetizer: appetizer ? appetizer.id : null,
		mainDishes: [
		  mainDish1 ? mainDish1.id : null,
		  mainDish2 ? mainDish2.id : null,
		  mainDish3 ? mainDish3.id : null
		].filter(id => id !== null),
		dessert: dessert ? dessert.id : null
	  };
	  
	  menus.push(menu);
	}
	
	const restaurantData = {
	  ingredients: ingredients,
	  dishes: dishes,
	  menus: menus
	};
	
	fs.writeFileSync('restaurant_data.json', JSON.stringify(restaurantData, null, 2));
	console.log('Data successfully converted and saved to restaurant_data.json');
	
  } catch (error) {
	console.error('Error processing data:', error);
  }
}

// Run the main function
processData();