import { useState } from 'react';
import Header from '../components/Header';
import AddToCartButton from '../components/AddToCartButton';

function ProductTest() {
  // Produit fictif pour tester le panier
  const testProduct = {
    nom: 'Chaussure Test',
    prix: 99.99,
    marque: 'TestBrand',
    nom_image: ['chaussure_test'],
    description: 'Une chaussure fictive pour tester le panier',
    categorie: 'Test'
  };

  // Tailles disponibles
  const availableSizes = ['38', '39', '40', '41', '42', '43', '44'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Test du Panier</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                <p className="text-gray-500 text-center">Image du produit (fictive)</p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold">{testProduct.nom}</h2>
              <p className="text-gray-600 mb-2">{testProduct.marque}</p>
              <p className="text-lg font-bold mb-4">{testProduct.prix} €</p>
              <p className="text-gray-700 mb-6">{testProduct.description}</p>
              
              <AddToCartButton product={testProduct} availableSizes={availableSizes} />
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Instructions de test:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Sélectionnez une taille</li>
                  <li>Choisissez une quantité</li>
                  <li>Cliquez sur "Ajouter au panier"</li>
                  <li>Vérifiez que le compteur dans l'icône du panier s'incrémente</li>
                  <li>Cliquez sur l'icône du panier pour voir le contenu</li>
                  <li>Vérifiez que le produit apparaît avec les bonnes informations</li>
                  <li>Testez la modification de quantité et la suppression</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductTest;