import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function FlowerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const categories = [
    { name: "BOUQUETS", path: "/collection/bouquets" },
    { name: "BOXES & BASKETS", path: "/collection/boxes-baskets" },
    { name: "DRIED FLOWERS", path: "/collection/dried-flowers" },
    { name: "ROSES", path: "/collection/roses" },
    { name: "LILIES", path: "/collection/lilies" },
    { name: "FOREVER ROSES", path: "/collection/forever-roses" },
    { name: "ADD-ONS", path: "/collection/add-ons" }
  ];

  return (
    <div className="w-full bg-gray-50 border-b border-gray-100">
      {/* Desktop Navigation */}
      <div className="hidden md:block max-w-6xl mx-auto px-4">
        <nav className="flex justify-center">
          <ul className="flex flex-wrap justify-center">
            {categories.map((category) => (
              <li key={category.name} className="mx-3 py-3">
                <NavLink 
                  to={category.path}
                  className={({ isActive }) => 
                    isActive 
                      ? "text-rose-900 bg-rose-50 text-sm tracking-wider px-2 py-1 rounded font-medium"
                      : "text-rose-700 hover:text-rose-900 text-sm tracking-wider transition-colors duration-200 px-2 py-1 hover:bg-rose-50 rounded"
                  }
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden px-4 py-2">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded-md text-rose-700"
        >
          <span className="text-sm font-medium">Browse Flower Categories</span>
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && (
          <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-md">
            <ul className="py-1">
              {categories.map((category) => (
                <li key={category.name}>
                  <NavLink 
                    to={category.path}
                    className={({ isActive }) => 
                      isActive 
                        ? "block px-4 py-2 text-sm text-rose-900 bg-rose-50 font-medium"
                        : "block px-4 py-2 text-sm text-rose-700 hover:bg-rose-50"
                    }
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}