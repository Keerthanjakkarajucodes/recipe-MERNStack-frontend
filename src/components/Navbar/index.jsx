import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import "./index.css";

const Navbar = ({ setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // update auth state
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>

        {/* Links */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            <FaUser /> Profile
          </Link>
          <Link to="/recipes" onClick={() => setMenuOpen(false)}>
            <FaHome /> Home
          </Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>
            <FaPlus /> Create
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
