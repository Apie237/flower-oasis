import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Orders from './pages/Orders'
import FlowerNavbar from './components/FlowerNavbar'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'

const App = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Token on home page:', localStorage.getItem('token'));
  }, []);

  // Check if the current path starts with "/collection"
  const isCollectionPage = location.pathname.startsWith('/collection');

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      
      {/* Conditionally render FlowerNavbar only if on a collection path */}
      {isCollectionPage && <FlowerNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Navigate to="/collection/bouquets" />} />
        <Route path="/collection/:category" element={<Collection />} />
        <Route path="/collection/:category/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App