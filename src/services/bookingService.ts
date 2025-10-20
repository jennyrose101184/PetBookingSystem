import axios from 'axios';
import type { Booking, BookingFormData } from '../types/booking';

// Configure your API base URL - replace with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookingService = {
  // Submit a new booking
  createBooking: async (bookingData: BookingFormData): Promise<Booking> => {
    try {
      const response = await api.post('/bookings', {
        fullName: bookingData.fullName,
        contactNumber: bookingData.contactNumber,
        email: bookingData.email,
        service: bookingData.service,
        date: bookingData.date?.toISOString().split('T')[0], // Format as YYYY-MM-DD
        time: bookingData.time,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking. Please try again.');
    }
  },

  // Get all bookings (optional - for admin purposes)
  getAllBookings: async (): Promise<Booking[]> => {
    try {
      const response = await api.get('/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('Failed to fetch bookings.');
    }
  },

  // Check availability for a specific date and time
  checkAvailability: async (date: string, time: string): Promise<boolean> => {
    try {
      const response = await api.get(`/bookings/availability?date=${date}&time=${time}`);
      return response.data.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      // Return true as fallback to allow booking
      return true;
    }
  },
};