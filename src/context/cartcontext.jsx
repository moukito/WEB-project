import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Récupérer le panier du localStorage s'il existe
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Nombre total d'articles dans le panier
  const [itemCount, setItemCount] = useState(0);

  // Mettre à jour le localStorage quand le panier change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Calculer le nombre total d'articles
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  }, [cartItems]);

  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1, size) => {
    setCartItems(prevItems => {
      // Vérifier si le produit existe déjà dans le panier avec la même taille
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.nom && item.size === size
      );

      if (existingItemIndex > -1) {
        // Si le produit existe déjà, augmenter la quantité
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Sinon, ajouter un nouvel article
        return [...prevItems, {
          id: product.nom,
          name: product.nom,
          price: product.prix,
          brand: product.marque,
          image: product.nom_image[0], // Première image du produit
          quantity,
          size
        }];
      }
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.size === size))
    );
  };

  // Modifier la quantité d'un produit
  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculer le total du panier
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};