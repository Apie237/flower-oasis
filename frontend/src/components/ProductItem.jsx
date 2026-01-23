import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const ProductItem = ({ id, category, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Fallback for category route - default to first category if array exists
  const categoryPath = category && category.length > 0 ? category[0] : 'all';

  return (
    <Link 
      to={`/collection/${categoryPath}/${id}`} 
      className="group flex flex-col h-full bg-white transition-all duration-300 hover:shadow-xl rounded-xl overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={image[0]} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        
        {/* Desktop Hover Overlay - Minimalist look */}
        <div className="hidden md:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
          <span className="bg-white/90 backdrop-blur-sm text-rose-900 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </span>
        </div>
      </div>

      {/* Text Content */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2 group-hover:text-rose-700 transition-colors duration-200 min-h-[40px] leading-tight">
          {name}
        </h3>
        
        <div className="mt-auto pt-3 flex items-center justify-between">
          <p className="text-base md:text-lg font-bold text-rose-800">
            <span className="text-[10px] md:text-xs font-medium mr-0.5 uppercase">{currency}</span>
            {price.toLocaleString()}
          </p>
          
          {/* Subtle Arrow Icon (Better for Boutique Feel than a Plus) */}
          <div className="text-gray-300 group-hover:text-rose-800 transition-all transform group-hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Updated Skeleton to match new aspect ratio and padding
export const ProductItemSkeleton = () => {
  return (
    <div className="block animate-pulse bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="aspect-[4/5] bg-gray-200 w-full"></div>
      <div className="p-3 md:p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;