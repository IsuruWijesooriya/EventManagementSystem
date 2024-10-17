import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Header from '../components/Header';
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
 
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', eventName); // Matching database field name
    formData.append('eventtimestamp', eventDate.toISOString()); // Matching database field name
    formData.append('venue', eventLocation); // Matching database field name
    formData.append('description', eventDetails); // Matching database field name
    formData.append('image', image); // Assuming image field matches backend expectations
    formData.append('category', category); // Matching database field name
    formData.append('noparticipants', participants); // Matching database field name
 
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        body: formData,
      });
 
      if (response.ok) {
        const result = await response.json();
        console.log('Event added successfully:', result);
      } else {
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
 
          {/* Submit button triggers the form's onSubmit event */}
<button type="submit" className="submit-btn">Add Event</button>
</form>
</div>
</div>
  );
};
 
export default Addevent;