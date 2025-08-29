// 👉 Extract appointment cell component - focused UI piece
import React from 'react';
import { Appointment } from '@/types/scheduling';
import { getAppointmentTypeInfo, getProviderInfo } from '@/lib/utils/scheduling';

interface AppointmentCellProps {
  appointment: Appointment;
  timeSlot: string;
}

export function AppointmentCell({ appointment, timeSlot }: AppointmentCellProps) {
  if (appointment.startTime !== timeSlot) return null;

  const appointmentType = getAppointmentTypeInfo(appointment.type);
  const provider = getProviderInfo(appointment.providerId);
  
  const duration = new Date(`2024-01-01T${appointment.endTime}`).getTime() - 
                  new Date(`2024-01-01T${appointment.startTime}`).getTime();
  const heightPx = (duration / (1000 * 60)) * 2; // 2px per minute

  return (
    <div 
      className="absolute inset-1 rounded p-2 text-xs text-white shadow-sm"
      style={{ 
        backgroundColor: appointmentType.color,
        height: `${heightPx}px`
      }}
    >
      <div className="font-medium truncate">{appointment.patientName}</div>
      <div className="truncate">{appointmentType.name}</div>
      <div className="truncate">{provider?.name}</div>
    </div>
  );
}
