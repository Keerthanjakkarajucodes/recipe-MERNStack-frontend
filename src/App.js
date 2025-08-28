import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem("token"); // JWT token stored after login
  const isAuthenticated = !!token; // Convert to boolean

  return (
    <Router>
      <Routes>
        {/* Default route → if logged in go Home, else Login */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
        />

        {/* Protected Home */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to  ="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;  