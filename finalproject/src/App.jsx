import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import CoursesPage from './pages/CoursesPage';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from "./pages/Register";
import CourseDetailPage from "./pages/CourseDetailPage";
import Material from './pages/Material';
import Profile from './pages/Userprofile';
import './App.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/course-material" element={<Material />} />
          <Route path="/profile" element={<Profile />} />
          {/* In your routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
