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
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Dasboard from "./pages/admin/Dasboard";
import AdminRoute from "../routes/AdminRoute";
import SecureRoute from "../routes/SecureRoute";

const App = () => {
  return (
    <>
      <NavSection />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<SecureRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/order/:orderId" element={<Order />} />
          <Route path="/" element={<AdminRoute />}>
            <Route path="/admin/dasboard" element={<Dasboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
