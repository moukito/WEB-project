import React, { useState } from "react";

const CreerMenu = ({ 
    mode = "create", 
    menuCategories = {
        Entrées: ["https://via.placeholder.com/100", "https://via.placeholder.com/100"],
        Plats: ["https://via.placeholder.com/100", "https://via.placeholder.com/100"],
        Desserts: ["https://via.placeholder.com/100", "https://via.placeholder.com/100"]
    }, 
    selectedItems: initialSelectedItems = [], 
    handleSelectImage, 
    navigate 
}) => {
    const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

    const handleSelectImageInternal = (uniqueId) => {
        if (selectedItems.includes(uniqueId)) {
            setSelectedItems(selectedItems.filter(item => item !== uniqueId));
        } else {
            setSelectedItems([...selectedItems, uniqueId]);
        }
    };

    const handleRemoveImage = (img) => {
        setSelectedItems(selectedItems.filter(item => item !== img));
    };

    return (
        <div className="flex flex-col items-center p-4">
            {mode === "create" && (
                <div className="grid grid-cols-3 gap-8 w-full text-center border p-6">
                    {Object.entries(menuCategories).map(([category, images]) => (
                        <div key={category} className="flex flex-col items-center">
                            <h2 className="font-bold mb-4 text-lg">{category}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {images.map((img, index) => {
                                    const uniqueId = `${category}-${index}`;
                                    return (
                                        <img
                                            key={uniqueId}
                                            src={img}
                                            alt={`${category} ${index}`}
                                            className={`w-28 h-28 cursor-pointer border rounded-lg transition-all ${
                                                selectedItems.includes(uniqueId) ? "border-blue-500 scale-105" : "border-gray-300"
                                            }`}
                                            onClick={() => handleSelectImage ? handleSelectImage(uniqueId) : handleSelectImageInternal(uniqueId)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-6 grid grid-cols-3 gap-4">
                {selectedItems.map((uniqueId, index) => {
                    const [category, imgIndex] = uniqueId.split("-");
                    const img = menuCategories[category][imgIndex];
                    return (
                        <div key={index} className="relative">
                            <img src={img} alt="Sélection" className="w-28 h-28 border rounded-lg" />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => handleRemoveImage(uniqueId)}
                            >
                                &times;
                            </button>
                        </div>
                    );
                })}
            </div>
            <button
                className="mt-6 px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition"
                onClick={() => navigate ? navigate("/") : alert("Naviguer vers la page d'accueil")}
            >
                Ajouter au calendrier
            </button>
        </div>
    );
};

export default CreerMenu;
