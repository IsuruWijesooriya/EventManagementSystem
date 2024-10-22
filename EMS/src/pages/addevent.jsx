import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/addevent.css';

const Addevent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventLocation, setEventLocation] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [participants, setParticipants] = useState('');
  const [message, setMessage] = useState(''); // State for success/error message

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('eventtimestamp', eventDate.toISOString());
    formData.append('venue', eventLocation);
    formData.append('description', eventDetails);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('noparticipants', participants);
  
    try {
      const response = await fetch('https://shopylk.com/api/events', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Event added successfully!');
        
        // Reset the form fields
        setEventName('');
        setEventDate(new Date()); // or an empty string if you handle the date differently
        setEventLocation('');
        setEventDetails('');
        setImage(null); // Reset image field
        setCategory(''); // Assuming '' is the default or no category selected
        setParticipants('');
  
      } else {
        setMessage('Failed to add event. Please try again.');
      }
    } catch (error) {
      setMessage('Error Occurred!');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="newheader">
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-container">
            <label>Event Name:</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="input-container">
            <label>Description:</label>
            <textarea
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              placeholder="Enter event details"
              required
            ></textarea>
          </div>

          <div className="input-container">
            <label>Event Date and Time:</label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              dateFormat="dd/MM/yyyy h:mm aa"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              required
            />
          </div>

          <div className="input-container">
            <label>Venue:</label>
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Enter event venue"
              required
            />
          </div>

          <div className="input-container">
            <label>Upload Image (PNG only):</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept=".png"
              required
            />
          </div>

          <div className="input-container">
            <label>Category:</label>
            <select
              className="drdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select category</option>
              <option value="music">Music</option>
              <option value="sport">Sport</option>
              <option value="art">Art</option>
              <option value="tech">Tech</option>
            </select>
          </div>

          <div className="input-container">
            <label>No. of Participants:</label>
            <input
              type="number"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Enter number of participants"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Add Event</button>
        </form>
        {/* Display success or error message */}
        {message && <p className="form-message">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Addevent;
