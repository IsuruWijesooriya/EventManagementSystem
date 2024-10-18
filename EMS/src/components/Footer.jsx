// Footer.jsx
import React from 'react';
import '../App.css'; // Ensure this includes styles for the footer
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle, FaYoutube } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          <FaGoogle />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <FaYoutube />
        </a>
      </div>

      {/* Navigation Links */}
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/">News</a>
        <a href="/about">About</a>
        <a href="/">Contact Us</a>
        <a href="/about">Our Team</a>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>Copyright &copy; 2024, Designed by <strong>AUTOBOTS</strong></p>
      </div>
    </footer>
  );
};

export default Footer;
