import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreerMenu = ({ menuCategories }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    const mode = "create"; // Vous pouvez ajuster cette valeur selon vos besoins

    const handleSelectImage = (img) => {
        setSelectedItems((prev) =>
            prev.includes(img) ? prev.filter((item) => item !== img) : [...prev, img]
        );
    };

    return (
        mode === "create" && (
            <div className="flex flex-col items-center p-6 bg-[#0D1B2A] rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-[#FFD700] mb-8">Créer un menu</h1>
                <div className="grid grid-cols-3 gap-6 w-full text-center p-6 bg-[#1B263B] rounded-lg shadow-md">
                    {Object.entries(menuCategories).map(([category, images]) => (
                        <div key={category} className="flex flex-col items-center">
                            <h2 className="font-bold mb-4 text-xl text-[#FFD700]">{category}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${category} ${index}`}
                                        className={`w-28 h-28 cursor-pointer rounded-lg border-2 transition-transform ${
                                            selectedItems.includes(img) ? "border-[#FFD700] scale-110" : "border-[#E0E1DD]"
                                        }`}
                                        onClick={() => handleSelectImage(img)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="mt-8 font-bold text-lg text-[#FFD700]">Sélection :</h2>
                <div className="flex gap-4 mt-4 flex-wrap justify-center">
                    {selectedItems.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Sélection"
                            className="w-28 h-28 rounded-lg border-2 border-[#FFD700]"
                        />
                    ))}
                </div>
                <div className="flex gap-4 mt-8 flex-wrap justify-center">
                    <button
                        className="px-6 py-3 bg-[#FFD700] text-[#0D1B2A] font-bold text-lg rounded-lg hover:bg-[#E0E1DD] hover:text-[#0D1B2A] transition"
                        onClick={() => navigate("/")}
                    >
                        Ajouter au calendrier
                    </button>
                    <button
                        className="px-6 py-3 bg-[#E0E1DD] text-[#0D1B2A] font-bold text-lg rounded-lg hover:bg-[#FFD700] hover:text-[#0D1B2A] transition"
                        onClick={() => navigate("/selection")}
                    >
                        Retour
                    </button>
                    <button
                        className="px-6 py-3 bg-[#FF4500] text-white font-bold text-lg rounded-lg hover:bg-[#FF6347] transition"
                        onClick={() => navigate("/choisir-menu")}
                    >
                        Page de sélection
                    </button>
                    <button
                        className="px-6 py-3 bg-[#1E90FF] text-white font-bold text-lg rounded-lg hover:bg-[#4682B4] transition"
                        onClick={() => navigate(-1)}
                    >
                        Retour à la page précédente
                    </button>
                </div>
            </div>
        )
    );
};

export default CreerMenu;