import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useAuthNavigation = () => {
  const navigate = useNavigate();
  const { loading, setLoading, authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated, navigate]);

  return { authenticated, setAuthenticated, loading, setLoading };
};

export default useAuthNavigation;