import React, { useEffect, useState } from "react";

const App = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/20_repas")
            .then(res => res.json())
            .then(data => {
                setMenus(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur lors du fetch :", err);
                setError("Erreur lors de la récupération des menus.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Menus disponibles</h1>
            {loading && !error ? (
                <p>Chargement des menus...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {/* Parcours des menus (menu_1 à menu_20) */}
                    {Array.from({ length: 20 }).map((_, index) => {
                        const menuKey = `menu_${index + 1}`; // Crée les clés "menu_1", "menu_2", ..., "menu_20"
                        const menu = menus[menuKey];

                        // Vérifier si le menu existe et a des données
                        if (menu) {
                            return (
                                <div key={index} className="border p-4 rounded shadow">
                                    <h2 className="font-semibold text-lg mb-2">Menu {index + 1}</h2>

                                    {/* Entrées */}
                                    {menu?.entrees && menu.entrees.length > 0 && (
                                        <div>
                                            <strong>Entrées :</strong>
                                            <ul>
                                                {menu.entrees.map((entree, i) => (
                                                    <li key={i}>{entree}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Plats */}
                                    {menu?.plats && (
                                        <div>
                                            <strong>Plats :</strong>
                                            <div>
                                                {menu.plats.viande && (
                                                    <p><strong>Viande :</strong> {menu.plats.viande}</p>
                                                )}
                                                {menu.plats.poisson && (
                                                    <p><strong>Poisson :</strong> {menu.plats.poisson}</p>
                                                )}
                                                {menu.plats.vegetarien && (
                                                    <p><strong>Végétarien :</strong> {menu.plats.vegetarien}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Desserts */}
                                    {menu?.desserts && menu.desserts.length > 0 && (
                                        <div>
                                            <strong>Desserts :</strong>
                                            <ul>
                                                {menu.desserts.map((dessert, i) => (
                                                    <li key={i}>{dessert}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
};

export default App;
