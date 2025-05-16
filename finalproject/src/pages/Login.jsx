import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/form.css";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem("token"); // or sessionStorage
    toast.success("Logged out successfully!");
      navigate("/cart");
    }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    // Clear previous errors
    setError("");

    // Send data to the backend
    try {
      const response = await axios.post(
        //"http://localhost:3000/api/auth/login",
         "https://myguide.onrender.com/api/auth/login",
        formData
      );
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      navigate("/home"); // Navigate to the home page
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="form-section">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>

        <div className="signup-cta">
          <p>Don't have an account?</p>
          <Link to="/register">
            <button className="signup-button">Sign Up</button>
          </Link>
          <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
        </div>
      </div>
    </>
  );
};

export default Login;
