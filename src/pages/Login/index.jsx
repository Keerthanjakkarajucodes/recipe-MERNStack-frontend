import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";
import API from "../../services/api.js";

 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      //  axios request
      const { data } = await API.post("/users/login", formData);

      // we DO use data here (for token), so no ESLint warning
      localStorage.setItem("token", data.token);

      setMessage("Login successful");
      navigate("/profile"); // redirect after login
    } catch (error) {
      console.error("Error while logging in:", error);
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {message && <p className="message">{message}</p>}

        <p className="register-redirect">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
