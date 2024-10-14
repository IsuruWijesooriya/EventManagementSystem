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

      {/* Link to Admin Login page */}
      <Link to="/admin">
        <button>Admin Login</button>
      </Link>

      {/* Link to Add Event page */}
      <Link to="/addevent">
        <button>Add Event</button>
      </Link>

      {/* Link to Manage Event page */}
      <Link to="/manageevent">
        <button>Manage Events</button>
      </Link>
    </div>
  );
};

export default Home;
