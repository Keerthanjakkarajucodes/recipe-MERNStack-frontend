import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeCard from "./pages/RecipeCard"; // 👈 use RecipeCard instead of Home

function App() {
  const token = localStorage.getItem("token"); // JWT token stored after login
  const isAuthenticated = !!token; // Convert to boolean

  return (
    <Router>
      <Routes>
        {/* Default route → if logged in go RecipeCard, else Login */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/recipes" /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/recipes" /> : <Register />}
        />

        {/* Protected RecipeCard */}
        <Route
          path="/recipes"
          element={isAuthenticated ? <RecipeCard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
