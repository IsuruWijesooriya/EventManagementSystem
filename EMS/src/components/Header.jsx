// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Event Logo" className="logo-img" />
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <nav className="nav">
        <Link to="/about" className="nav-item button">About</Link>
      </nav>
    </header>
  );
};

export default Header;