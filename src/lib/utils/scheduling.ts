// 👉 Extract utility functions from scheduling component
import { Appointment, Chair, Provider, AppointmentType } from '@/types/scheduling';
import { appointmentTypes, providers, chairs } from '@/lib/data/scheduling';

export const getAppointmentTypeInfo = (typeId: string): AppointmentType => {
  return appointmentTypes.find(type => type.id === typeId) || appointmentTypes[0];
};

export const getProviderInfo = (providerId: number): Provider | undefined => {
  return providers.find(provider => provider.id === providerId);
};

export const getChairInfo = (chairId: number): Chair | undefined => {
  return chairs.find(chair => chair.id === chairId);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "available": return "bg-green-100 text-green-800";
    case "occupied": return "bg-blue-100 text-blue-800";
    case "maintenance": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const checkConflicts = (newAppointment: Appointment, appointments: Appointment[]): Appointment[] => {
  return appointments.filter(apt => 
    apt.date === newAppointment.date &&
    apt.chairId === newAppointment.chairId &&
    apt.id !== newAppointment.id &&
    (
      (newAppointment.startTime >= apt.startTime && newAppointment.startTime < apt.endTime) ||
      (newAppointment.endTime > apt.startTime && newAppointment.endTime <= apt.endTime) ||
      (newAppointment.startTime <= apt.startTime && newAppointment.endTime >= apt.endTime)
    )
  );
};

export const calculateChairUtilization = (appointments: Appointment[]): { [chairId: number]: number } => {
  const utilization: { [chairId: number]: number } = {};
  
  chairs.forEach(chair => {
    const chairAppointments = appointments.filter(apt => apt.chairId === chair.id);
    const totalMinutes = chairAppointments.reduce((sum, apt) => {
      const start = new Date(`2024-01-01T${apt.startTime}`);
      const end = new Date(`2024-01-01T${apt.endTime}`);
      return sum + (end.getTime() - start.getTime()) / (1000 * 60);
    }, 0);
    utilization[chair.id] = Math.round((totalMinutes / (10 * 60)) * 100); // 10 hour day
  });
  
  return utilization;
};
