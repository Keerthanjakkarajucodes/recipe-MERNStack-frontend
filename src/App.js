import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeCard from "./components/RecipeCard"; // Correct path to components/RecipeCard

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        {/* If authenticated, redirect from login/register to recipes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/recipes" /> : <Register />}
        />

        {/* Protected route for RecipeCard */}
        <Route
          path="/recipes"
          element={isAuthenticated ? <RecipeCard /> : <Navigate to="/login" />}
        />

        {/* Default route for the root URL */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App; 