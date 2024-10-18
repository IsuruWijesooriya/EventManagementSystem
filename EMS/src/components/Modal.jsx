import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  // Function to handle clicks outside of the modal content
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content featured-card1">
        <img
          src={`http://localhost:3000/${event?.image}`}
          className="featured-image1"
          alt={event?.name}
        />
        <div className="modal-overlay-content">
          <h2>{event?.name}</h2>
          <p><strong>Description:</strong> {event?.description}</p>
          <p><strong>Date & Time:</strong> {new Date(event?.eventtimestamp).toLocaleString()}</p>
          <p><strong>Venue:</strong> {event?.venue}</p>
          <p><strong>Category:</strong> {event?.category}</p>
          <p><strong>Number of Participants:</strong> {event?.noparticipants}</p>
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
