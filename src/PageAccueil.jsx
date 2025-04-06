import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const menusSemaine = [
  { midi: { entree: 'Salade verte', plat: 'Poulet rôti', dessert: 'Tarte aux pommes', allergenes: ['Gluten'], proteines: '15g' }, soir: { entree: 'Soupe de légumes', plat: 'Omelette', dessert: 'Yaourt', allergenes: [] } },
  { midi: { entree: 'Tomates mozzarella', plat: 'Pâtes au pesto', dessert: 'Glace', allergenes: ['Lactose', 'Fruits à coque'], proteines: '20g' }, soir: null },
  { midi: { entree: 'Betteraves', plat: 'Steak haché', dessert: 'Compote', allergenes: [], proteines: '18g' }, soir: { entree: 'Velouté de champignons', plat: 'Poisson pané', dessert: 'Mousse au chocolat', allergenes: ['Poisson'], proteines: '22g' } },
  { midi: { entree: 'Œufs mimosa', plat: 'Quiche lorraine', dessert: 'Crème caramel', allergenes: ['Œufs'], proteines: '25g' }, soir: { entree: 'Salade de choux', plat: 'Steak-frites', dessert: 'Tarte au citron', allergenes: [] } },
  { midi: { entree: 'Radis beurre', plat: 'Poisson grillé', dessert: 'Panna cotta', allergenes: ['Soja'], proteines: '19g' }, soir: { entree: 'Soupe miso', plat: 'Sushis', dessert: 'Sorbet', allergenes: ['Arachides'], proteines: '21g' } },
  { midi: null, soir: null },
  { midi: { entree: 'Brunch complet', plat: 'Œufs brouillés', dessert: 'Pancakes', allergenes: ['Lactose'], proteines: '24g' }, soir: { entree: 'Terrine', plat: 'Rôti de bœuf', dessert: 'Tarte aux fraises', allergenes: ['Gluten', 'Fruits de mer'], proteines: '28g' } },
];

const getDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

const RepasCard = ({ jour, type, openModal }) => (
  <div
    className={`p-4 rounded-lg cursor-pointer hover:shadow-md transition ${type === 'midi' ? 'bg-blue-100' : 'bg-yellow-100'}`}
    onClick={() => openModal(jour, type)}
  >
    <h3 className="text-xl font-medium text-black">{type === 'midi' ? 'Midi' : 'Soir'}</h3>
    {jour[type] ? (
      <>
        <p className="text-black"><strong>Entrée :</strong> {jour[type].entree}</p>
        <p className="text-black"><strong>Plat :</strong> {jour[type].plat}</p>
        <p className="text-black"><strong>Dessert :</strong> {jour[type].dessert}</p>
      </>
    ) : (
      <p className="text-black font-semibold">Pas de repas</p>
    )}
  </div>
);

const PageAccueil = () => {
  const navigate = useNavigate();
  const planning = menusSemaine.map((menu, i) => ({
    ...menu,
    jour: getDate(i),
  }));

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealType, setMealType] = useState(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(null);

  const openModal = (jour, type) => {
    const index = planning.findIndex(item => item.jour === jour);
    setSelectedMeal(jour);
    setMealType(type);
    setCurrentDayIndex(index);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setMealType(null);
    setCurrentDayIndex(null);
  };

  const navigateDay = (direction) => {
    const newIndex = currentDayIndex + direction;
    if (newIndex >= 0 && newIndex < planning.length) {
      setCurrentDayIndex(newIndex);
      setSelectedMeal(planning[newIndex].jour);
    }
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
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">{jour.jour}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['midi', 'soir'].map((type) => (
                    <RepasCard key={type} jour={jour} type={type} openModal={openModal} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-transform duration-500 transform">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black transform transition-transform duration-500">
            <h2 className="text-2xl font-bold mb-4">{selectedMeal} - {mealType === 'midi' ? 'Midi' : 'Soir'}</h2>
            {selectedMeal[mealType] ? (
              <>
                <p><strong>Allergènes :</strong> {selectedMeal[mealType].allergenes.length > 0 ? selectedMeal[mealType].allergenes.join(', ') : 'Aucun'}</p>
                <p><strong>Protéines :</strong> {selectedMeal[mealType].proteines}</p>
              </>
            ) : (
              <p className="text-black font-semibold">Pas de repas</p>
            )}
            <div className="flex justify-between mt-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Fermer</button>
              <div className="flex gap-4">
                <button onClick={() => navigateDay(-1)} disabled={currentDayIndex === 0} className="bg-gray-500 text-white px-4 py-2 rounded">Jour précédent</button>
                <button onClick={() => navigateDay(1)} disabled={currentDayIndex === planning.length - 1} className="bg-gray-500 text-white px-4 py-2 rounded">Jour suivant</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageAccueil;
