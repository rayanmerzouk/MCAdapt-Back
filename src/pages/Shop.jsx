import { useContext, useState, useEffect } from "react";
import { CardContext } from "../CardContext";
import { useCart } from "../CartContext";
import SideBar from "../components/SideBar";
import Card from "../components/Card";
import { useAuth } from "../AuthContext";
import { HiDotsVertical } from "react-icons/hi";
import { useSearch } from "../SearchContext"; // Import du SearchContext

export const Shop = () => {
  const { cards, setCards, loading, error } = useContext(CardContext);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { searchTerm } = useSearch(); // Récupère le terme de recherche
  const [openMenuId, setOpenMenuId] = useState(null);

  // Fonction pour filtrer les cartes en fonction du terme de recherche
  const filteredCards = cards.filter((card) => {
    // Vérifie que le titre de la carte existe et que searchTerm est valide
    const title = card.title || ''; // Si title est undefined, on remplace par une chaîne vide
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const isOwnerOrAdmin = (card) => {
    return user?.email === card.email || user?.role === "admin";
  };

  if (loading || error || filteredCards.length === 0) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex items-center justify-center min-h-screen w-full">
          <p>{loading ? "Chargement..." : error ? `Erreur: ${error}` : "Aucun produit."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Boutique</h1>
        <ul className="grid grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <li key={card.id} className="relative">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === card.id ? null : card.id)
                  }
                  className="text-gray-600 hover:text-black p-1"
                >
                  <HiDotsVertical size={20} />
                </button>

                {openMenuId === card.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-md z-20">
                    {isOwnerOrAdmin(card) && (
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        🗑 Supprimer
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Signalé : ${card.name}`)}
                      className="w-full text-left px-4 py-2 text-sm text-orange-500 hover:bg-orange-50"
                    >
                      🚩 Signaler
                    </button>
                  </div>
                )}
              </div>

              <Card {...card} isShop={true} />
              <button
                onClick={() => addToCart(card)}
                className="ml-10 w-48 bg-orange-400 text-white py-2 rounded hover:bg-orange-500"
              >
                Ajouter au panier
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
