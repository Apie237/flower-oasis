import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-10 max-w-7xl mx-auto py-12">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-rose-800 tracking-widest uppercase">Our Story</h1>
        <div className="w-20 h-1 bg-rose-800 mx-auto mt-4"></div>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img 
            src={assets.about_img || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800'} 
            alt="Flower Shop" 
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p className="text-lg font-medium text-rose-700">Crafting Moments Since 2010</p>
          <p>
            Welcome to our boutique, where flowers are more than just a gift—they are a language of love, sympathy, and celebration. What started as a small local garden has grown into a premier floral destination.
          </p>
          <p>
            Every bouquet we create is handcrafted with the freshest blooms sourced from sustainable farms. We believe in the power of nature to transform spaces and uplift spirits.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div>
              <h4 className="font-bold text-gray-800">100% Fresh</h4>
              <p className="text-sm">Daily arrivals from the best local growers.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Fast Delivery</h4>
              <p className="text-sm">Same-day delivery across the city.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;