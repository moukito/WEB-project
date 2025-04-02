import React, { useState } from 'react';

const PlanningPage = () => {
    const [saison, setSaison] = useState('');
    const [nombreSemaines, setNombreSemaines] = useState('');
    const [dateDebut, setDateDebut] = useState('');

    const handleGenerate = () => {
        console.log({ saison, nombreSemaines, dateDebut });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-gray-800 text-white text-center py-6 text-3xl font-bold">
                Générateur de Planning
            </header>

            <main className="flex-grow py-10 px-6 flex flex-col items-center">
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-xl mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Date de début</label>
                            <input
                                type="date"
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                                className="w-full border-gray-300 rounded-lg p-2 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Nombre de semaines</label>
                            <select
                                value={nombreSemaines}
                                onChange={(e) => setNombreSemaines(e.target.value)}
                                className="w-full border-gray-300 rounded-lg p-2 text-gray-900"
                            >
                                <option value="">Sélectionnez</option>
                                {[...Array(6)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} semaine{ i > 0 ? 's' : '' }
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Saison</label>
                            <select
                                value={saison}
                                onChange={(e) => setSaison(e.target.value)}
                                className="w-full border-gray-300 rounded-lg p-2 text-gray-900"
                            >
                                <option value="">Sélectionnez une saison</option>
                                <option value="printemps">Printemps</option>
                                <option value="été">Été</option>
                                <option value="automne">Automne</option>
                                <option value="hiver">Hiver</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-7xl bg-white p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Planning</h2>
                    <div className="grid grid-cols-7 gap-4">
                        {Array.from({ length: nombreSemaines * 7 || 7 }).map((_, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-4 text-center bg-gray-50"
                            >
                                <p className="font-bold text-gray-900">Jour {index + 1}</p>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-700">Matin</p>
                                    <p className="text-sm text-gray-700">Après-midi</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white text-center py-6 text-lg flex justify-center">
                <button
                    onClick={handleGenerate}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition w-1/2 mx-2"
                >
                    Générer le planning
                </button>
            </footer>
        </div>
    );
};

export default PlanningPage;
