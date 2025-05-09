import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export const Card = ({
  productId,
  source,
  title,
  price,
  rated = 1,
  isOnSale = false,
  category,
}) => {
  const navigate = useNavigate();
  const [rating] = useState(rated);

  const handleNavigateToProduct = () => {
    navigate(`/product/${productId}`);
  };

  const renderStars = () => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <div
      onClick={handleNavigateToProduct}
      className="w-[240px] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden cursor-pointer m-6"
    >
      <div className="h-[180px] bg-gray-100 flex items-center justify-center">
        <img
          src={source}
          alt={title}
          className="object-contain h-[140px] transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="text-sm text-gray-500 uppercase tracking-wide">{category}</div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        {renderStars()}
        <div className="flex justify-between items-center mt-2">
          <p className="text-orange-500 font-bold text-base">{price} DA</p>
          {isOnSale && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">Promo</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
