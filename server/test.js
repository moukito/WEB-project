import axios from 'axios';

// 1. Fonction pour ajouter une chaussure
const addShoe = async () => {
    try {
        const newShoe = {
            titre: 'Adidas Ultraboost',
            nom: 'Ultraboost',
            marque: 'Adidas',
            taille: 43,
            couleur: 'Noir',
            categorie: 'Running',
            prix: 180,
            image: 'https://exemple.com/ultraboost.jpg',
            description: 'Chaussures de running ultra confortables.'
        };

        // Envoie une requête POST pour ajouter la chaussure
        const response = await axios.post('http://localhost:5001/api/chaussures', newShoe);
        console.log('Chaussure ajoutée:', response.data);

        return response.data;  // On retourne l'objet ajouté pour la récupération
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la chaussure:', error.response ? error.response.data : error.message);
    }
};

// 2. Fonction pour récupérer toutes les chaussures
const getAllShoes = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/chaussures'); // Récupère toutes les chaussures

        console.log('Toutes les chaussures trouvées:', response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des chaussures:', error.response ? error.response.data : error.message);
    }
};

// Ajouter une chaussure puis récupérer toutes les chaussures
const testAddAndGetShoe = async () => {
    const addedShoe = await addShoe(); // Ajoute une chaussure
    if (addedShoe) {
        // Récupère toutes les chaussures après l'ajout
        getAllShoes();
    }
};

// Lancer le test
testAddAndGetShoe();
