import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CartIcon() {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/panier');
  };

  return (
    <button 
      onClick={handleClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      aria-label="Panier"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default CartIcon;