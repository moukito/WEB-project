import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chaussures = () => {
  const [chaussures, setChaussures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fonction pour récupérer les chaussures depuis l'API
    const fetchChaussures = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/chaussures');
        setChaussures(response.data); // Stocke les données dans l'état
      } catch (err) {
        setError('Erreur de récupération des données');
      } finally {
        setLoading(false); // Désactive le chargement
      }
    };

    fetchChaussures(); // Appelle la fonction pour récupérer les données
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Chaussures</h1>
      <ul>
        {chaussures.map((chaussure) => (
          <li key={chaussure._id}>
            <h2>{chaussure.nom}</h2>
            <p><strong>Titre:</strong> {chaussure.titre}</p>
            <p><strong>Marque:</strong> {chaussure.marque}</p>
            <p><strong>Taille:</strong> {chaussure.taille}</p>
            <p><strong>Couleur:</strong> {chaussure.couleur}</p>
            <p><strong>Catégorie:</strong> {chaussure.categorie}</p>
            <p><strong>Prix:</strong> {chaussure.prix} €</p>
            {chaussure.image && <img src={chaussure.image} alt={chaussure.nom} style={{ width: '100px', height: '100px' }} />}
            <p><strong>Description:</strong> {chaussure.description}</p>
            <p><strong>Ajouté le:</strong> {new Date(chaussure.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chaussures;
