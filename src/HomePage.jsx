import React from 'react';

// Exemple de données pour les chaussures tendance (sans images)
const trendyShoes = [
  { id: 1, name: "Nike Air Max", price: 120 },
  { id: 2, name: "Adidas Ultra Boost", price: 150 },
  { id: 3, name: "Puma RS-X", price: 110 },
  { id: 4, name: "New Balance 574", price: 100 },
  { id: 5, name: "Jordan Retro", price: 200 },
  { id: 6, name: "Reebok Classic", price: 90 },
  { id: 7, name: "Asics Gel", price: 110 },
];

const HomePage = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Contenu principal */}
      <main style={{ flex: 1, padding: '0 40px 40px' }}>
        {/* Titre de la page */}
        <h1 style={{ textAlign: 'center', marginTop: 0, marginBottom: '40px', fontSize: '2rem' }}>
          Chaussures Tendance
        </h1>
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Ligne 1 : 1 carte */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <ShoeCard shoe={trendyShoes[0]} />
          </div>

          {/* Ligne 2 : 4 cartes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <ShoeCard shoe={trendyShoes[1]} />
            <ShoeCard shoe={trendyShoes[2]} />
            <ShoeCard shoe={trendyShoes[3]} />
            <ShoeCard shoe={trendyShoes[4]} />
          </div>

          {/* Ligne 3 : 2 cartes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <ShoeCard shoe={trendyShoes[5]} />
            <ShoeCard shoe={trendyShoes[6]} />
          </div>
        </div>
      </main>
    </div>
  );
};

// Composant pour afficher une carte de chaussure (sans image)
const ShoeCard = ({ shoe }) => {
  return (
    <div
      style={{
        borderRadius: '12px',
        padding: '30px',
        minHeight: '150px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <h2 style={{ margin: '10px 0', fontSize: '1.5rem', color: '#000' }}>{shoe.name}</h2>
      <p style={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}>
        Prix: {shoe.price}€
      </p>
    </div>
  );
};

export default HomePage;




