// src/context/AuthProvider.jsx
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const baseURL = "https://myguide.onrender.com"; // Replace with your backend URL
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { t: Date.now() }, // Cache buster
        });
        // setUser(response.data.user);
        const user = response.data.user;
        if (user?.image_path) {
          user.image_path = `${user.image_path.split("?")[0]}?${Date.now()}`;
        }

        setUser(user);
        toast.success("Welcome back!", { autoClose: 2000 });
      } catch (error) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      toast.success("Logged in successfully!");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("You have been logged out.");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user,setUser, loading,login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};