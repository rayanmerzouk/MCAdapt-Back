import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // Assure-toi que ça retourne l'email

  useEffect(() => {
    if (user?.email) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/panier/${user.email}`);
      setCartItems(res.data); // Assure-toi que le backend retourne les infos produit + amount
    } catch (err) {
      console.error("Erreur lors du chargement du panier :", err);
    }
  };

  const handleBuy = (item) => {
    const confirmBuy = window.confirm(`Voulez-vous acheter "${item.title}" pour ${item.price * item.amount} DA ?`);
    if (confirmBuy) {
      navigate(`/paiement/${item.productId}`, { state: { product: item } });
    }
  };

  const handleBuyAll = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
    const confirmBuyAll = window.confirm(`Voulez-vous acheter tous les articles pour un total de ${total} DA ?`);
    if (confirmBuyAll) {
      navigate("/paiement", { state: { cartItems } });
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/panier/${user.personId}/${productId}`);
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleQuantityChange = async (productId, newAmount) => {
    if (newAmount < 1) return;
    try {
      await axios.put(`http://localhost:8000/panier`, {
        personId: user.personId,
        productId,
        amount: newAmount,
      });
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, amount: newAmount } : item
        )
      );
    } catch (err) {
      console.error("Erreur de mise à jour de la quantité :", err);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Votre Panier</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className="flex items-center bg-white shadow-md rounded-lg p-4 transition duration-300 hover:shadow-lg"
              >
                <img
                  src={item.url || "/default-image.jpg"}
                  alt={item.title}
                  className="h-20 w-20 object-cover rounded-lg border"
                />
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-500">{item.price} DA</p>
                  <input
                    type="number"
                    min="1"
                    value={item.amount}
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                    className="w-20 mt-2 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => handleBuy(item)}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Acheter
                  </button>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Total : <span className="text-green-600">{totalPrice} DA</span>
            </p>
            <button
              onClick={handleBuyAll}
              className="bg-orange-400 hover:bg-gray-300 hover:text-black-300 text-white px-6 py-2 rounded-lg font-semibold shadow"
            >
              Tout acheter
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;
