import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../CardContext"; // Contexte des cartes
import { useCart } from "../CartContext"; // Contexte du panier
import Sidebar from "../components/SideBar";
import Card from "../components/Card";

const Category = () => {
  const { type } = useParams(); // Récupère le type de produit depuis l'URL
  const { cards } = useContext(CardContext); // Récupère la liste des produits
  const { addToCart } = useCart(); // Utilise la fonction pour ajouter au panier

  // Filtrage des produits par type
  const filteredCards = cards.filter((card) =>
    card.type.toLowerCase() === type.toLowerCase()
  );

  return (
    <div className="flex">
      <Sidebar /> {/* Barre latérale pour la navigation */}

      <div className="flex flex-col p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 capitalize text-gray-800">
          Produits : {type}
        </h2>

        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div key={card.id}>
                <Card {...card} />
                <button
                  onClick={() => addToCart(card)} // Ajout du produit au panier
                  className="mt-3 ml-10 w-48 bg-orange-300 text-white py-2 rounded hover:bg-orange-400 hover:cursor-pointer"
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
