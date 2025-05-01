import { createContext, useContext, useEffect, useState } from "react";

// Création du contexte
const CartContext = createContext();

// Fournisseur de contexte
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Sauvegarde automatique dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajoute un produit au panier
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, amount: 1 }];
      }
    });
  };

  // Supprime un produit du panier
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Met à jour la quantité d’un produit dans le panier
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, amount: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour accéder plus facilement au contexte
export const useCart = () => useContext(CartContext);
