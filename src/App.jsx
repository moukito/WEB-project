import React, { useState } from "react";
import courgette from "./assets/courgette.jpg"
import lait from "./assets/lait.jpg"
import riz from "./assets/riz.jpg"
import poulet from "./assets/poulet.jpg"

const App = () => {
  const images = [
    courgette,
    lait,
    riz,
    poulet,
    courgette,
    courgette,
    courgette,
    courgette,
    courgette,
    courgette,
  ];

  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImageSelection = (src) => {
    setSelectedImages((prev) =>
      prev.includes(src) ? prev.filter((img) => img !== src) : [...prev, src]
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Colonne de gauche (Menu) */}
      <div className="w-1/4 bg-red-200 p-4 flex flex-col space-y-4">
        <button className="p-2 bg-blue-500 text-black rounded">Accueil</button>
        <button className="p-2 bg-blue-500 text-black rounded">
          Rechercher par ingrédients
        </button>
        <button className="p-2 bg-blue-500 text-black rounded">Chatbot</button>
      </div>

      {/* Colonne du milieu (Photos + Bas) */}
      <div className="w-2/4 bg-gray-100 p-4 flex flex-col">
        {/* Partie haute : Images */}
        <div className="flex flex-wrap gap-4 justify-center items-center flex-grow bg-gray-200 p-4">
          {images.map((src, index) => (
            <div
              key={index}
              className={`w-32 h-32 cursor-pointer border-4 ${
                selectedImages.includes(src) ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => toggleImageSelection(src)}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>

        {/* Partie basse : Images sélectionnées */}
        <div className="h-1/4 bg-gray-400 p-4 flex justify-center items-center gap-2 overflow-x-auto">
          {selectedImages.length > 0 ? (
            selectedImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Sélection ${index + 1}`}
                className="h-20 w-20 object-contain rounded"
              />
            ))
          ) : (
            <p className="text-white">Cliquez sur une image pour l'afficher</p>
          )}
        </div>
      </div>

      {/* Colonne de droite (Vide) */}
      <div className="w-1/4 bg-green-500 p-4"></div>
    </div>
  );
};

export default App;