import React from 'react';
import { occasionImages } from '../assets/assets';
import { products } from '../assets/assets';
import Title from './Title';

const OccasionImages = () => {
  return (
    <div className="py-8 px-5 text-center">
      {/* Title */}
      <div className="mb-10">
        <Title text1="Shop by" text2="Occasions" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {occasionImages.map((occasion, index) => {
          const product = products.find(p => p.name === occasion.image);

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <img
                src={product?.image[0]}
                alt={occasion.type}
                className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 hover:bg-[#F8E1E9cc] flex flex-col justify-center items-center transition-colors duration-300">
                <h3 className="font-serif text-2xl text-white mb-4 drop-shadow-md capitalize">
                  {occasion.type.replace(/-/g, ' ')}
                </h3>
                <a
                  href={occasion.link}
                  className="bg-white text-[#4A7043] font-semibold py-2 px-5 rounded-full transition-all duration-300 border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white"
                >
                  View Collection
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OccasionImages;