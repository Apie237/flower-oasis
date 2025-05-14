import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  PhoneCall, 
  MapPin,
  Heart 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // For demo purposes, we're creating link elements that match your router structure
  // In your actual implementation, import Link from react-router-dom
  const Link = ({ to, children, className }) => (
    <a href={to} className={className}>{children}</a>
  );
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Flower Oasis</h3>
            <p className="text-gray-600 text-sm mb-4">
              Bringing beauty and joy through carefully curated floral arrangements since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-rose-700 hover:text-rose-900" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-rose-700 hover:text-rose-900" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-rose-700 hover:text-rose-900" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-rose-700 text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-rose-700 text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/collection/bouquets" className="text-gray-600 hover:text-rose-700 text-sm">Shop</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-rose-700 text-sm">Contact</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-600 hover:text-rose-700 text-sm">FAQs</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collection/bouquets" className="text-gray-600 hover:text-rose-700 text-sm">Bouquets</Link>
              </li>
              <li>
                <Link to="/collection/boxes-baskets" className="text-gray-600 hover:text-rose-700 text-sm">Boxes & Baskets</Link>
              </li>
              <li>
                <Link to="/collection/dried-flowers" className="text-gray-600 hover:text-rose-700 text-sm">Dried Flowers</Link>
              </li>
              <li>
                <Link to="/collection/roses" className="text-gray-600 hover:text-rose-700 text-sm">Roses</Link>
              </li>
              <li>
                <Link to="/collection/lilies" className="text-gray-600 hover:text-rose-700 text-sm">Lilies</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-rose-700 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">123 Bloom Street, Floral City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={18} className="text-rose-700 mr-2" />
                <span className="text-gray-600 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-rose-700 mr-2" />
                <span className="text-gray-600 text-sm">hello@floweroasis.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-b border-gray-200 py-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest updates on new products and seasonal specials.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 text-sm border border-gray-300 border-r-0 rounded-l focus:outline-none focus:ring-1 focus:ring-rose-300"
              />
              <button className="bg-rose-700 hover:bg-rose-800 text-white py-2 px-4 rounded-r text-sm transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="text-center">
          <div className="mb-4">
            <img src="/api/placeholder/120/40" alt="Payment methods" className="h-6 mx-auto" />
          </div>
          <div className="text-gray-500 text-sm flex flex-col md:flex-row justify-center items-center md:space-x-4">
            <p>&copy; {currentYear} Flower Oasis. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-rose-700">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-rose-700">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400 flex items-center justify-center">
            <span>Made with</span>
            <Heart size={12} className="mx-1 text-rose-600 fill-rose-600" />
            <span>by Flower Oasis Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}