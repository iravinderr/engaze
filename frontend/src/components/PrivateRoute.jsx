import React from "react";
import { Navigate } from "react-router-dom";
import useAuthNavigation from "../hooks/AuthNavigation";

function  PrivateRoute({ children }) {
  const { authenticated } = useAuthNavigation();
  return authenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
