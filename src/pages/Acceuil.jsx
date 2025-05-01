import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, ShoppingCart, User } from 'lucide-react';

function Acceuil() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Achetez ou vendez des <span className="text-orange-500">cartes cadeaux</span> & comptes en ligne en toute sécurité
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Découvrez une large sélection de cartes cadeaux et de comptes premium à prix réduits.
          </p>
          <div className="mt-6 flex gap-4">
            <Link to="/shop" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
              Accéder à la boutique
            </Link>
            <Link to="/publier" className="bg-white border border-orange-500 text-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-100 transition">
              Vendre un produit
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="Gift cards"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Catégories populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link to="/category/giftcards" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <Gift className="text-orange-500" size={40} />
            <h3 className="mt-4 text-lg font-semibold">Cartes Cadeaux</h3>
            <p className="text-gray-500 text-sm">Amazon, iTunes, Netflix, Google Play, etc.</p>
          </Link>
          <Link to="/category/accounts" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <User className="text-orange-500" size={40} />
            <h3 className="mt-4 text-lg font-semibold">Comptes en ligne</h3>
            <p className="text-gray-500 text-sm">Spotify, NordVPN, ChatGPT, Crunchyroll, etc.</p>
          </Link>
          <Link to="/panier" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <ShoppingCart className="text-orange-500" size={40} />
            <h3 className="mt-4 text-lg font-semibold">Voir le panier</h3>
            <p className="text-gray-500 text-sm">Gérez vos achats facilement.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Acceuil;
