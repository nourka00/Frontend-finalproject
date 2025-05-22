import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import "../style/header.css";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo" onClick={closeAllMenus}>
          MYGUIDE
        </Link>
      </div>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <Link to="/home" onClick={closeAllMenus}>
          HOME
        </Link>
        <Link to="/courses" onClick={closeAllMenus}>
          COURSES
        </Link>
        <Link to="/cart" onClick={closeAllMenus}>
          <FiShoppingCart className="nav-icon" />
        </Link>

        <div className="dropdown">
          <button className="icon-btn user-icon" onClick={toggleDropdown}>
            <FiUser className="nav-icon" />
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              {!user ? (
                <Link to="/login" onClick={closeAllMenus}>
                  Login
                </Link>
              ) : (
                <>
                  <Link to="/profile" onClick={closeAllMenus}>
                    User Page
                  </Link>
                  <Link to="/course-material" onClick={closeAllMenus}>
                    Course Materials
                  </Link>
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
    </nav>
  );
};

export default Navbar;