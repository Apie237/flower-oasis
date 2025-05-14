import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row h-[450px] md:h-[550px] overflow-hidden">
      {/* Left Side */}
      <div className="w-full sm:w-1/2 bg-[#f5f5f5] flex flex-col justify-center px-8 sm:px-16">
        <div className="border-l-2 border-black pl-4">
          <p className="uppercase text-sm text-gray-500 tracking-widest mb-2">Featured</p>
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
            Timeless Elegance
          </h1>
          <p className="mt-4 text-gray-600 text-base">
            Curated pieces to elevate your everyday style.
          </p>
          <a href="#shop" className="mt-6 inline-block text-black underline underline-offset-4 hover:text-gray-800">
            Shop the Collection →
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full sm:w-1/2 h-full">
        <img
          src={assets.hero_image}
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;