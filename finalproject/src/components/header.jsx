import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import "../style/header.css";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          MYGUIDE
        </Link>
      </div>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <Link to="/home">HOME</Link>
        <Link to="/courses">COURSES</Link>
        <Link to="/cart">
          <FiShoppingCart />
        </Link>

        <div className="dropdown">
          <button className="icon-btn" onClick={toggleDropdown}>
            <FiUser />
          </button>
          {dropdownOpen && (
            <div
              className="dropdown-content"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/login"
                onClick={() => setDropdownOpen(false)}
              >
                Login
              </Link>
              <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                User Page
              </Link>
              <Link
                to="/course-material"
                onClick={() => setDropdownOpen(false)}
              >
                Course Materials
              </Link>
              <Link
                to="/logout"
                onClick={() => setDropdownOpen(false)}
              >
                Logout
              </Link>

            </div>
          )}
        </div>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </nav>
  );
};

export default Navbar;