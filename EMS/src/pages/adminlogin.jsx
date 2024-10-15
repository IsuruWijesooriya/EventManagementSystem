import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import '../components/AdminLogin.css';
import ManageEvent from './manageevent';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH;

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (username === ADMIN_USERNAME && hashedPassword === ADMIN_PASSWORD_HASH) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password.');
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <ManageEvent />
      ) : (
        <div className="admin-login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
