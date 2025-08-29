// 👉 Extract types & schemas from scheduling page
export interface Provider {
  id: number;
  name: string;
  specialty: string;
  color: string;
}

export interface Chair {
  id: number;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  equipment: string[];
  location: string;
}

export interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  color: string;
  equipment: string[];
}

export interface Appointment {
  id: number;
  patientName: string;
  providerId: number;
  chairId: number;
  type: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
}

export interface ChairUtilization {
  [chairId: number]: number;
}

export interface SchedulingFilters {
  selectedDate: string | null;
  selectedProvider: string;
  selectedChair: string;
  searchQuery: string;
}
