import React from "react";
import "../style/Footer.css"; // Import your CSS file
import { FiLinkedin } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="logo-section">
          <div className="logo-footer">MYGUIDE</div>
          <p className="tagline-site">
            From Concepts to Career. Your Engineering Hub.
            <br /> My Journey. Your Learning Path.
            <br />
            Learn. Apply. Grow.
          </p>
        </div>
      </div>
      <div className="footer-right">
        <h2 className="vision-text">LET'S DISCUSS</h2>
        <div className="vision-row">
          <h2 className="vision-text">YOUR VISION</h2>
          <svg viewBox="0 0 100 100" className="cut-circle">
            <path
              d="
          M 50,50 
          L 50,0 
          A 50,50 0 1,1 21.7,7.6 
          Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-copyright">
          <div className="social-links">
            <a href="https://linkedin.com">
              <FiLinkedin size={24} color="white" />
            </a>
            <a href="https://youtube.com">
              <FaYoutube size={24} color="white" />
            </a>
          </div>
          <p className="copyright">ALL COPYRIGHTS RESERVED 2025</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
