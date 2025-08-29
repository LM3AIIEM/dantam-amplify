// 👉 Extract static data from scheduling component
import { Provider, Chair, AppointmentType, Appointment } from '@/types/scheduling';

export const providers: Provider[] = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "General Dentistry", color: "#2563eb" },
  { id: 2, name: "Dr. Michael Rodriguez", specialty: "Oral Surgery", color: "#16a34a" },
  { id: 3, name: "Dr. Emma Thompson", specialty: "Orthodontics", color: "#ea580c" },
  { id: 4, name: "Lisa Park", specialty: "Dental Hygienist", color: "#8b5cf6" }
];

export const chairs: Chair[] = [
  { id: 1, name: "Chair 1", status: "available", equipment: ["Digital X-Ray", "Ultrasonic Scaler"], location: "Main Floor" },
  { id: 2, name: "Chair 2", status: "occupied", equipment: ["Intraoral Camera", "Laser"], location: "Main Floor" },
  { id: 3, name: "Chair 3", status: "available", equipment: ["Digital X-Ray", "Nitrous Oxide"], location: "Main Floor" },
  { id: 4, name: "Surgery Suite", status: "maintenance", equipment: ["Surgical Microscope", "Implant Kit"], location: "Second Floor" },
  { id: 5, name: "Chair 5", status: "available", equipment: ["Standard Equipment"], location: "Main Floor" },
  { id: 6, name: "Chair 6", status: "available", equipment: ["Orthodontic Setup"], location: "Main Floor" }
];

export const appointmentTypes: AppointmentType[] = [
  { id: "cleaning", name: "Routine Cleaning", duration: 60, color: "#16a34a", equipment: ["Ultrasonic Scaler"] },
  { id: "consultation", name: "Consultation", duration: 30, color: "#2563eb", equipment: [] },
  { id: "filling", name: "Dental Filling", duration: 90, color: "#ea580c", equipment: ["Digital X-Ray"] },
  { id: "root-canal", name: "Root Canal", duration: 120, color: "#dc2626", equipment: ["Digital X-Ray", "Surgical Microscope"] },
  { id: "orthodontic", name: "Orthodontic Adjustment", duration: 45, color: "#8b5cf6", equipment: ["Orthodontic Setup"] },
  { id: "surgery", name: "Oral Surgery", duration: 180, color: "#dc2626", equipment: ["Surgical Microscope", "Implant Kit"] },
  { id: "emergency", name: "Emergency", duration: 60, color: "#ef4444", equipment: [] }
];

// Generate demo appointments
export const generateAppointments = (): Appointment[] => {
  const today = new Date();
  
  return [
    {
      id: 1,
      patientName: "Jennifer Walsh",
      providerId: 1,
      chairId: 1,
      type: "cleaning",
      startTime: "09:00",
      endTime: "10:00",
      date: today.toISOString().split('T')[0],
      status: "confirmed"
    },
    {
      id: 2,
      patientName: "Robert Kim",
      providerId: 2,
      chairId: 2,
      type: "consultation",
      startTime: "10:30",
      endTime: "11:00",
      date: today.toISOString().split('T')[0],
      status: "in-progress"
    },
    {
      id: 3,
      patientName: "Maria Santos",
      providerId: 1,
      chairId: 3,
      type: "filling",
      startTime: "11:30",
      endTime: "13:00",
      date: today.toISOString().split('T')[0],
      status: "confirmed"
    },
    {
      id: 4,
      patientName: "David Chang",
      providerId: 3,
      chairId: 6,
      type: "orthodontic",
      startTime: "14:00",
      endTime: "14:45",
      date: today.toISOString().split('T')[0],
      status: "confirmed"
    }
  ];
};

// Time slots for the calendar (8 AM to 6 PM)
export const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor(8 + i / 2);
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});
