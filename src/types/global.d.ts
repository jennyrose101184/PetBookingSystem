declare global {
  interface Window {
    BookingWidget: {
      init: (containerId: string, options?: { apiUrl?: string }) => void;
    };
  }
}

export {};