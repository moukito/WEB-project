import React, { useState } from "react";

// Composant pour afficher un ingrédient
const IngredientCard = ({ ingredient, isSelected, onSelect }) => (
    <div
        className={`p-0 border rounded-lg cursor-pointer w-full ${
            isSelected ? "border-blue-500" : "border-gray-300"
        }`}
        onClick={onSelect}
    >
        <div className="p-4 bg-blue-100 rounded-lg w-full h-full flex flex-col justify-center text-center">
            <p><strong>Nom :</strong> <br /> {ingredient.nom}</p>
            <p><strong>Description :</strong> <br /> {ingredient.description}</p>
            <p><strong>Quantité :</strong> <br /> {ingredient.quantite}</p>
        </div>
    </div>
);

const IngredientsPage = ({ legumes = [], fruits = [], epices = [] }) => {
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [addedIngredients, setAddedIngredients] = useState([]);

    const handleAdd = () => {
        if (selectedIngredient && !addedIngredients.includes(selectedIngredient)) {
            setAddedIngredients([...addedIngredients, selectedIngredient]);
            alert(`Ingrédient ajouté : ${JSON.stringify(selectedIngredient)}`);
        } else if (!selectedIngredient) {
            alert("Veuillez sélectionner un ingrédient.");
        } else {
            alert("Cet ingrédient est déjà ajouté.");
        }
    };

    const handleRemove = () => {
        if (selectedIngredient && addedIngredients.includes(selectedIngredient)) {
            setAddedIngredients(addedIngredients.filter((ingredient) => ingredient !== selectedIngredient));
            alert(`Ingrédient supprimé : ${JSON.stringify(selectedIngredient)}`);
        } else if (!selectedIngredient) {
            alert("Veuillez sélectionner un ingrédient.");
        } else {
            alert("Cet ingrédient n'est pas dans la liste.");
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
                        <IngredientCard
                            key={index}
                            ingredient={item}
                            isSelected={selectedIngredient === item}
                            onSelect={() => setSelectedIngredient(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-[#E0E1DD] mb-6">Choisir un ingrédient</h1>
            {renderSection("Légumes", legumes)}
            {renderSection("Fruits", fruits)}
            {renderSection("Épices", epices)}
            <div className="flex space-x-4 mt-4">
                <button
                    className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition"
                    onClick={handleAdd}
                >
                    Ajouter
                </button>
                <button
                    className="px-6 py-3 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 transition"
                    onClick={handleRemove}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
};

// Exemple d'utilisation avec des données fictives
const legumes = [
    { nom: "Carotte", description: "Légume orange riche en vitamines", quantite: "1 kg" },
    { nom: "Tomate", description: "Fruit utilisé comme légume", quantite: "500 g" },
];

const fruits = [
    { nom: "Pomme", description: "Fruit sucré et croquant", quantite: "1 kg" },
    { nom: "Banane", description: "Fruit riche en potassium", quantite: "6 unités" },
];

const epices = [
    { nom: "Cumin", description: "Épice aromatique", quantite: "50 g" },
    { nom: "Cannelle", description: "Épice douce et parfumée", quantite: "30 g" },
];

const App = () => <IngredientsPage legumes={legumes} fruits={fruits} epices={epices} />;

export default App;
