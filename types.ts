export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  image: string;
  distance: number; // km
  locationName: string;
  address: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage for mock map
}

export interface Appointment {
  id: string;
  doctorId: string;
  dateStr: string; // "18 Februarie"
  time: string; // "08:30"
  notes: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface UserProfile {
  name: string;
  role: string;
  year: number;
  age: number;
  city: string;
  avatar: string;
  linkedDoctorId: string | null;
}
