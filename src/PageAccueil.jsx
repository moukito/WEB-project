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
    className={`p-4 rounded-lg cursor-pointer hover:shadow-md transition ${
      type === 'midi' ? 'bg-blue-100 hover:bg-blue-300' : 'bg-yellow-100 hover:bg-yellow-300'
    } w-full min-h-[120px] flex flex-col justify-center`}
    onClick={() => openModal(jour, type)}
  >
    <h3 className="text-xl font-medium text-black text-center">{type === 'midi' ? 'Midi' : 'Soir'}</h3>
    {jour[type] ? (
      <>
        <p className="text-black text-left"><strong>Entrée :</strong> {jour[type].entree}</p>
        <p className="text-black text-left"><strong>Plat :</strong> {jour[type].plat}</p>
        <p className="text-black text-left"><strong>Dessert :</strong> {jour[type].dessert}</p>
      </>
    ) : (
      <p className="text-black font-semibold">Pas de repas</p>
    )}
  </div>
);

const FutureCard = () => (
  <div className="p-6 rounded-lg bg-gray-200 w-full flex items-center justify-center min-h-[200px]">
    <p className="text-black text-center italic">Menu pas encore publié</p>
  </div>
);

const PageAccueil = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = 4;

  const generatePlanning = (start) => {
    const planning = [];
    for (let i = 0; i < cardsToShow; i++) {
      const dayIndex = start + i;
      if (dayIndex < menusSemaine.length) {
        planning.push({
          ...menusSemaine[dayIndex],
          jour: getDate(dayIndex),
          isFuture: false
        });
      } else {
        planning.push({
          jour: getDate(dayIndex),
          isFuture: true
        });
      }
    }
    return planning;
  };

  const visiblePlanning = generatePlanning(startIndex);

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

  const goToTodaysCards = () => {
    const todayIndex = menusSemaine.findIndex((_, index) => index === 0);
    setStartIndex(todayIndex);
  }

  const goToPreviousCards = () => {
    setStartIndex(prev => Math.max(0, prev - cardsToShow));
  };

  const goToNextCards = () => {
    setStartIndex(prev => prev + cardsToShow);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white text-center py-6 text-3xl font-bold relative">
        Plan alimentaire des menus
      </header>

      <main className="flex-grow py-28 px-6">
        <div className="absolute right-4 top-1/4 transform -translate-y-1/2 flex space-x-2">
            <button 
              onClick={goToPreviousCards} 
              className="px-2 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 cursor-pointer transition"
            >
              {`<`}
            </button>
            <button
              onClick={goToTodaysCards}
              className="px-2 py-2 rounded bg-orange-500 text-white hover:bg-orange-700 cursor-pointer transition" 
            >
              Aujourd'hui
            </button>
            <button 
              onClick={goToNextCards} 
              className="px-2 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 cursor-pointer transition"
            >
              {`>`}
            </button>
        </div>
        <div className="w-full max-w-7xl mx-auto">  
          <div className="flex justify-center">
            <div className="flex space-x-8">
              {visiblePlanning.map((jour, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-xl text-center w-[300px] flex-shrink-0 flex flex-col"
                >
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">{jour.jour}</h2>
                <div className="flex-grow">
                  {jour.isFuture ? (
                    <FutureCard />
                  ) : (
                    <div className="grid grid-cols-1 gap-4 w-full">
                      {['midi', 'soir'].map((type) => (
                        <RepasCard 
                          key={type} 
                          jour={jour} 
                          type={type} 
                          openModal={openModal}
                        />
                      ))}
                    </div>
                  )}
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedMeal && !selectedMeal.isFuture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-2xl font-bold mb-4">{selectedMeal.jour} - {mealType === 'midi' ? 'Midi' : 'Soir'}</h2>
            {selectedMeal[mealType] ? (
              <>
                <p><strong>Allergènes :</strong> {selectedMeal[mealType].allergenes.length > 0 ? selectedMeal[mealType].allergenes.join(', ') : 'Aucun'}</p>
                <p><strong>Protéines :</strong> {selectedMeal[mealType].proteines}</p>
              </>
            ) : (
              <p className="text-black font-semibold">Pas de repas</p>
            )}
            <div className="flex justify-between mt-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer transition">
                Fermer
              </button>
              <button onClick={() => {navigate("/menu")}} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer transition">
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageAccueil;