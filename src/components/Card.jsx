import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export const Card = ({
  id,
  img,
  name,
  price,
  favorite,
  rated = 1,
  isOnSale = false,
  sex,
  type,
  isOwner = false,
  isAdmin = false,
  onDelete,
  onReport,
  onClickAddToCart,
}) => {
  const navigate = useNavigate();
  const [rating] = useState(rated);

  const handleNavigateToProduct = () => {
    navigate(`/product/${id}`);
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
          src={img}
          alt={name}
          className="object-contain h-[140px] transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="text-sm text-gray-500 uppercase tracking-wide">{sex} | {type}</div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
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
