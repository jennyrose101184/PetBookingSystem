import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            float: 'right',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: '1',
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Notification;