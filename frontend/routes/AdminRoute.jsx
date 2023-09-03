import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { role } = useSelector((state) => state.auth);
  return <>{role === "admin" ? <Outlet /> : <Navigate to={"/home"} />}</>;
};

export default AdminRoute;
