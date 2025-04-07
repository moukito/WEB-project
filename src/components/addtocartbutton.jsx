import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

function AddToCartButton({ product, availableSizes }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    // Réinitialiser après l'ajout
    setSelectedSize('');
    setQuantity(1);
    setShowSizeError(false);
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Taille
        </label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setShowSizeError(false);
          }}
          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${showSizeError ? 'border-red-500' : ''}`}
        >
          <option value="">Sélectionnez une taille</option>
          {availableSizes?.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        {showSizeError && (
          <p className="mt-2 text-sm text-red-600">Veuillez sélectionner une taille</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantité
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
          >
            -
          </button>
          <div className="flex-1 min-w-0">
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full text-center border-gray-300"
              min="1"
            />
          </div>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ShoppingCart className="mr-2" size={20} />
        Ajouter au panier
      </button>
    </div>
  );
}

export default AddToCartButton;