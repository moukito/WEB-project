import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Composant pour afficher un menu
const MenuCard = ({ menu, isSelected, onSelect }) => (
    <div
        className={`p-0 border rounded-lg cursor-pointer w-full ${
            isSelected ? "border-blue-500" : "border-gray-300"
        }`}
        onClick={onSelect}
    >
        <div className="p-4 bg-blue-100 rounded-lg w-full h-full flex flex-col justify-center text-center">
            <p><strong>Entrée :</strong> <br /> {menu.midi.entree}</p>
            <p><strong>Plat :</strong> <br /> {menu.midi.plat}</p>
            <p><strong>Dessert :</strong> <br /> {menu.midi.dessert}</p>
        </div>
    </div>
);

const ChoisirMenu = ({ mode, menuCategories = {}, menusSemaine = [] }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const navigate = useNavigate();

    const toggleSelection = (img) => {
        setSelectedItems((prev) =>
            prev.includes(img) ? prev.filter((item) => item !== img) : [...prev, img]
        );
    };

    const handleValidation = () => {
        if (selectedMenu) {
            alert(`Menu validé : ${JSON.stringify(selectedMenu)}`);
        } else {
            alert("Veuillez sélectionner un menu.");
        }
    };

    if (mode === "choose") {
        return (
            <div className="flex flex-col items-center p-4">
                {menusSemaine.length === 0 ? (
                    <div className="text-center text-[#E0E1DD]">Aucun menu disponible.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            {menusSemaine.map((menu, index) => (
                                <MenuCard
                                    key={index}
                                    menu={menu}
                                    isSelected={selectedMenu === menu}
                                    onSelect={() => setSelectedMenu(menu)}
                                />
                            ))}
                        </div>
                        <button
                            className="mt-4 p-2 bg-green-500 text-white rounded-lg"
                            onClick={handleValidation}
                        >
                            Valider
                        </button>
                    </>
                )}
            </div>
        );
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
                                    onClick={() => toggleSelection(img)}
                                />
                            ))}
                        </div>
                    </div>
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

// Exemple d'utilisation avec des données fictives
const menusSemaine = [
    {
        midi: { entree: "Salade César", plat: "Poulet rôti", dessert: "Tarte aux pommes" },
    },
    {
        midi: { entree: "Soupe de légumes", plat: "Steak frites", dessert: "Mousse au chocolat" },
    },
    {
        midi: { entree: "Bruschetta", plat: "Lasagnes", dessert: "Tiramisu" },
    },
    {
        midi: { entree: "Carpaccio", plat: "Pizza Margherita", dessert: "Panna Cotta" },
    },
];

const menuCategories = {
    Fruits: [
        "https://via.placeholder.com/150?text=Fruit+1",
        "https://via.placeholder.com/150?text=Fruit+2",
    ],
    Légumes: [
        "https://via.placeholder.com/150?text=Légume+1",
        "https://via.placeholder.com/150?text=Légume+2",
    ],
    Viandes: [
        "https://via.placeholder.com/150?text=Viande+1",
        "https://via.placeholder.com/150?text=Viande+2",
    ],
};

const App = () => <ChoisirMenu mode="choose" menuCategories={menuCategories} menusSemaine={menusSemaine} />;

export default App;
