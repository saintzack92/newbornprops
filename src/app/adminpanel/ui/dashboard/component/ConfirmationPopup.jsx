import React from 'react';

const ConfirmationPopup = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-header">
          <h3 className="popup-title">{title}</h3>
        </div>
        <div className="popup-body">
          <p className="popup-message">{message}</p>
        </div>
        <div className="popup-footer">
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};