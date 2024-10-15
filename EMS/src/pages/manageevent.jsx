import React, { useState } from 'react';
import '../components/ManageEvent.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const ManageEvent = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Event 1', description: 'Description for Event 1', category: 'Music', audience: 100, date: '2024-12-01', time: '18:00', venue: 'Hall A' },
    { id: 2, name: 'Event 2', description: 'Description for Event 2', category: 'Sports', audience: 200, date: '2024-12-05', time: '14:00', venue: 'Stadium' },
    { id: 3, name: 'Event 3', description: 'Description for Event 3', category: 'Art', audience: 150, date: '2024-12-08', time: '10:00', venue: 'Art Gallery' },
    // Add more events as needed
  ]);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleSave = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setIsModalOpen(false);
  };

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <Header />

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

      <div className="event-grid">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.name}</h2>
            <button onClick={() => handleEditClick(event)}>Edit</button>
          </div>
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

            {/* Date */}
            <label>Date</label>
            <input
              type="date"
              value={currentEvent.date}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, date: e.target.value })
              }
            />
            <br />

            {/* Time */}
            <label>Time</label>
            <input
              type="time"
              value={currentEvent.time}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, time: e.target.value })
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
