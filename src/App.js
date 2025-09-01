import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeCard from "./components/RecipeCard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import UpdateRecipe from "./pages/UpdateRecipe"; // ✅ import Update page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      {/* ✅ Navbar visible on all pages after login */}
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <div className="page-content">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/recipes" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/recipes" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
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
          <Route
            path="/create"
            element={
              isAuthenticated ? <CreateRecipe /> : <Navigate to="/login" />
            }
          />

          {/* ✅ Add update route */}
          <Route
            path="/update/:id"
            element={
              isAuthenticated ? <UpdateRecipe /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
