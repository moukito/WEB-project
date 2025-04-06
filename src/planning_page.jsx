import React, { useState } from 'react';

const Header = () => (
  <header className="bg-gray-800 text-white text-center py-6 text-3xl font-bold">
    Générateur de Planning
  </header>
);

const getSaisonFromDate = (dateString) => {
  const date = new Date(dateString);
  const mois = date.getMonth();
  const jour = date.getDate();

  if ((mois === 2 && jour >= 20) || mois === 3 || mois === 4 || (mois === 5 && jour <= 20)) {
    return "printemps";
  }
  else if ((mois === 5 && jour >= 21) || mois === 6 || mois === 7 || (mois === 8 && jour <= 22)) {
    return "été";
  }
  else if ((mois === 8 && jour >= 23) || mois === 9 || mois === 10 || (mois === 11 && jour <= 20)) {
    return "automne";
  }
  else {
    return "hiver";
  }
};

const PlanningForm = ({ dateDebut, setDateDebut, nombreSemaines, setNombreSemaines, saison, setSaison }) => (
  <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-xl mb-6">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <label className="block text-gray-900 font-medium mb-2">Date de début</label>
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => {
            const newDate = e.target.value;
            setDateDebut(newDate);
            setSaison(getSaisonFromDate(newDate));
          }}
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
              {i + 1} semaine{i > 0 ? 's' : ''}
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
);

const PlanningGrid = ({ nombreSemaines, dateDebut }) => {
  const nombreJours = nombreSemaines * 7 || 7;
  
  // Génération des dates réelles à partir de la date de début
  const getDates = () => {
    const dates = [];
    const startDate = new Date(dateDebut);

    for (let i = 0; i < nombreJours; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(currentDate);
    }

    return dates;
  };

  const dates = getDates();
  const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div className="w-full max-w-7xl bg-white p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Planning</h2>
      <div className="grid grid-cols-7 gap-4">
        {dates.map((date, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 text-center bg-gray-50"
          >
            <p className="font-bold text-gray-900">{jours[date.getDay()]} {date.getDate()}/{date.getMonth() + 1}</p>
            <div className="mt-2">
              <div className="p-2 bg-white rounded border border-gray-200 mb-1 min-h-[40px]">
                <p className="text-sm text-gray-700">Déjeuner</p>
              </div>
              <div className="p-2 bg-white rounded border border-gray-200 min-h-[40px]">
                <p className="text-sm text-gray-700">Dîner</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = ({ onGenerate }) => (
  <footer className="bg-gray-800 text-white text-center py-6 text-lg flex justify-center">
    <button
      onClick={onGenerate}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition w-1/2 mx-2"
    >
      Générer le planning
    </button>
  </footer>
);

const PlanningPage = () => {
  const [dateDebut, setDateDebut] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  });

  const [saison, setSaison] = useState(() => getSaisonFromDate(new Date().toISOString().split('T')[0]));
  const [nombreSemaines, setNombreSemaines] = useState('');

  const handleGenerate = () => {
    console.log({ saison, nombreSemaines, dateDebut });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow py-10 px-6 flex flex-col items-center">
        <PlanningForm 
          dateDebut={dateDebut}
          setDateDebut={setDateDebut}
          nombreSemaines={nombreSemaines}
          setNombreSemaines={setNombreSemaines}
          saison={saison}
          setSaison={setSaison}
        />
        
        <PlanningGrid nombreSemaines={nombreSemaines} dateDebut={dateDebut} />
      </main>

      <Footer onGenerate={handleGenerate} />
    </div>
  );
};

export default PlanningPage;
