import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../style/form.css";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    if (
      !formData.name ||
      !formData.displayName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required!");
      toast.error("All fields are required!");
      return;
    }

    if (formData.name.length < 2) {
      setError("Name must be at least 2 characters long.");
      toast.error("Name must be at least 2 characters long.");
      return;
    }

    if (formData.displayName.length < 2) {
      setError("Display Name must be at least 2 characters long.");
      toast.error("Display Name must be at least 2 characters long.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address!");
      toast.error("Please enter a valid email address!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "https://myguide.onrender.com/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
            />
            <small>
              This will be how your name will be displayed in the account
              section and in reviews.
            </small>
          </div>
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
            Sign Up
          </button>
        </form>
        <div className="login-cta">
          <p>Already have an account?</p>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
