// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeCard from "./components/RecipeCard";
import Profile from "./pages/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/recipes" /> : <Login setIsAuthenticated={setIsAuthenticated} />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/recipes" /> : <Login setIsAuthenticated={setIsAuthenticated} />
        }
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/recipes" /> : <Register />}
      />
      <Route
        path="/recipes"
        element={isAuthenticated ? <RecipeCard /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
