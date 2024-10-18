import React, { useState, useEffect } from 'react';
import '../components/ManageEvent.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
 
const ManageEvent = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState(''); // Message is initially empty
 
  const [originalEvent, setOriginalEvent] = useState(null); // Store original event data for comparison
 
  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
 
    fetchEvents();
  }, []);
 
  const handleEditClick = (event) => {
    setOriginalEvent(event); // Set original event data for comparison
    setCurrentEvent(event);
    setImagePreview(`http://localhost:3000/${event.image}`);
    setIsModalOpen(true);
    setMessage(''); // Clear message when opening the modal
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCurrentEvent({ ...currentEvent, image: file });
    }
  };
 
  const handleSubmit = async () => {
    if (!currentEvent) return;
 
    // Prevent submission if there are no changes
    if (
      currentEvent.name === originalEvent.name &&
      currentEvent.description === originalEvent.description &&
      currentEvent.eventtimestamp === originalEvent.eventtimestamp &&
      currentEvent.venue === originalEvent.venue &&
      currentEvent.category === originalEvent.category &&
      currentEvent.noparticipants === originalEvent.noparticipants &&
      !(currentEvent.image instanceof File) // No new image uploaded
    ) {
      setMessage('No changes detected, event not updated.');
      return;
    }
 
    const formData = new FormData();
    formData.append('name', currentEvent.name);
    formData.append('description', currentEvent.description);
    formData.append('eventtimestamp', currentEvent.eventtimestamp);
    formData.append('venue', currentEvent.venue);
    formData.append('category', currentEvent.category);
    formData.append('noparticipants', currentEvent.noparticipants);
 
    if (currentEvent.image instanceof File) {
      formData.append('image', currentEvent.image);
    }
 
    try {
      const response = await fetch(`http://localhost:3000/api/events/${currentEvent.id}`, {
        method: 'PUT',
        body: formData,
      });
 
      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
        setMessage('Event updated successfully!'); // Set success message only after successful update
        setIsModalOpen(false); // Close modal after successful update
      } else {
        const errorResponse = await response.json();
        console.error('Failed to update event:', errorResponse);
        setMessage('Failed to update event. Please try again.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setMessage('An error occurred while updating the event.');
    }
  };
 
  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (category === 'all' || event.category.toLowerCase() === category.toLowerCase())
    )
    .sort((a, b) => (sortOrder === 'latest' ? b.id - a.id : a.id - b.id));
 
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
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
 
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
<button
            key={index + 1}
            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
>
            {index + 1}
</button>
        ))}
</div>
 
      {isModalOpen && currentEvent && (
<div className="modal">
<div className="modal-content">
<h2>Edit Event</h2>
 
            <label>Event Name</label>
<input
              type="text"
              value={currentEvent?.name || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, name: e.target.value })}
            />
<br />
 
            <label>Description</label>
<textarea
              value={currentEvent?.description || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
            />
<br />
 
            <label>Category</label>
<select
              value={currentEvent?.category || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, category: e.target.value })}
>
<option value="Music">Music</option>
<option value="Sports">Sports</option>
<option value="Art">Art</option>
<option value="Tech">Tech</option>
</select>
<br />
 
            <label>Number of Participants</label>
<input
              type="number"
              value={currentEvent?.noparticipants || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, noparticipants: e.target.value })}
            />
<br />
 
            <label>Date & Time</label>
<input
              type="datetime-local"
              value={currentEvent?.eventtimestamp ? new Date(currentEvent.eventtimestamp).toISOString().slice(0, 16) : ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, eventtimestamp: e.target.value })}
            />
<br />
 
            <label>Venue</label>
<input
              type="text"
              value={currentEvent?.venue || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, venue: e.target.value })}
            />
<br />
 
            <label>Image (PNG only)</label>
<input
              type="file"
              accept="image/png"
              onChange={handleImageChange}
            />
<br />
 
            {imagePreview && (
<div className="image-preview">
<img src={imagePreview} alt="Preview" width="200px" />
</div>
            )}
 
            <button onClick={handleSubmit}>Submit</button>
<button onClick={() => setIsModalOpen(false)}>Cancel</button>
 
            {message && <p>{message}</p>}
</div>
</div>
      )}
 
      <Footer />
</div>
  );
};
 
export default ManageEvent;