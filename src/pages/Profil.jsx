import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../AuthContext";
import { CardContext } from "../CardContext";
import SideBar from "../components/SideBar";
import Card from "../components/Card";

const Profil = () => {
  const { user } = useAuth();
  const { cards } = useContext(CardContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [history, setHistory] = useState({ published: [], bought: [] });
  const navigate = useNavigate();

  console.log(user);  // Vérifie si l'utilisateur est récupéré correctement

  useEffect(() => {
    if (user) {
      const publishedProducts = cards.filter((card) => card.email === user?.email);
      const boughtProducts = cards.filter((card) => card.buyerEmail === user?.email);

      setHistory({ published: publishedProducts, bought: boughtProducts });

      console.log(publishedProducts, boughtProducts); // Vérifie les produits filtrés
    }
  }, [cards, user]);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        user.profileImage = reader.result;
        localStorage.setItem("user", JSON.stringify(user));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mon Profil</h2>

        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <img
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-4 border-orange-300"
            />
            
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="absolute bottom-0 right-0 opacity-0 cursor-pointer"
              
              
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user?.email}</h3>
          </div>
        </div>

        {/* Historique des produits publiés */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800">Historique des Produits Publiés</h3>
          {history.published.length > 0 ? (
            <ul className="grid grid-cols-3 gap-6 mt-4">
              {history.published.map((card) => (
                <li key={card.id} className="bg-white shadow-lg rounded-lg p-4">
                  <Card {...card} />
                  <p className="mt-2 text-sm text-gray-500">{card.title}</p>
                  <p className="text-sm text-gray-400">{card.price} {card.currency}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun produit publié.</p>
          )}
        </div>

        {/* Historique des produits achetés */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Historique des Produits Achetes</h3>
          {history.bought.length > 0 ? (
            <ul className="grid grid-cols-3 gap-6 mt-4">
              {history.bought.map((card) => (
                <li key={card.id} className="bg-white shadow-lg rounded-lg p-4">
                  <Card {...card} />
                  <p className="mt-2 text-sm text-gray-500">{card.title}</p>
                  <p className="text-sm text-gray-400">{card.price} {card.currency}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun produit acheté.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
