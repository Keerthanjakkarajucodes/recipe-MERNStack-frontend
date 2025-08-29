// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeCard from "./components/RecipeCard";
import Profile from "./pages/Profile";

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    // The <Router> or <BrowserRouter> component is removed here.
    // We only need the <Routes> and <Route> components.
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
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