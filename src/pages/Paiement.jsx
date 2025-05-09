import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CardContext } from "../CardContext";
import { useContext } from "react";
import { jsPDF } from "jspdf";

const Paiement = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { cards } = useContext(CardContext);

  const [product, setProduct] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [message, setMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (state?.product) {
      setProduct(state.product);
    } else if (state?.cartItems) {
      setCartItems(state.cartItems);
      const totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
      );
      setProduct({ title: "Panier complet", price: totalPrice });
    } else if (id) {
      const found = cards.find((item) => item.id.toString() === id);
      if (found) setProduct(found);
    }
  }, [state, id, cards]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (!product) return;

    setTimeout(() => {
      setIsPaid(true);

      if (cartItems.length > 0) {
        setMessage(
          `✅ Paiement effectué pour tous les articles du panier.\n\nMontant total : ${product.price} DA.`
        );
      } else {
        setMessage(
          `✅ Paiement effectué !\n\n${
            product.productEmail && product.productPassword
              ? `Identifiants du compte :\nEmail : ${product.productEmail}\nMot de passe : ${product.productPassword}`
              : "Merci pour votre achat."
          }`
        );
      }
    }, 1500);
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reçu de Paiement - C-shop", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date : ${new Date().toLocaleString()}`, 20, 30);

    if (cartItems.length > 0) {
      doc.text("Articles :", 20, 40);
      let y = 50;
      cartItems.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.title} - ${item.price} DA x ${item.amount}`,
          20,
          y
        );
        y += 10;
      });
      doc.text(`Total : ${product.price} DA`, 20, y + 10);
    } else {
      doc.text(`Produit : ${product.title}`, 20, 40);
      doc.text(`Prix : ${product.price} DA`, 20, 50);
      if (product.productEmail && product.productPassword) {
        doc.text(`Email : ${product.productEmail}`, 20, 70);
        doc.text(`Mot de passe : ${product.productPassword}`, 20, 80);
      }
    }

    doc.save("recu-paiement.pdf");
  };

  if (!product) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        ❌ Produit introuvable.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Paiement pour : {product.title}
      </h2>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom sur la carte</label>
          <input type="text" className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Numéro de carte</label>
          <input
            type="text"
            maxLength="16"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">
              Date d'expiration
            </label>
            <input
              type="text"
              placeholder="MM/AA"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">CVV</label>
            <input
              type="text"
              maxLength="3"
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500"
        >
          Payer maintenant ({product.price} DA)
        </button>
      </form>

      {isPaid && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded shadow-sm whitespace-pre-wrap">
          {message}

          <button
            onClick={downloadReceipt}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          >
            Télécharger le reçu PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Paiement;
