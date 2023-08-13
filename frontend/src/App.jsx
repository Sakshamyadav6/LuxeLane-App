import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NavSection from "./components/NavSection";
import ProductDetail from "./components/ProductDetail";
 
const App = () => {
  return (
    <>
      <NavSection/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </>
  );
};
 
export default App;
