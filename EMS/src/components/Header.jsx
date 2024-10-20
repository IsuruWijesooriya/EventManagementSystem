// Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

const Header = () => {
  const location = useLocation();
  
  // Set the title based on the current path
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/about':
        return 'About Us';
      case '/addevent':
        return 'Add Event';
      case '/adminlogin':
        return 'Admin Login';
      case '/admin':
        return 'Manage Events';
      default:
        return 'Event Management System';
    }
  };

  return (
    <header className="header">
      <div className="logo">
        {/* Link component used to navigate to home page when logo is clicked */}
        <Link to="/">
          <img src={logo} alt="Event Logo" className="logo-img" />
        </Link>
      </div>
      <div>
        <h1>{getTitle()}</h1>
      </div>
      <nav className="nav">
        {location.pathname !== '/about' && (
          <Link to="/about" className="nav-item button">About</Link>
        )}
        {location.pathname == '/about' && (
          <Link to="/admin" className="nav-item button">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
