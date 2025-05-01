import React from "react";
import { useCart } from "../CartContext";

const Panier = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Fonction pour gérer l'achat
  const handleBuy = (item) => {
    console.log(`Achat en cours pour: ${item.name}`);
    // Redirection ou logique d'achat ici
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-4 border p-4 rounded">
              <img
                src={item.img || "/default-image.jpg"} // 👈 fallback image
                alt={item.name}
                className="h-20 w-20 object-contain"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.price} DA</p>
                <input
                  type="number"
                  min="1"
                  value={item.amount}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 mt-1 border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => handleBuy(item)} // Gestion de l'achat
                  className="text-green-500 hover:text-green-700"
                >
                  Acheter
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Panier;
