import React, { useState } from 'react';

const menusSemaine = [
  { 
    jour: 'Lundi', 
    midi: { entree: 'Salade verte', plat: 'Poulet rôti', dessert: 'Tarte aux pommes', allergenes: ['Gluten'], proteines: '30g' }, 
    soir: { entree: 'Soupe de légumes', plat: 'Omelette', dessert: 'Yaourt', allergenes: ['Œufs', 'Lait'], proteines: '25g' } 
  },
  { 
    jour: 'Mardi', 
    midi: { entree: 'Tomates mozzarella', plat: 'Pâtes au pesto', dessert: 'Glace', allergenes: ['Lait', 'Gluten'], proteines: '28g' }, 
    soir: { entree: 'Carottes râpées', plat: 'Gratin de courgettes', dessert: 'Fruit', allergenes: ['Lait'], proteines: '22g' } 
  },
  { 
    jour: 'Mercredi', 
    midi: { entree: 'Betteraves', plat: 'Steak haché', dessert: 'Compote', allergenes: [], proteines: '35g' }, 
    soir: { entree: 'Velouté de champignons', plat: 'Poisson pané', dessert: 'Mousse au chocolat', allergenes: ['Poisson'], proteines: '30g' } 
  },
  { 
    jour: 'Jeudi', 
    midi: { entree: 'Œufs mimosa', plat: 'Quiche lorraine', dessert: 'Crème caramel', allergenes: ['Œufs', 'Lait', 'Gluten'], proteines: '32g' }, 
    soir: { entree: 'Salade de choux', plat: 'Steak-frites', dessert: 'Tarte au citron', allergenes: [], proteines: '34g' } 
  },
  { 
    jour: 'Vendredi', 
    midi: { entree: 'Radis beurre', plat: 'Poisson grillé', dessert: 'Panna cotta', allergenes: ['Poisson', 'Lait'], proteines: '29g' }, 
    soir: { entree: 'Soupe miso', plat: 'Sushis', dessert: 'Sorbet', allergenes: ['Poisson', 'Soja'], proteines: '27g' } 
  },
  { 
    jour: 'Samedi', 
    midi: { entree: 'Guacamole', plat: 'Buddha bowl', dessert: 'Brownie', allergenes: ['Gluten'], proteines: '26g' }, 
    soir: { entree: 'Nachos', plat: 'Tacos', dessert: 'Churros', allergenes: ['Gluten'], proteines: '28g' } 
  },
  { 
    jour: 'Dimanche', 
    midi: { entree: 'Brunch complet', plat: 'Œufs brouillés', dessert: 'Pancakes', allergenes: ['Œufs', 'Gluten'], proteines: '33g' }, 
    soir: { entree: 'Terrine', plat: 'Rôti de bœuf', dessert: 'Tarte aux fraises', allergenes: [], proteines: '36g' } 
  },
];

const getDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

const PageAccueil = () => {
  // On conserve le planning initial avec la date calculée pour chaque jour
  const [planning] = useState(menusSemaine.map((menu, i) => ({
    ...menu,
    date: getDate(i),
  })));

  // On utilise selectedMeal et mealType pour gérer l'affichage de la modale
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealType, setMealType] = useState(null);

  const openModal = (jour, type) => {
    setSelectedMeal(jour);
    setMealType(type);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setMealType(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white text-center py-6 text-3xl font-bold">
        Planning des repas
      </header>

      <main className="flex-grow py-10 px-6 flex justify-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-10 text-black">Semaine à venir</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {planning.map((jour, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-xl text-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">{jour.date}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Carte MIDI */}
                  <div 
                    className="bg-blue-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition"
                    onClick={() => openModal(jour, 'midi')}
                  >
                    <h3 className="text-xl font-medium text-black">Midi</h3>
                    <p className="text-black"><strong>Entrée :</strong> {jour.midi.entree}</p>
                    <p className="text-black"><strong>Plat :</strong> {jour.midi.plat}</p>
                    <p className="text-black"><strong>Dessert :</strong> {jour.midi.dessert}</p>
                  </div>

                  {/* Carte SOIR */}
                  <div 
                    className="bg-yellow-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition"
                    onClick={() => openModal(jour, 'soir')}
                  >
                    <h3 className="text-xl font-medium text-black">Soir</h3>
                    <p className="text-black"><strong>Entrée :</strong> {jour.soir.entree}</p>
                    <p className="text-black"><strong>Plat :</strong> {jour.soir.plat}</p>
                    <p className="text-black"><strong>Dessert :</strong> {jour.soir.dessert}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-6 text-lg">
        © {new Date().getFullYear()} - Tous droits réservés
      </footer>

      {selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-2xl font-bold mb-4">
              {selectedMeal.date} - {mealType === 'midi' ? 'Midi' : 'Soir'}
            </h2>
            <p>
              <strong>Allergènes :</strong> {selectedMeal[mealType].allergenes && selectedMeal[mealType].allergenes.length > 0 
                ? selectedMeal[mealType].allergenes.join(', ') 
                : 'Aucun'}
            </p>
            <p><strong>Protéines :</strong> {selectedMeal[mealType].proteines}</p>
            <div className="flex justify-center mt-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageAccueil;




