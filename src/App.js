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
        {/*
          Root path:
          - If authenticated, redirect to /recipes.
          - If NOT authenticated, render the Login component directly.
        */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/recipes" /> : <Login />}
        />

        {/* Auth routes: Render the components directly */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route:
          - If authenticated, render the RecipeCard.
          - If NOT authenticated, redirect to /login.
        */}
        <Route
          path="/recipes"
          element={isAuthenticated ? <RecipeCard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;