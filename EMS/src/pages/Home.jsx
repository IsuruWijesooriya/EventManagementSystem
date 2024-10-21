import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal.jsx';

const Home = () => {
  const [events, setEvents] = useState([]); // State to hold events from the backend
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [loading, setLoading] = useState(true); // State to manage loading
  const eventsPerPage = 9;

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('https://34.28.204.50:3000/api/events'); // Adjust URL based on your setup
        const data = await response.json();
        setEvents(data); // Set fetched events
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchEvents();
  }, []);

  // Carousel and Pagination Logic
  const latestEvents = [...events].sort((a, b) => b.id - a.id).slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prevIndex) => (prevIndex + 1) % latestEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [latestEvents.length]);

  const handleNext = () => setCurrentFeatured((prevIndex) => (prevIndex + 1) % latestEvents.length);
  const handlePrev = () => setCurrentFeatured((prevIndex) => (prevIndex - 1 + latestEvents.length) % latestEvents.length);

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

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div style={{ width: '80vw', maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <Header />

      {/* Display Loading Message */}
      {loading ? <p>Loading events...</p> : (
        <>
          {/* Featured Events Section */}
          <section className="featured-events">
  <button className="arrow-btn left-arrow" onClick={handlePrev}>&lt;</button>
  <div className="featured-card" onClick={() => openModal(latestEvents[currentFeatured])}>
    <img
      src={`http://localhost:3000/${latestEvents[currentFeatured]?.image}?t=${Date.now()}`}
      alt={latestEvents[currentFeatured]?.name}
      className="featured-image"
    />
    <div className="featured-card-overlay">
      <div className="featured-card-content">
        <h3>{latestEvents[currentFeatured]?.name}</h3>
        <p>{latestEvents[currentFeatured]?.description}</p>
      </div>
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
                  <option value="sport">Sport</option>
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
                <div key={event.id} className="event-card1" onClick={() => openModal(event)}>
                  <div className="event-card1-image">
                    <img src={`http://localhost:3000/${event.image}`} alt={event.name} />
                  </div>
                  <div className="event-card1-content">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
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
        </>
      )}
    </div>
  );
};

export default Home;
