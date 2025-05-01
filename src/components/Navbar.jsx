import Links from './Links';
import { cart, user } from '../../assets';
import SearchInput from './SearchInput';
import CostumeButton from './CostumeButton';
import { Link } from 'react-router-dom'; // 💡 Import manquant pour Link
import { useAuth } from '../AuthContext'; // 🛠 Import de useAuth

export const Navbar = () => {
  const { user: loggedInUser, logout } = useAuth(); // 🔐 Récupérer l'utilisateur connecté et la fonction logout

  return (
    <nav className="grid grid-cols-2 gap-8 h-[30px] mb-9 min-w-[1080px] pt-4">
      {/* Section gauche : logo + liens */}
      <div className="grid grid-cols-[1.4fr_3fr] gap-4">
        {/* Logo */}
        <div className="m-auto ml-6">
          <Link to="/">
            <p className="text-orange-400 font-bold text-xl ml-8">Accueil</p>
          </Link>
        </div>

        {/* Liens de navigation */}
        <Links />
      </div>

      {/* Section droite : recherche + boutons */}
      <div className="m-auto grid grid-cols-[2fr_1fr] w-full gap-4">
        {/* Champ de recherche */}
        <SearchInput />

        {/* Boutons : login, profil, panier */}
        <div className="w-full grid grid-cols-[2fr_1fr_1fr]">
          {/* Bouton login ou logout */}
          {loggedInUser ? (
            <button
              onClick={logout}
              className="rounded-sm bg-orange-300 text-black text-sm cursor-pointer	font-poppins-regular w-30 hover:bg-gray-200 h-6 "
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <CostumeButton text="Login" />
            </Link>
          )}

          {/* Icône profil - redirige vers /profil */}
          {loggedInUser && (
            <Link to="/profil">
              <img src={user} alt="user" className="h-6 m-auto" />
            </Link>
          )}

          {/* Panier */}
          <Link to="/panier">
            <img src={cart} alt="cart" className="h-6 m-auto" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
