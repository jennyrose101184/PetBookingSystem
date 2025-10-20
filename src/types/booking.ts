export interface Booking {
  id?: number;
  fullName: string;
  contactNumber: string;
  email: string;
  service: string;
  date: Date;
  time: string;
}

export interface BookingFormData {
  fullName: string;
  contactNumber: string;
  email: string;
  service: string;
  date: Date | null;
  time: string;
}

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

export const SERVICES = [
  'Pet Grooming',
  'Veterinary Checkup',
  'Pet Vaccination',
  'Pet Dental Care',
  'Pet Nail Trimming',
  'Pet Bathing',
  'Pet Training Session',
  'Pet Boarding Consultation',
  'Pet Health Consultation',
  'Emergency Pet Care',
  'Pet Surgery Consultation',
  'Other Pet Services'
];