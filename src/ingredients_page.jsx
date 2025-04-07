import React, { useState } from "react";

// Composant pour afficher un ingrédient
const IngredientCard = ({ ingredient, isSelected, onSelect }) => (
    <div
        className={`p-0 border rounded-lg cursor-pointer w-full ${
            isSelected ? "border-green-500" : "border-gray-300"
        }`}
        onClick={onSelect}
    >
        <div className="p-4 bg-green-100 rounded-lg w-full h-full flex flex-col justify-center text-center">
            <p><strong>Nom :</strong> <br /> {ingredient.name}</p>
            <p><strong>Catégorie :</strong> <br /> {ingredient.category}</p>
        </div>
    </div>
);

const IngredientsPage = ({ ingredientsList = [] }) => {
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [ingredients, setIngredients] = useState(ingredientsList);

    const handleAddIngredient = () => {
        const newIngredient = { name: "Nouvel ingrédient", category: "Catégorie" };
        setIngredients([...ingredients, newIngredient]);
    };

    const handleDeleteIngredient = () => {
        if (selectedIngredient) {
            setIngredients(ingredients.filter(ingredient => ingredient !== selectedIngredient));
            setSelectedIngredient(null);
        } else {
            alert("Veuillez sélectionner un ingrédient à supprimer.");
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold text-[#E0E1DD] mb-6">Liste des Ingrédients</h1>
            {ingredients.length === 0 ? (
                <div className="text-center text-[#E0E1DD]">Aucun ingrédient disponible.</div>
            ) : (
                <div className="grid grid-cols-2 gap-4 w-full">
                    {ingredients.map((ingredient, index) => (
                        <IngredientCard
                            key={index}
                            ingredient={ingredient}
                            isSelected={selectedIngredient === ingredient}
                            onSelect={() => setSelectedIngredient(ingredient)}
                        />
                    ))}
                </div>
            )}
            <div className="mt-6 flex space-x-4">
                <button
                    className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition"
                    onClick={handleAddIngredient}
                >
                    Ajouter
                </button>
                <button
                    className="px-6 py-3 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 transition"
                    onClick={handleDeleteIngredient}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
};

// Exemple d'utilisation avec des données fictives
const ingredientsList = [
    { name: "Tomate", category: "Légumes" },
    { name: "Poulet", category: "Viandes" },
    { name: "Pomme", category: "Fruits" },
    { name: "Carotte", category: "Légumes" },
];

const App = () => <IngredientsPage ingredientsList={ingredientsList} />;

export default App;
