import { Link } from "react-router-dom";
import { Gift, Gamepad2, User, MonitorPlay } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-72 min-h-screen bg-white shadow-xl p-6  border-r hidden md:block ">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Catégories</h2>

      {/* Cartes cadeaux en ligne */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-lg mb-2">
          <Gift size={20} className="text-orange-500" />
          <span>Cartes cadeaux</span>
        </div>
        <ul className="pl-4 space-y-2 text-gray-600">
          <li><Link to="/category/amazon" className="hover:text-orange-500">Amazon</Link></li>
          <li><Link to="/category/googleplay" className="hover:text-orange-500">Google Play</Link></li>
          <li><Link to="/category/apple" className="hover:text-orange-500">Apple</Link></li>
         
        </ul>
      </div>

      {/* Abonnements streaming & musique */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-lg mb-2">
          <MonitorPlay size={20} className="text-orange-500" />
          <span>Cartes d'abonnement</span>
        </div>
        <ul className="pl-4 space-y-2 text-gray-600">
          <li><Link to="/category/netflix" className="hover:text-orange-500">Netflix</Link></li>
          <li><Link to="/category/spotify" className="hover:text-orange-500">Spotify</Link></li>
          <li><Link to="/category/appletv" className="hover:text-orange-500">AppleTV</Link></li>
          <li><Link to="/category/gamepass" className="hover:text-orange-500">GamePass</Link></li>
        </ul>
      </div>

      {/* Comptes jeux en ligne */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-lg mb-2">
          <Gamepad2 size={20} className="text-orange-500" />
          <span>Comptes de jeux</span>
        </div>
        <ul className="pl-4 space-y-2 text-gray-600">
    <li><Link to="/category/steam" className="hover:text-orange-500">Steam</Link></li>
    <li><Link to="/category/psn" className="hover:text-orange-500">PlayStation (PSN)</Link></li>
    <li><Link to="/category/xbox" className="hover:text-orange-500">Xbox</Link></li>
    <li><Link to="/category/nintendo" className="hover:text-orange-500">Nintendo eShop</Link></li>
    <li><Link to="/category/epicgames" className="hover:text-orange-500">Epic Games</Link></li>
    <li><Link to="/category/riot" className="hover:text-orange-500">Riot Points</Link></li>
  </ul>
      </div>

      {/* Autres comptes premium */}
      <div>
        <div className="flex items-center gap-2 text-gray-700 font-semibold text-lg mb-2">
          <User size={20} className="text-orange-500" />
          <span>Comptes divers</span>
        </div>
        <ul className="pl-4 space-y-2 text-gray-600">
          <li><Link to="/category/chatgpt" className="hover:text-orange-500">ChatGPT Plus</Link></li>
          <li><Link to="/category/canva" className="hover:text-orange-500">Canva Pro</Link></li>
          <li><Link to="/category/nordvpn" className="hover:text-orange-500">NordVPN</Link></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
