import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [count, setCount] = useState(0)

  return (
  
    
        <><main>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route
          path="/course-material"
          element={<ProtectedRoute>
            <Material />
          </ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} />
        {/* In your routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main><ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover /></>
  );
};

export default App;
