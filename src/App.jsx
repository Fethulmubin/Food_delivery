import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Place from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
const App = () => {
   const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin? <LoginPopup setShowLogin = {setShowLogin}/>:<></>}
      <div className='app'>
        <NavBar setShowLogin = {setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Place />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App