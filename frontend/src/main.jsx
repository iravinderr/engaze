import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Feed, Find, Friends, Home, Login, Profile, Settings, Signup, UserProfile, WalletLogin } from "./pages";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { PrivateRoute } from "./components"
import { AuthProvider } from './context/AuthContext.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="wallet-login" element={<WalletLogin/>} />
      <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
      <Route path='find' element={<PrivateRoute><Find /></PrivateRoute>} />
      <Route path="friends" element={<PrivateRoute><Friends /></PrivateRoute>} />
      <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="user/:username" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
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
