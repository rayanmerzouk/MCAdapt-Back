import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../CartContext'; // 👈 Utiliser le contexte du panier

const DetailedProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // 👈 Utiliser addToCart depuis le CartContext
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  useEffect(() => {
    // Fetch les détails du produit à partir de l'API backend
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Erreur lors du chargement du produit:', error));

    // Pour charger les avis (par exemple, depuis l'API)
    fetch(`/api/products/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Erreur lors du chargement des avis:', error));
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Appel à l'API pour soumettre l'avis (par exemple)
    fetch(`/api/products/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews((prev) => [...prev, data]);
        setNewReview({ name: '', rating: 0, comment: '' });
      })
      .catch((error) => console.error('Erreur lors de la soumission de l\'avis:', error));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  if (!product) {
    return <div className="text-center mt-32 text-lg text-gray-600">Produit non trouvé</div>;
  }

  const averageRating = calculateAverageRating();

  return (
    <div className="pt-24 px-6 lg:px-32">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2 gap-10 p-8">
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.source}
            alt={product.title}
            className="w-full h-[350px] object-contain rounded-lg border"
          />
        </div>

        {/* Infos Produit */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full font-medium inline-block mb-4 uppercase">
              {product.category || "Carte"}
            </span>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{product.description}</p>

            {/* Étoiles Moyenne */}
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-xl ${index < averageRating ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {reviews.length > 0 ? `(${reviews.length} avis)` : "Pas encore d'avis"}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-2xl font-bold text-orange-500 mb-4">{product.price} DA</p>
            <button
              onClick={() => addToCart(product)} // ✅ Ajout correct
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 w-full md:w-1/2"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      {/* Section Avis */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Avis des clients</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-xl font-semibold text-gray-700">{review.name}</span>
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-xl ${index < review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Formulaire d'Avis */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Laissez un avis</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Votre nom</label>
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleReviewChange}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Entrez votre nom"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Votre avis</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Écrivez votre avis ici"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Note</label>
              <div className="flex space-x-2 mt-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-2xl cursor-pointer ${index < newReview.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => handleRatingChange(index + 1)}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 w-full"
            >
              Soumettre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
