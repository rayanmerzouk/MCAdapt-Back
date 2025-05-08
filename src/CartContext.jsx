import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";  // Ajoute l'importation ici

// Créer le contexte du panier
const CartContext = createContext();

// Hook pour l'utiliser
export const useCart = () => useContext(CartContext);

// Provider global du panier
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();  // Accéder à l'utilisateur connecté

  const getUserEmail = () => user?.email;  // Obtenir l'email de l'utilisateur connecté

  const loadCart = () => {
    const email = getUserEmail();
    if (!email) return;

    const stored = localStorage.getItem(`cart-${email}`);
    setCartItems(stored ? JSON.parse(stored) : []);
  };

  const saveCart = (updatedItems) => {
    const email = getUserEmail();
    if (!email) return;

    localStorage.setItem(`cart-${email}`, JSON.stringify(updatedItems));
  };

  const addToCart = (product) => {
    const updatedItems = [...cartItems];
    const index = updatedItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      updatedItems[index].amount += product.amount;
    } else {
      updatedItems.push(product);
    }
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, amount: quantity } : item
    );
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  useEffect(() => {
    if (user) {
      loadCart();  // Charger le panier si l'utilisateur est connecté
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
