import React, { useState } from "react";

// Composant pour afficher un plat
const PlatCard = ({ plat, isSelected, onSelect }) => (
    <div
        className={`p-4 border rounded-lg cursor-pointer w-full ${
            isSelected ? "border-blue-500" : "border-gray-300"
        }`}
        onClick={onSelect}
    >
        <div className="bg-blue-100 rounded-lg w-full h-full flex flex-col justify-center text-center">
            <p><strong>Nom :</strong> {plat.nom}</p>
            <p><strong>Description :</strong> {plat.description}</p>
            <p><strong>Prix :</strong> {plat.prix} €</p>
        </div>
    </div>
);

const PlatsPage = ({ entrees = [], plats = [], desserts = [] }) => {
    const [selectedPlat, setSelectedPlat] = useState(null);
    const [addedPlats, setAddedPlats] = useState([]);

    const handleAdd = () => {
        if (selectedPlat && !addedPlats.includes(selectedPlat)) {
            setAddedPlats([...addedPlats, selectedPlat]);
            alert(`Plat ajouté : ${JSON.stringify(selectedPlat)}`);
        } else if (!selectedPlat) {
            alert("Veuillez sélectionner un plat.");
        } else {
            alert("Ce plat est déjà ajouté.");
        }
    };

    const handleRemove = () => {
        if (selectedPlat && addedPlats.includes(selectedPlat)) {
            setAddedPlats(addedPlats.filter((plat) => plat !== selectedPlat));
            alert(`Plat supprimé : ${JSON.stringify(selectedPlat)}`);
        } else if (!selectedPlat) {
            alert("Veuillez sélectionner un plat.");
        } else {
            alert("Ce plat n'est pas dans la liste.");
        }
    };

    const renderSection = (title, items) => (
        <div className="mb-6 w-full">
            <h2 className="text-xl font-semibold text-[#E0E1DD] mb-4">{title}</h2>
            {items.length === 0 ? (
                <div className="text-center text-[#E0E1DD]">Aucun {title.toLowerCase()} disponible.</div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <PlatCard
                            key={index}
                            plat={item}
                            isSelected={selectedPlat === item}
                            onSelect={() => setSelectedPlat(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-[#E0E1DD] mb-6">Choisir un plat</h1>
            {renderSection("Entrées", entrees)}
            {renderSection("Plats", plats)}
            {renderSection("Desserts", desserts)}
            <div className="flex space-x-4 mt-4">
                <button
                    className="p-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleAdd}
                >
                    Ajouter
                </button>
                <button
                    className="p-2 bg-red-500 text-white rounded-lg"
                    onClick={handleRemove}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
};

// Exemple d'utilisation avec des données fictives
const entrees = [
    { nom: "Salade César", description: "Salade avec poulet, parmesan et croûtons", prix: 6 },
    { nom: "Soupe à l'oignon", description: "Soupe traditionnelle française", prix: 5 },
];

const plats = [
    { nom: "Poulet rôti", description: "Poulet rôti avec des herbes", prix: 12 },
    { nom: "Lasagnes", description: "Lasagnes maison avec sauce bolognaise", prix: 10 },
    { nom: "Pizza Margherita", description: "Pizza classique avec mozzarella", prix: 8 },
];

const desserts = [
    { nom: "Tarte aux pommes", description: "Tarte aux pommes caramélisées", prix: 5 },
    { nom: "Mousse au chocolat", description: "Mousse au chocolat noir", prix: 4 },
];

const App = () => <PlatsPage entrees={entrees} plats={plats} desserts={desserts} />;

export default App;