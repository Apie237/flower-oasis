import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Orders from './pages/Orders'
import FlowerNavbar from './components/FlowerNavbar'
import Footer from './components/Footer'
import { Navigate } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    console.log('Token on home page:', localStorage.getItem('token'));
  }, []);
  
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <FlowerNavbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Navigate to="/collection/bouquets" />} />
        <Route path="/collection/:category" element={<Collection/>} /> 
        <Route path="/collection/:category/:productId" element={<ProductDetails />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/orders' element={<Orders/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App