import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="./assets/logo.png" 
          alt="Logo"
          className="logo"
        />
      </div>
      <nav className="nav">
        <Link to="./pages/aboutus" className="nav-link">About Us</Link>
      </nav>
    </header>
  );
};

export default Header;
