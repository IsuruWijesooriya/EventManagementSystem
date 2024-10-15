import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Header from '../components/Header';
import 'react-datepicker/dist/react-datepicker.css'; // Add date picker styles
import '../components/addevent.css'; 

const Addevent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date()); // Date picker
  const [eventLocation, setEventLocation] = useState('');
  const [ticketPrices, setTicketPrices] = useState([{ type: '', price: '' }]); // Multiple ticket prices
  const [eventDetails, setEventDetails] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [participants, setParticipants] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTicketPriceChange = (index, field, value) => {
    const newTicketPrices = [...ticketPrices];
    newTicketPrices[index][field] = value;
    setTicketPrices(newTicketPrices);
  };

  const addTicketPrice = () => {
    setTicketPrices([...ticketPrices, { type: '', price: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      eventName,
      eventDate,
      eventLocation,
      ticketPrices,
      eventDetails,
      image,
      category,
      participants
    };
    console.log(eventData);
    // Add form submission logic here
  };

  return (
    <div className="newheader">
    <Header />
    <div className="form-container">
      <h1 className="form-title">Add Event</h1>
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
    dateFormat="dd/MM/yyyy h:mm aa" // Includes both date and time formatting
    showTimeSelect // Enable time selection
    timeFormat="HH:mm" // Set the time format (24-hour or 12-hour)
    timeIntervals={15} // Set the time interval for selection (e.g., 15 minutes)
    timeCaption="Time" // Caption for the time picker
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
    accept=".png"  // Restrict to PNG files only
    required
  />
</div>


        <div className="input-container">
          <label>Category:</label>
          <select className="drdown"
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
    </div>
    </div>
  );
};

export default Addevent;
