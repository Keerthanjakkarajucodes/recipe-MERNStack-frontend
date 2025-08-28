import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeCard from "./components/RecipeCard";

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        {/* Root path → redirect depending on auth */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/recipes" : "/login"} />}
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/recipes"
          element={isAuthenticated ? <RecipeCard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
