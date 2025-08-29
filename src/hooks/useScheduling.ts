// 👉 Extract scheduling state management logic
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Appointment, SchedulingFilters, ChairUtilization } from '@/types/scheduling';
import { generateAppointments } from '@/lib/data/scheduling';
import { calculateChairUtilization } from '@/lib/utils/scheduling';

export function useScheduling() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filters, setFilters] = useState<SchedulingFilters>({
    selectedDate: null,
    selectedProvider: "all",
    selectedChair: "all",
    searchQuery: ""
  });
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [conflictWarning, setConflictWarning] = useState(null);
  const [chairUtilization, setChairUtilization] = useState<ChairUtilization>({});

  // Initialize data on mount
  useEffect(() => {
    const initialAppointments = generateAppointments();
    setAppointments(initialAppointments);
    setFilters(prev => ({
      ...prev,
      selectedDate: new Date().toISOString().split('T')[0]
    }));
    
    // Calculate chair utilization
    setChairUtilization(calculateChairUtilization(initialAppointments));
  }, []);

  // Filter appointments based on selected criteria
  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesDate = apt.date === filters.selectedDate;
      const matchesProvider = filters.selectedProvider === "all" || apt.providerId === parseInt(filters.selectedProvider);
      const matchesChair = filters.selectedChair === "all" || apt.chairId === parseInt(filters.selectedChair);
      const matchesSearch = filters.searchQuery === "" || 
        apt.patientName.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      return matchesDate && matchesProvider && matchesChair && matchesSearch;
    });
  }, [appointments, filters]);

  const updateFilter = (key: keyof SchedulingFilters, value: string | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    appointments,
    setAppointments,
    filteredAppointments,
    filters,
    updateFilter,
    showNewAppointment,
    setShowNewAppointment,
    conflictWarning,
    setConflictWarning,
    chairUtilization
  };
}
