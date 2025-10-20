import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { BookingFormData } from '../types/booking';
import { TIME_SLOTS, SERVICES } from '../types/booking';
import { bookingService } from '../services/bookingService';
import './BookingForm.css';

interface BookingFormProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    contactNumber: '',
    email: '',
    service: '',
    date: null,
    time: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>(TIME_SLOTS);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await bookingService.createBooking(formData);
      
      // Reset form
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        service: '',
        date: null,
        time: '',
      });
      
      setErrors({});
      onSuccess?.('Booking created successfully! We will contact you soon.');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof BookingFormData, value: string | Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Check availability when date changes
  useEffect(() => {
    if (formData.date) {
      const checkSlots = async () => {
        const dateStr = formData.date!.toISOString().split('T')[0];
        const available = [];
        
        for (const slot of TIME_SLOTS) {
          try {
            const isAvailable = await bookingService.checkAvailability(dateStr, slot);
            if (isAvailable) {
              available.push(slot);
            }
          } catch {
            // If check fails, assume slot is available
            available.push(slot);
          }
        }
        
        setAvailableSlots(available);
        
        // Reset time if current selection is no longer available
        if (formData.time && !available.includes(formData.time)) {
          setFormData(prev => ({ ...prev, time: '' }));
        }
      };
      
      checkSlots();
    } else {
      setAvailableSlots(TIME_SLOTS);
    }
  }, [formData.date]);

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <h2 className="booking-form-title">Book an Appointment</h2>
        
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number *
          </label>
          <input
            type="tel"
            id="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
            className={`form-input ${errors.contactNumber ? 'error' : ''}`}
            placeholder="Enter your contact number"
          />
          {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email address"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="service" className="form-label">
            Service *
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            className={`form-input ${errors.service ? 'error' : ''}`}
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <span className="error-message">{errors.service}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Appointment Date *
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleInputChange('date', date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className={`form-input date-picker ${errors.date ? 'error' : ''}`}
            placeholderText="Select appointment date"
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="time" className="form-label">
            Appointment Time *
          </label>
          <select
            id="time"
            value={formData.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className={`form-input ${errors.time ? 'error' : ''}`}
            disabled={!formData.date}
          >
            <option value="">Select a time</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <span className="error-message">{errors.time}</span>}
          {formData.date && availableSlots.length === 0 && (
            <span className="info-message">No available slots for this date</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || (!!formData.date && availableSlots.length === 0)}
          className="submit-button"
        >
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;