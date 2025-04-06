import React, { useState } from 'react';

/**
 * Determines the season based on a given date
 * @param {string} dateString - Date in ISO format
 * @returns {string} The season in French ("printemps", "été", "automne", "hiver")
 */
const getSeasonFromDate = (dateString) => {
	const date = new Date(dateString);
	const month = date.getMonth();
	const day = date.getDate();

	if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
		return "printemps";
	}
	else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
		return "été";
	}
	else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
		return "automne";
	}
	else {
		return "hiver";
	}
};

/**
 * Form component for planning parameters
 * @param {Object} props - Component props
 * @param {string} props.startDate - Starting date for the planning
 * @param {Function} props.setStartDate - Function to update start date
 * @param {string} props.numberOfWeeks - Number of weeks for planning
 * @param {Function} props.setNumberOfWeeks - Function to update number of weeks
 * @param {string} props.season - Selected season
 * @param {Function} props.setSeason - Function to update season
 * @param {Object} props.errors - Form validation errors
 */
const PlanningForm = ({
	                      startDate, setStartDate,
	                      numberOfWeeks, setNumberOfWeeks,
	                      season, setSeason,
	                      errors
                      }) => (
	<div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-xl mb-6">
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
			<div>
				<label className="block text-gray-900 font-medium mb-2">Date de début</label>
				<input
					type="date"
					value={startDate}
					onChange={(e) => {
						const newDate = e.target.value;
						setStartDate(newDate);
						setSeason(getSeasonFromDate(newDate));
					}}
					className={`w-full border rounded-lg p-2 text-gray-900 ${errors.startDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
				/>
				{errors.startDate && <p className="text-red-500 text-sm mt-1">Date requise</p>}
			</div>
			<div>
				<label className="block text-gray-900 font-medium mb-2">Nombre de semaines</label>
				<select
					value={numberOfWeeks}
					onChange={(e) => setNumberOfWeeks(e.target.value)}
					className={`w-full border rounded-lg p-2 text-gray-900 ${errors.numberOfWeeks ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
				>
					{[...Array(6)].map((_, i) => (
						<option key={i + 1} value={i + 1}>
							{i + 1} semaine{i > 0 ? 's' : ''}
						</option>
					))}
				</select>
				{errors.numberOfWeeks && <p className="text-red-500 text-sm mt-1">Nombre de semaines requis</p>}
			</div>
			<div>
				<label className="block text-gray-900 font-medium mb-2">Saison</label>
				<select
					value={season}
					onChange={(e) => setSeason(e.target.value)}
					className={`w-full border rounded-lg p-2 text-gray-900 ${errors.season ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
				>
					<option value="printemps">Printemps</option>
					<option value="été">Été</option>
					<option value="automne">Automne</option>
					<option value="hiver">Hiver</option>
				</select>
				{errors.season && <p className="text-red-500 text-sm mt-1">Saison requise</p>}
			</div>
		</div>
	</div>
);

/**
 * Grid component that displays planning calendar
 * @param {Object} props - Component props
 * @param {string} props.numberOfWeeks - Number of weeks to display
 * @param {string} props.startDate - Starting date for the planning
 */
const PlanningGrid = ({ numberOfWeeks, startDate }) => {
	const numberOfDays = numberOfWeeks * 7 || 7;

	/**
	 * Generates an array of dates starting from the startDate
	 * @returns {Date[]} Array of dates
	 */
	const getDates = () => {
		const dates = [];
		const start = new Date(startDate);

		for (let i = 0; i < numberOfDays; i++) {
			const currentDate = new Date(start);
			currentDate.setDate(start.getDate() + i);
			dates.push(currentDate);
		}

		return dates;
	};

	const dates = getDates();
	const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

	return (
		<div className="w-full max-w-7xl bg-white p-6 rounded-xl shadow-xl">
			<h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Planning</h2>
			<div className="grid grid-cols-7 gap-4">
				{dates.map((date, index) => (
					<div
						key={index}
						className="border border-gray-300 rounded-lg p-4 text-center bg-gray-50"
					>
						<p className="font-bold text-gray-900">{days[date.getDay()]} {date.getDate()}/{date.getMonth() + 1}</p>
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

/**
 * Footer component with generate button
 * @param {Object} props - Component props
 * @param {Function} props.onGenerate - Function to call when generate button is clicked
 */
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

/**
 * Main planning page component
 * Manages state and renders planning interface
 */
const PlanningPage = () => {
	const [startDate, setStartDate] = useState(() => {
		const today = new Date();
		return today.toISOString().split('T')[0];
	});

	const [season, setSeason] = useState(() => getSeasonFromDate(new Date().toISOString().split('T')[0]));
	const [numberOfWeeks, setNumberOfWeeks] = useState('1');
	const [errors, setErrors] = useState({
		startDate: false,
		numberOfWeeks: false,
		season: false
	});

	/**
	 * Validates form and generates planning if valid
	 */
	const handleGenerate = () => {
		const newErrors = {
			startDate: !startDate,
			numberOfWeeks: !numberOfWeeks,
			season: !season
		};

		setErrors(newErrors);

		if (!newErrors.startDate && !newErrors.numberOfWeeks && !newErrors.season) {
			console.log({ season, numberOfWeeks, startDate });
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			<main className="flex-grow py-10 px-6 flex flex-col items-center">
				<PlanningForm
					startDate={startDate}
					setStartDate={setStartDate}
					numberOfWeeks={numberOfWeeks}
					setNumberOfWeeks={setNumberOfWeeks}
					season={season}
					setSeason={setSeason}
					errors={errors}
				/>

				<PlanningGrid numberOfWeeks={numberOfWeeks} startDate={startDate} />
			</main>

			<Footer onGenerate={handleGenerate} />
		</div>
	);
};

export default PlanningPage;
