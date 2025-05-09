import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetching products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Données reçues invalides.");
        }

        setCards(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        setError("Erreur de chargement des produits.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtering products based on category
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("type");

    if (category) {
      const filtered = cards.filter((card) => card.category === category);
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cards);
    }
  }, [cards]);

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`http://localhost:8000/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Échec de la suppression du produit.");

      setCards(cards.filter((card) => card.productId !== productId)); // Remove deleted product from state
      alert("Produit supprimé avec succès.");
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  // Handle report product
  const handleReportProduct = async (productId) => {
    try {
      const res = await fetch(`http://localhost:8000/products/${productId}/report`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Échec du signalement.");

      alert("Produit signalé avec succès.");
    } catch (err) {
      alert("Erreur lors du signalement.");
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Chargement des produits...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Boutique</h2>
        {filteredCards.length === 0 ? (
          <p className="text-gray-500">Aucun produit trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div key={card.productId} className="relative">
                <Card {...card} />
                {/* Buttons for delete and report */}
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleDeleteProduct(card.productId)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleReportProduct(card.productId)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Signaler
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
