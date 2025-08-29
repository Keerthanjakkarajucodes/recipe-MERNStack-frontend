import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeCard from "./components/RecipeCard"; // Protected page
import Profile from "./pages/Profile"; // Profile page

function App() {
const token = localStorage.getItem("token"); // Get JWT token
 const isAuthenticated = !!token; // Convert token presence to boolean

  return (
  <Router>
     <Routes>
         {/* If authenticated, redirect from / to /recipes. If not, render the Login component directly. */}
     <Route
         path="/"
     element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
     />

     {/* Auth routes: redirect authenticated users away. */}
     <Route
     path="/login"
         element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
    />
     <Route
     path="/register"
     element={isAuthenticated ? <Navigate to="/recipes" /> : <Register />}
     />
     {/* Protected routes: redirect unauthenticated users to the login page. */}
     <Route
     path="/recipes"
     element={isAuthenticated ? <RecipeCard /> : <Navigate to="/login" />}
     />
     <Route
     path="/profile"
         element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
     />
     </Routes>
   </Router>
 );
}

export default App;