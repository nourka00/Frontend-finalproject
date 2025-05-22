import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/form.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    email: "",
    password: "",
  });

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

    // Client-side validation with specific error messages
    if (!formData.name) {
      toast.error("Full name is required!", { toastId: "name-error" });
      return;
    }

    if (formData.name.length < 2) {
      toast.error("Name must be at least 2 characters long.", {
        toastId: "name-length-error",
      });
      return;
    }

    if (!formData.displayName) {
      toast.error("Display name is required!", {
        toastId: "displayname-error",
      });
      return;
    }

    if (formData.displayName.length < 2) {
      toast.error("Display Name must be at least 2 characters long.", {
        toastId: "displayname-length-error",
      });
      return;
    }

    if (!formData.email) {
      toast.error("Email is required!", { toastId: "email-error" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address!", {
        toastId: "email-format-error",
      });
      return;
    }

    if (!formData.password) {
      toast.error("Password is required!", { toastId: "password-error" });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        toastId: "password-length-error",
      });
      return;
    }

    // Show loading toast
    const toastId = toast.loading("Processing your registration...");

    try {
      const response = await axios.post(
        "https://myguide.onrender.com/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );

      // Update loading toast to success
      toast.success("Registration successful! Redirecting to login...", {
        id: toastId,
        duration: 3000,
      });

      // Navigate after a short delay
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );

      // Update loading toast to error
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
        {
          id: toastId,
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <h2>Sign Up</h2>
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
