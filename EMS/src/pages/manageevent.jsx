import React, { useState } from 'react';
import '../components/ManageEvent.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const ManageEvent = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Event 1', description: 'Description for Event 1' },
    { id: 2, name: 'Event 2', description: 'Description for Event 2' },
    { id: 3, name: 'Event 3', description: 'Description for Event 3' },
    { id: 4, name: 'Event 4', description: 'Description for Event 4' },
    { id: 5, name: 'Event 5', description: 'Description for Event 5' },
    { id: 6, name: 'Event 6', description: 'Description for Event 6' },
    { id: 7, name: 'Event 7', description: 'Description for Event 7' },
    { id: 8, name: 'Event 8', description: 'Description for Event 8' },
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
            <input
              type="text"
              value={currentEvent.name}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, name: e.target.value })
              }
            />
            <br />
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
            <button onClick={() => handleSave(currentEvent)}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      
      <Footer/>
    </div>
  );
};

export default ManageEvent;