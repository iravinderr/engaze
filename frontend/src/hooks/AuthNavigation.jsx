import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const useAuthNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading, authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      // If the user is authenticated and tries to go to the login or signup page, redirect them to a default page like /home
      if (authenticated && (location.pathname === "/" || location.pathname === "/signup")) {
        navigate("/home", { replace: true });  // Or you can redirect to /feed or any other page
      }
      // If the user is not authenticated and tries to access protected pages, redirect them to login
      else if (!authenticated && location.pathname !== "/" && location.pathname !== "/signup") {
        navigate("/", { replace: true }); // Redirect to login if not authenticated
      }
    }
  }, [authenticated, loading, location, navigate]);

  return { authenticated, setAuthenticated, loading, setLoading };
};

export default useAuthNavigation;