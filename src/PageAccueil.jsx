import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

/**
 * Array of weekly meal data
 * @type {Array<Object>}
 */
const MENUS_SEMAINE = [
  { midi: { entree: 'Salade verte', plat: 'Poulet rôti', dessert: 'Tarte aux pommes', allergenes: ['Gluten'], proteines: '15g' }, soir: { entree: 'Soupe de légumes', plat: 'Omelette', dessert: 'Yaourt', allergenes: [] } },
  { midi: { entree: 'Tomates mozzarella', plat: 'Pâtes au pesto', dessert: 'Glace', allergenes: ['Lactose', 'Fruits à coque'], proteines: '20g' }, soir: null },
  { midi: { entree: 'Betteraves', plat: 'Steak haché', dessert: 'Compote', allergenes: [], proteines: '18g' }, soir: { entree: 'Velouté de champignons', plat: 'Poisson pané', dessert: 'Mousse au chocolat', allergenes: ['Poisson'], proteines: '22g' } },
  { midi: { entree: 'Œufs mimosa', plat: 'Quiche lorraine', dessert: 'Crème caramel', allergenes: ['Œufs'], proteines: '25g' }, soir: { entree: 'Salade de choux', plat: 'Steak-frites', dessert: 'Tarte au citron', allergenes: [] } },
  { midi: { entree: 'Radis beurre', plat: 'Poisson grillé', dessert: 'Panna cotta', allergenes: ['Soja'], proteines: '19g' }, soir: { entree: 'Soupe miso', plat: 'Sushis', dessert: 'Sorbet', allergenes: ['Arachides'], proteines: '21g' } },
  { midi: null, soir: null },
  { midi: { entree: 'Brunch complet', plat: 'Œufs brouillés', dessert: 'Pancakes', allergenes: ['Lactose'], proteines: '24g' }, soir: { entree: 'Terrine', plat: 'Rôti de bœuf', dessert: 'Tarte aux fraises', allergenes: ['Gluten', 'Fruits de mer'], proteines: '28g' } },
];

/**
 * Number of meal cards to display at once
 * @type {number}
 */
const CARDS_TO_SHOW = 4;

/**
 * Formats a date with the given offset from today
 * @param {number} offset - Number of days from today
 * @returns {string} Formatted date string in French locale
 */
const getFormattedDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

/**
 * Component for displaying a meal card
 * @param {Object} props - Component props
 * @param {Object} props.jour - Day object containing meal data
 * @param {string} props.type - Meal type ('midi' or 'soir')
 * @param {Function} props.openModal - Function to open meal details modal
 */
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

/**
 * Component for displaying future/unpublished meals
 */
const FutureCard = () => (
  <div className="p-6 rounded-lg bg-gray-200 w-full flex items-center justify-center min-h-[200px]">
    <p className="text-black text-center italic">Menu pas encore publié</p>
  </div>
);

/**
 * Navigation buttons component
 * @param {Object} props - Component props
 * @param {Function} props.onPrevious - Handler for previous button click
 * @param {Function} props.onToday - Handler for today button click
 * @param {Function} props.onNext - Handler for next button click
 */
const NavigationButtons = ({ onPrevious, onToday, onNext }) => (
  <div className="absolute right-4 top-1/4 transform -translate-y-1/2 flex space-x-2">
    <button 
      onClick={onPrevious} 
      className="px-2 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 cursor-pointer transition"
    >
      {`<`}
    </button>
    <button
      onClick={onToday}
      className="px-2 py-2 rounded bg-orange-500 text-white hover:bg-orange-700 cursor-pointer transition" 
    >
      Aujourd'hui
    </button>
    <button 
      onClick={onNext} 
      className="px-2 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 cursor-pointer transition"
    >
      {`>`}
    </button>
  </div>
);

/**
 * Meal details modal component
 * @param {Object} props - Component props
 * @param {Object} props.selectedMeal - Selected meal data
 * @param {string} props.mealType - Type of selected meal ('midi' or 'soir')
 * @param {Function} props.onClose - Handler for closing modal
 * @param {Function} props.onEdit - Handler for edit button click
 */
const MealModal = ({ selectedMeal, mealType, onClose, onEdit }) => (
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
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer transition">
          Fermer
        </button>
        <button onClick={onEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer transition">
          Modifier
        </button>
      </div>
    </div>
  </div>
);

/**
 * Main page component for meal planning
 */
const PageAccueil = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealType, setMealType] = useState(null);

  /**
   * Generates the visible planning data based on current start index
   * @returns {Array<Object>} Array of meal data for visible days
   */
  const generateVisiblePlanning = () => {
    return Array.from({ length: CARDS_TO_SHOW }, (_, i) => {
      const dayIndex = startIndex + i;
      if (dayIndex < MENUS_SEMAINE.length) {
        return {
          ...MENUS_SEMAINE[dayIndex],
          jour: getFormattedDate(dayIndex),
          isFuture: false
        };
      }
      return {
        jour: getFormattedDate(dayIndex),
        isFuture: true
      };
    });
  };

  const visiblePlanning = generateVisiblePlanning();

  /**
   * Navigates to today's meals
   */
  const navigateToToday = () => setStartIndex(0);
  
  /**
   * Navigates to previous set of meals
   */
  const navigateToPrevious = () => setStartIndex(prev => Math.max(0, prev - CARDS_TO_SHOW));
  
  /**
   * Navigates to next set of meals
   */
  const navigateToNext = () => setStartIndex(prev => prev + CARDS_TO_SHOW);

  /**
   * Opens meal details modal
   * @param {Object} jour - Day object containing meal data
   * @param {string} type - Meal type ('midi' or 'soir')
   */
  const openMealModal = (jour, type) => {
    setSelectedMeal(jour);
    setMealType(type);
  };

  /**
   * Closes meal details modal
   */
  const closeMealModal = () => {
    setSelectedMeal(null);
    setMealType(null);
  };

  /**
   * Navigates to meal edit page
   */
  const navigateToEdit = () => navigate("/menu");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white text-center py-6 text-3xl font-bold relative">
        Plan alimentaire des menus
      </header>

      <main className="flex-grow py-28 px-6">
        <NavigationButtons 
          onPrevious={navigateToPrevious}
          onToday={navigateToToday}
          onNext={navigateToNext}
        />
        
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
                            openModal={openMealModal}
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
        <MealModal
          selectedMeal={selectedMeal}
          mealType={mealType}
          onClose={closeMealModal}
          onEdit={navigateToEdit}
        />
      )}
    </div>
  );
};

export default PageAccueil;