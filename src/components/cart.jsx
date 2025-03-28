import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
        <p className="text-gray-500">Ajoutez des articles pour commencer vos achats</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.size}`} className="py-6 flex">
                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                  <img
                    src={`/images/${item.image}.jpg`} // Ajustez le chemin selon votre structure
                    alt={item.name}
                    className="w-full h-full object-center object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg'; // Image par défaut si l'image n'existe pas
                    }}
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium">
                      <h3>{item.name}</h3>
                      <p className="ml-4">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                    <p className="mt-1 text-sm text-gray-500">Taille: {item.size}</p>
                  </div>
                  
                  <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="font-medium text-red-600 hover:text-red-500 flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between text-base font-medium">
          <p>Sous-total</p>
          <p>{getCartTotal().toFixed(2)} €</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Frais de livraison calculés à l'étape suivante</p>
        <div className="mt-6">
          <button
            className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Passer à la caisse
          </button>
        </div>
        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
          <p>
            ou{' '}
            <a href="/" className="text-blue-600 font-medium hover:text-blue-500">
              Continuer vos achats<span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;