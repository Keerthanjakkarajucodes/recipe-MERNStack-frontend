import { useState } from "react";
import { Link } from "react-router-dom";
import './index.css'; 
import API from "../../services/api.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Validation logic
  const validateForm = () => {
    const { name, email, mobile, password } = formData;

    if (!name || !email || !mobile || !password) {
      return "All fields are required.";
    }

    // Mobile must be exactly 10 digits
    if (mobile.length !== 10 || isNaN(mobile)) {
      return "Mobile number must be exactly 10 digits.";
    }

    // Password must have at least one letter and one number
    let hasLetter = false;
    let hasNumber = false;

    for (let char of password) {
      if (isNaN(char)) {
        hasLetter = true;   // It's a letter
      } else {
        hasNumber = true;   // It's a number
      }
    }

    if (!hasLetter || !hasNumber) {
      return "Password must contain both letters and numbers.";
    }

    // Password minimum length
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null; // ✅ Means no error
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      setIsError(true);
      return; 
    }

    setMessage("Registering ......");
    setIsError(false);

    try {
      // ✅ axios POST request
    await API.post("/users/register", formData);

      setMessage("Registration successful!");
      setIsError(false);
      setFormData({ name: "", email: "", password: "", mobile: "" });

    } catch (error) {
      console.error("Error while registering:", error);
      setMessage(error.response?.data?.message || "Registration failed");
      setIsError(true);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="h2">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        {message && (
          <p className={`message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </form>

      <div className="login-redirect">
        <p>Already have an account?</p>
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </div>
  );
};

export default Register;
