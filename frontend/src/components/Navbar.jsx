import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopContext';

const Navbar = () => {
  const { getCartCount, cartItems, token, navigate, setCartItems, setToken } = useContext(ShopContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    try {
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        const count = getCartCount ? getCartCount() : cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error calculating cart count:", error);
      setCartCount(0);
    }
  }, [getCartCount, cartItems]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setToken('');
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-around py-5 font-medium">
      <Link to="/">
        <img src={assets.flower_logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="flex-1 hidden sm:flex justify-center gap-10 text-lg text-gray-700">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-2 group ${isActive ? 'text-pink-700' : ''}`}>
          <p>HOME</p>
        </NavLink>

        <NavLink to="/collection" className={({ isActive }) => `flex flex-col items-center gap-2 group ${isActive ? 'text-pink-700' : ''}`}>
          <p>SHOP</p>
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center gap-2 group ${isActive ? 'text-pink-700' : ''}`}>
          <p>ABOUT</p>
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) => `flex flex-col items-center gap-2 group ${isActive ? 'text-pink-700' : ''}`}>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-7 ml-auto">
        <div className="relative group flex items-center gap-2">
          <img onClick={() => token ? null : navigate('/login')} src={assets.userIcon} className="w-7 cursor-pointer" alt="User Login" />
          {token && (
            <div className="absolute right-0 mt-2 w-48 hidden group-hover:flex flex-col bg-white shadow-md">
              <NavLink to="/profile" className="px-4 py-2 hover:text-pink-600">Profile</NavLink>
              <NavLink to="/orders" className="px-4 py-2 hover:text-pink-600">Track Orders</NavLink>
              <p onClick={logout} className="px-4 py-2 hover:text-pink-600 cursor-pointer">Logout</p>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative flex items-center">
          <img src={assets.cart_icon} className="w-7 min-w-7" alt="Cart" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        <img src={assets.menuIcon} alt="Menu" className="w-7 cursor-pointer lg:hidden" />
      </div>
    </div>
  );
};

export default Navbar;