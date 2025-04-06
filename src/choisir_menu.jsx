import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChoisirMenu = ({ mode, menuCategories }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    const handleSelectImage = (img) => {
        setSelectedItems((prev) =>
            prev.includes(img) ? prev.filter((item) => item !== img) : [...prev, img]
        );
    };

    if (mode !== "create") {
        return null;
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-[#E0E1DD] mb-6">Créer un menu</h1>
            <div className="grid grid-cols-3 gap-8 w-full text-center border p-6 bg-[#1B263B] shadow-md">
                {Object.entries(menuCategories).map(([category, images]) => (
                    <div key={category} className="flex flex-col items-center">
                        <h2 className="font-bold mb-4 text-xl text-[#E0E1DD]">{category}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${category} ${index}`}
                                    className={`w-28 h-28 cursor-pointer border transition-all ${
                                        selectedItems.includes(img) ? "border-[#FFD700] scale-105" : "border-gray-300"
                                    }`}
                                    onClick={() => handleSelectImage(img)}
                                />
                            ))}
                        </div>
                        <button
                            className="mt-4 px-6 py-3 bg-[#142C44] text-[#E0E1DD] font-bold text-lg hover:bg-[#0D1B2A] transition"
                            onClick={() => alert(`Sélectionné : ${category}`)}
                        >
                            Choisir {category}
                        </button>
                    </div>
                ))}
            </div>
            <h2 className="mt-6 font-bold text-lg text-[#E0E1DD]">Sélection :</h2>
            <div className="flex gap-4 mt-4">
                {selectedItems.map((img, index) => (
                    <img key={index} src={img} alt="Sélection" className="w-28 h-28 border" />
                ))}
            </div>
            <button
                className="mt-6 px-6 py-3 bg-[#142C44] text-[#E0E1DD] font-bold text-lg hover:bg-[#0D1B2A] transition"
                onClick={() => navigate("/")}
            >
                Ajouter au calendrier
            </button>
        </div>
    );
};

export default ChoisirMenu;