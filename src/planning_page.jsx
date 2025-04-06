import React, { useState } from 'react';

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

const PlanningForm = ({
	                      dateDebut, setDateDebut,
	                      nombreSemaines, setNombreSemaines,
	                      saison, setSaison,
	                      errors
                      }) => (
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
					className={`w-full border rounded-lg p-2 text-gray-900 ${errors.dateDebut ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
				/>
				{errors.dateDebut && <p className="text-red-500 text-sm mt-1">Date requise</p>}
			</div>
			<div>
				<label className="block text-gray-900 font-medium mb-2">Nombre de semaines</label>
				<select
					value={nombreSemaines}
					onChange={(e) => setNombreSemaines(e.target.value)}
					className={`w-full border rounded-lg p-2 text-gray-900 ${errors.nombreSemaines ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
				>
					{[...Array(6)].map((_, i) => (
						<option key={i + 1} value={i + 1}>
							{i + 1} semaine{i > 0 ? 's' : ''}
						</option>
					))}
				</select>
				{errors.nombreSemaines && <p className="text-red-500 text-sm mt-1">Nombre de semaines requis</p>}
			</div>
			<div>
				<label className="block text-gray-900 font-medium mb-2">Saison</label>
				<select
					value={saison}
					onChange={(e) => setSaison(e.target.value)}
					className={`w-full border rounded-lg p-2 text-gray-900 ${errors.saison ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
				>
					<option value="printemps">Printemps</option>
					<option value="été">Été</option>
					<option value="automne">Automne</option>
					<option value="hiver">Hiver</option>
				</select>
				{errors.saison && <p className="text-red-500 text-sm mt-1">Saison requise</p>}
			</div>
		</div>
	</div>
);

const PlanningGrid = ({ nombreSemaines, dateDebut }) => {
	const nombreJours = nombreSemaines * 7 || 7;

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
		return today.toISOString().split('T')[0];
	});

	const [saison, setSaison] = useState(() => getSaisonFromDate(new Date().toISOString().split('T')[0]));
	const [nombreSemaines, setNombreSemaines] = useState('1');
	const [errors, setErrors] = useState({
		dateDebut: false,
		nombreSemaines: false,
		saison: false
	});

	const handleGenerate = () => {
		const newErrors = {
			dateDebut: !dateDebut,
			nombreSemaines: !nombreSemaines,
			saison: !saison
		};

		setErrors(newErrors);

		if (!newErrors.dateDebut && !newErrors.nombreSemaines && !newErrors.saison) {
			console.log({ saison, nombreSemaines, dateDebut });
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			<main className="flex-grow py-10 px-6 flex flex-col items-center">
				<PlanningForm
					dateDebut={dateDebut}
					setDateDebut={setDateDebut}
					nombreSemaines={nombreSemaines}
					setNombreSemaines={setNombreSemaines}
					saison={saison}
					setSaison={setSaison}
					errors={errors}
				/>

				<PlanningGrid nombreSemaines={nombreSemaines} dateDebut={dateDebut} />
			</main>

			<Footer onGenerate={handleGenerate} />
		</div>
	);
};

export default PlanningPage;

