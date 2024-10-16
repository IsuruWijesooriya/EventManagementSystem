import React, { useState } from 'react';
import '../components/ManageEvent.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const ManageEvent = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Event 1', description: 'Description for Event 1', category: 'Music', audience: 100, datetime: '2024-12-01T18:00', venue: 'Hall A' },
    { id: 2, name: 'Event 2', description: 'Description for Event 2', category: 'Sports', audience: 200, datetime: '2024-12-05T14:00', venue: 'Stadium' },
    { id: 3, name: 'Event 3', description: 'Description for Event 3', category: 'Art', audience: 150, datetime: '2024-12-08T10:00', venue: 'Art Gallery' },
    { id: 4, name: 'Event 4', description: 'Description for Event 4', category: 'Tech', audience: 120, datetime: '2024-12-10T14:00', venue: 'Tech Hall' },
    { id: 5, name: 'Event 5', description: 'Description for Event 5', category: 'Music', audience: 100, datetime: '2024-12-11T20:00', venue: 'Concert Hall' },
    { id: 6, name: 'Event 6', description: 'Description for Event 6', category: 'Music', audience: 100, datetime: '2024-12-01T18:00', venue: 'Hall A' },
    { id: 7, name: 'Event 7', description: 'Description for Event 7', category: 'Sports', audience: 200, datetime: '2024-12-05T14:00', venue: 'Stadium' },
    { id: 8, name: 'Event 8', description: 'Description for Event 8', category: 'Art', audience: 150, datetime: '2024-12-08T10:00', venue: 'Art Gallery' },
    { id: 9, name: 'Event 9', description: 'Description for Event 9', category: 'Tech', audience: 120, datetime: '2024-12-10T14:00', venue: 'Tech Hall' },
    { id: 10, name: 'Event 10', description: 'Description for Event 10', category: 'Music', audience: 100, datetime: '2024-12-11T20:00', venue: 'Concert Hall' },
  ]);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleSave = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setIsModalOpen(false);
  };

  // Filter and sort events based on search query, category, and sort order
  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (category === 'all' || event.category.toLowerCase() === category.toLowerCase())
    )
    .sort((a, b) => (sortOrder === 'latest' ? b.id - a.id : a.id - b.id));

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Get events for the current page
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Header />

      {/* Navbar with Search and Add Event */}
      <nav className="navbar">
        <div>
          <a href="/">Home</a>
          <a href="/addevent">Add Event</a>
        </div>
        <input
          type="text"
          placeholder="Search Event"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </nav>

      {/* Filter Section for Category and Sort Order */}
      <section className="filter-section">
        <div className="filters">
          <div className="filter-item">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Art">Art</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          <div className="filter-item">
            <label htmlFor="sort">Sort By</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="latest">Latest to Oldest</option>
              <option value="oldest">Oldest to Latest</option>
            </select>
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <div className="event-grid">
        {currentEvents.map((event) => (
          <div 
            className="event-card clickable" 
            key={event.id}
            onClick={() => handleEditClick(event)}
          >
            <h2>{event.name}</h2>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Event</h2>

            {/* Event Name */}
            <label>Event Name</label>
            <input
              type="text"
              value={currentEvent.name}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, name: e.target.value })
              }
            />
            <br />

            {/* Event Description */}
            <label>Description</label>
            <textarea
              value={currentEvent.description}
              onChange={(e) =>
                setCurrentEvent({
                  ...currentEvent,
                  description: e.target.value,
                })
              }
            />
            <br />

            {/* Category Dropdown */}
            <label>Category</label>
            <select
              value={currentEvent.category}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, category: e.target.value })
              }
            >
              <option value="All">All</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Art">Art</option>
              <option value="Tech">Tech</option>
            </select>
            <br />

            {/* Audience */}
            <label>Number of Audience</label>
            <input
              type="number"
              value={currentEvent.audience}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, audience: e.target.value })
              }
            />
            <br />

            {/* Combined Date and Time (Datetime) */}
            <label>Date & Time</label>
            <input
              type="datetime-local"
              value={currentEvent.datetime}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, datetime: e.target.value })
              }
            />
            <br />

            {/* Venue */}
            <label>Venue</label>
            <input
              type="text"
              value={currentEvent.venue}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, venue: e.target.value })
              }
            />
            <br />

            {/* Save and Cancel Buttons */}
            <button onClick={() => handleSave(currentEvent)}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ManageEvent;
