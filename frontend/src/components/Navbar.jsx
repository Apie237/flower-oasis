import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/shopContext";

const Navbar = () => {
  const { getCartCount, cartItems, token, navigate, setCartItems, setToken } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems([]);
    navigate("/login");
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  useEffect(() => {
    setVisible(false);
  }, [location]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between py-4 px-6 max-w-7xl mx-auto">
        <Link to="/">
          <img src={assets.flower_logo} className="w-28 md:w-32" alt="Logo" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-10 text-sm font-semibold tracking-widest text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-rose-600 transition-colors uppercase ${isActive ? "text-rose-600 border-b-2 border-rose-600" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          
          {/* USER DROPDOWN - Desktop */}
          <div className="group relative hidden sm:block">
            <img
              onClick={() => (!token ? navigate("/login") : null)}
              src={assets.userIcon}
              className="w-6 cursor-pointer hover:opacity-70 transition-opacity"
              alt="User"
            />
            {token && (
              <div className="absolute right-0 top-full pt-4 hidden group-hover:block transition-all z-[110]">
                <div className="flex flex-col gap-2 w-48 py-4 px-5 bg-white shadow-2xl rounded-xl border border-gray-100 text-gray-600 font-medium text-sm">
                  <p className="text-xs text-gray-400 uppercase tracking-tighter mb-1">Welcome back!</p>
                  <p onClick={() => navigate("/profile")} className="cursor-pointer hover:text-rose-700 transition-colors">My Profile</p>
                  <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-rose-700 transition-colors">My Orders</p>
                  <hr className="border-gray-50 my-1" />
                  <p onClick={logout} className="cursor-pointer hover:text-rose-700 transition-colors font-bold text-rose-800">Logout</p>
                </div>
              </div>
            )}
          </div>

          {/* CART */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-6" alt="Cart" />
            <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {getCartCount()}
            </span>
          </Link>

          {/* MOBILE TOGGLE */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menuIcon}
            className="w-6 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>

        {/* --- FULL PAGE COLORED MOBILE SIDEBAR --- */}
        <div className={`fixed inset-0 z-[200] bg-rose-800 transition-all duration-500 ease-in-out transform ${visible ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-end p-8">
            <button onClick={() => setVisible(false)} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-[60vh] space-y-10">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`text-3xl font-bold tracking-[0.25em] text-rose-100 hover:text-white transition-all transform ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                {link.name}
              </NavLink>
            ))}

            <div className={`pt-12 flex flex-col items-center gap-6 transform transition-all delay-500 ${visible ? "opacity-100" : "opacity-0"}`}>
              <div className="w-12 h-[1px] bg-rose-400/50"></div>
              {token ? (
                <>
                  <Link to="/profile" className="text-rose-200 text-sm tracking-widest font-medium">MY PROFILE</Link>
                  <p onClick={logout} className="text-white text-sm tracking-widest font-bold cursor-pointer uppercase">LOGOUT</p>
                </>
              ) : (
                <Link to="/login" className="text-white text-lg tracking-widest font-bold">LOGIN / REGISTER</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;