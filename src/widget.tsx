import React from 'react';
import { createRoot } from 'react-dom/client';
import BookingWidget from './components/BookingWidget';
import './types/global';

// Widget initialization function
(window as any).BookingWidget = {
  init: (containerId: string, options: { apiUrl?: string } = {}) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    // Set API URL if provided
    if (options.apiUrl) {
      // You could set this in a global config or pass it as props
      console.log('API URL set to:', options.apiUrl);
    }

    const root = createRoot(container);
    root.render(React.createElement(BookingWidget));
  }
};

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
  const autoContainer = document.getElementById('booking-widget-auto');
  if (autoContainer) {
    (window as any).BookingWidget.init('booking-widget-auto');
  }
});

// Export for ESM usage
export { BookingWidget };
export default BookingWidget;