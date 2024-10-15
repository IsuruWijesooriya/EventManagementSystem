import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal.jsx';
import image from '../assets/image.jpg';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const eventsPerPage = 9;

  const events = [
    { id: 1, title: "Event 1", category: "music", details: "Details about Event 1", image: image },
    { id: 2, title: "Event 2", category: "sports", details: "Details about Event 2", image: image },
    { id: 3, title: "Event 3", category: "art", details: "Details about Event 3", image: image },
    { id: 4, title: "Event 4", category: "tech", details: "Details about Event 4", image: image },
    { id: 5, title: "Event 5", category: "music", details: "Details about Event 5", image: image },
    { id: 6, title: "Event 6", category: "sports", details: "Details about Event 6", image: image },
    { id: 7, title: "Event 7", category: "art", details: "Details about Event 7", image: image },
    { id: 8, title: "Event 8", category: "tech", details: "Details about Event 8", image: image },
    { id: 9, title: "Event 9", category: "music", details: "Details about Event 9", image: image },
    { id: 10, title: "Event 10", category: "sports", details: "Details about Event 10", image: image },
    { id: 11, title: "Event 11", category: "art", details: "Details about Event 11", image: image },
    { id: 12, title: "Event 12", category: "tech", details: "Details about Event 12", image: image },
    { id: 13, title: "Event 13", category: "music", details: "Details about Event 13", image: image },
    { id: 14, title: "Event 14", category: "sports", details: "Details about Event 14", image: image },
    { id: 15, title: "Event 15", category: "art", details: "Details about Event 15", image: image },
    { id: 16, title: "Event 16", category: "tech", details: "Details about Event 16", image: image },
    { id: 17, title: "Event 17", category: "music", details: "Details about Event 17", image: image },
    { id: 18, title: "Event 18", category: "sports", details: "Details about Event 18", image: image },
    { id: 19, title: "Event 19", category: "art", details: "Details about Event 19", image: image },
    { id: 20, title: "Event 20", category: "tech", details: "Details about Event 20", image: image },
  ];  

  const latestEvents = [...events].sort((a, b) => b.id - a.id).slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prevIndex) => (prevIndex + 1) % latestEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [latestEvents.length]);

  const handleNext = () => {
    setCurrentFeatured((prevIndex) => (prevIndex + 1) % latestEvents.length);
  };

  const handlePrev = () => {
    setCurrentFeatured((prevIndex) => (prevIndex - 1 + latestEvents.length) % latestEvents.length);
  };

  const filteredEvents = events
    .filter(event => category === 'all' || event.category === category)
    .sort((a, b) => (sortOrder === 'latest' ? b.id - a.id : a.id - b.id));

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: '80vw', maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <Header />
      
      {/* Featured Events Section with Arrows and Dots */}
      <section className="featured-events">
  <button className="arrow-btn left-arrow" onClick={handlePrev}>&lt;</button>
  <div
    className="featured-card"
    style={{ backgroundImage: `url(${latestEvents[currentFeatured].image})` }}
    onClick={() => openModal(latestEvents[currentFeatured])}
  >
    <div className="featured-card-name">
      <h3>{latestEvents[currentFeatured].title}</h3>
    </div>
    <div className="featured-card-description">
      <p>{latestEvents[currentFeatured].details}</p>
    </div>
  </div>
  <button className="arrow-btn right-arrow" onClick={handleNext}>&gt;</button>
</section>

      
      {/* Dot Indicators */}
      <div className="dot-indicators">
        {latestEvents.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentFeatured === index ? 'active' : ''}`}
          ></span>
        ))}
      </div>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filters">
          <div className="filter-item">
            <label htmlFor="category">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="art">Art</option>
              <option value="tech">Tech</option>
            </select>
          </div>
          <div className="filter-item">
            <label htmlFor="sort">Sort By</label>
            <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="latest">Latest to Oldest</option>
              <option value="oldest">Oldest to Latest</option>
            </select>
          </div>
        </div>
      </section>

      {/* Events List Section */}
      <section className="events-section">
        <h2>All Events</h2>
        <div className="events-grid">
  {currentEvents.map((event) => (
    <div key={event.id} className="event-card" onClick={() => openModal(event)}>
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p>{event.details}</p>
      </div>
    </div>
  ))}
</div>

        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default Home;
