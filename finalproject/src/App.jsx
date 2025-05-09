import { useState } from 'react'
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Courses from './pages/Courses';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from "./pages/Register";
import Profile from './pages/UserProfile';
import CourseDetail from './components/CourseDetail';
import Material from './pages/Material';
import './App.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses  />} />
        <Route path="/cart" element={ <Checkout/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:courseId" element={<CourseDetail/>} />
        <Route
          path="/course-material"
          element={<Material />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
