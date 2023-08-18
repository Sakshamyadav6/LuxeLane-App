import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NavSection from "./components/NavSection";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
  
const App = () => {
  return (
    <>
      <NavSection/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
         <Route path="/product/:id" element={<ProductDetail/>} />
         <Route path="/shipping" element={<Shipping/>} />
         <Route path="/payment" element={<Payment/>} />
      </Routes>
    </>
  );
};
 
export default App;
