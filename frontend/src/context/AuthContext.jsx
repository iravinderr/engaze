import React, { createContext, useState, useEffect, useContext } from "react";
import { verifyTokenAPI } from "../services/apis";
import { postRequestAxios } from "../services/requests";
import { Loader } from "../components";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      console.log("verifyTokenAPI -> ", verifyTokenAPI);
      const response = await postRequestAxios(verifyTokenAPI);
      return response.data.success;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      if (await verifyToken()) setAuthenticated(true);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
