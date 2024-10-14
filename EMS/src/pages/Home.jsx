import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path to where your logo is stored
import Modal from '../components/Modal.jsx'; // Correct import for Modal

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample events data
  const events = [
    { id: 1, title: "Event 1", details: "Details about Event 1" },
    { id: 2, title: "Event 2", details: "Details about Event 2" },
    { id: 3, title: "Event 3", details: "Details about Event 3" },
    { id: 4, title: "Event 4", details: "Details about Event 4" },
  ];

  // Open modal function
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ width: '80vw', maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Event Logo" className="logo-img" />
        </div>
        <nav className="nav">
          <Link to="/about" className="nav-item button">About</Link>
        </nav>
      </header>

      <section className="filter-section">
        <div className="filters">
          <div className="filter-item">
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
              <option value="all">All</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="art">Art</option>
              <option value="tech">Tech</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="sort">Sort By</label>
            <select id="sort" name="sort">
              <option value="latest">Latest to Oldest</option>
              <option value="oldest">Oldest to Latest</option>
            </select>
          </div>
        </div>
      </section>

      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card" onClick={() => openModal(event)}>
              <h3>{event.title}</h3>
              <p>{event.details}</p>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="page-btn">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span>...</span>
          <button className="page-btn">Next</button>
        </div>
      </section>

      <footer className="footer">
        <h3>Contact Details</h3>
        <p>Email: info@example.com</p>
        <p>Phone: 123-456-7890</p>
      </footer>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default Home;
