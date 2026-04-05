import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About.jsx'
import Orders from './pages/Orders.jsx'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Collection from './pages/Collection.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LatestCollection from './components/LatestCollection.jsx'
import BestSeller from './components/BestSeller.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/> } />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/placeorder" element={<PlaceOrder/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
