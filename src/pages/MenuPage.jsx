import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Menu = () => {
  const [mode, setMode] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();

  const menuCategories = {
    Entrées: [
      "https://via.placeholder.com/100?text=Entr%C3%A9e1",
      "https://via.placeholder.com/100?text=Entr%C3%A9e2",
      "https://via.placeholder.com/100?text=Entr%C3%A9e3",
      "https://via.placeholder.com/100?text=Entr%C3%A9e4"
    ],
    Plats: [
      "https://via.placeholder.com/100?text=Plat1",
      "https://via.placeholder.com/100?text=Plat2",
      "https://via.placeholder.com/100?text=Plat3",
      "https://via.placeholder.com/100?text=Plat4"
    ],
    Desserts: [
      "https://via.placeholder.com/100?text=Dessert1",
      "https://via.placeholder.com/100?text=Dessert2",
      "https://via.placeholder.com/100?text=Dessert3",
      "https://via.placeholder.com/100?text=Dessert4"
    ]
  };

  const handleSelectImage = (img) => {
    setSelectedItems((prev) =>
      prev.includes(img) ? prev.filter(i => i !== img) : [...prev, img]
    );
  };

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const handleValidation = () => {
    if (selectedMenu) {
      alert(`Menu sélectionné : ${selectedMenu}`);
      navigate("/"); // Retourne à l'accueil après validation
    } else {
      alert("Aucun menu sélectionné !");
    }
  };

  return (
    <div className="w-full h-screen p-4 border border-black">
      {/* Choix initial */}
      {!mode && (
        <div className="flex justify-center items-center h-screen w-screen">
          <button 
            className="border p-8 w-1/2 h-full text-2xl font-bold bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => setMode("create")}
          >
            Créer un menu
          </button>
          <button 
            className="border p-8 w-1/2 h-full text-2xl font-bold bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => setMode("choose")}
          >
            Choisir un menu
          </button>
        </div>
      )}


      {/* Créer un menu */}
      {mode === "create" && (
        <div className="flex flex-col items-center p-4">
          <div className="grid grid-cols-3 gap-8 w-full text-center border p-6">
            {Object.entries(menuCategories).map(([category, images]) => (
              <div key={category} className="flex flex-col items-center">
                <h2 className="font-bold mb-4 text-lg">{category}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${category} ${index}`}
                      className={`w-28 h-28 cursor-pointer border rounded-lg transition-all ${
                        selectedItems.includes(img) ? "border-blue-500 scale-105" : "border-gray-300"
                      }`}
                      onClick={() => handleSelectImage(img)}
                    />
                  ))}
                </div>
                <button
                  className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition"
                  onClick={() => alert(`Sélectionné : ${category}`)}
                >
                  Choisir {category}
                </button>
              </div>
            ))}
          </div>
          <h2 className="mt-6 font-bold text-lg">Sélection :</h2>
          <div className="flex gap-4 mt-4">
            {selectedItems.map((img, index) => (
              <img key={index} src={img} alt="Sélection" className="w-28 h-28 border rounded-lg" />
            ))}
          </div>
          <button className="mt-6 px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition" onClick={() => navigate("/")}>
            Ajouter au calendrier
          </button>
        </div>
      )}


      {/* Choisir un menu */}
      {mode === "choose" && (
        <div className="flex flex-col items-center p-4">
          <div className="grid grid-cols-2 gap-4 w-full">
            {menusSemaine.map((menu, index) => (
              <div
                key={index}
                className={`p-0 border rounded-lg cursor-pointer w-full ${selectedMenu === menu ? "border-blue-500" : "border-gray-300"}`}
                onClick={() => handleSelectMenu(menu)}
              >
                <div className="p-4 bg-blue-100 rounded-lg w-full h-full flex flex-col justify-center text-center">
                  <p><strong>Entrée :</strong> <br /> {menu.midi.entree}</p>
                  <p><strong>Plat :</strong> <br />{menu.midi.plat}</p>
                  <p><strong>Dessert :</strong> <br />{menu.midi.dessert}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleValidation}>Valider</button>
        </div>
      )}


    </div>
  );
};

export default Menu;