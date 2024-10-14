import React from 'react';
import './Modal.css'; // Create a CSS file for modal styles

const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{event.title}</h2>
        <p>{event.details}</p>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
