import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home, LoginPage, SignupPage } from "./pages";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { PrivateRoute } from "./components"
import { AuthProvider } from './context/AuthContext.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="home/*" element={<PrivateRoute><Home /></PrivateRoute>} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
