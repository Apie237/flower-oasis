import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const ProductItem = ({ id, category, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/collection/${category[0]}/${id}`} className="block group text-gray-800">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <img 
          src={image[0]} 
          alt={name} 
          className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-300 ease-in-out" 
        />
      </div>
      <div className="mt-3">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-sm text-rose-700 font-medium">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;