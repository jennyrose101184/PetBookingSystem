import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Notification from './Notification';
import './BookingForm.css';

const BookingWidget: React.FC = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSuccess = (message: string) => {
    setNotification({ message, type: 'success' });
    // Auto-hide success message after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  const handleError = (message: string) => {
    setNotification({ message, type: 'error' });
    // Auto-hide error message after 8 seconds
    setTimeout(() => setNotification(null), 8000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="booking-widget">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <BookingForm onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default BookingWidget;