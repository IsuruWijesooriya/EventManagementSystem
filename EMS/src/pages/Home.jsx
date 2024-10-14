import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Event Management System</h1>
      <p>Explore and manage your events easily.</p>

      {/* Link to About Us page */}
      <Link to="/about">
        <button>About Us</button>
      </Link>
    </div>
  );
};

export default Home;
