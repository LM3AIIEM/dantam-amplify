import { useState, useEffect, useMemo, useCallback } from 'react';
import sharedMockData from '@/shared/mock-patients.json';
import { Patient, PatientState, NewPatientFormData } from './types';

// Initial state
const initialState: PatientState = {
  currentView: 'list',
  selectedPatientId: null,
  searchQuery: '',
  activeTab: 'all',
  detailTab: 'overview',
  showNewPatientForm: false,
  newPatientStep: 1,
  filters: {
    status: 'all',
    ageRange: null,
    hasBalance: false,
    insuranceStatus: 'all'
  },
  sort: {
    field: 'name',
    direction: 'asc'
  },
  pagination: {
    page: 1,
    pageSize: 20,
    totalPages: 1
  },
  ui: {
    isLoading: false,
    error: null,
    successMessage: null
  }
};

// Custom hook for patient management
export const usePatientManagement = () => {
  const [state, setState] = useState<PatientState>(initialState);
  const [patients] = useState<Patient[]>(sharedMockData.patients as Patient[]);
  
  // Filter patients based on search and filters
  const filteredPatients = useMemo(() => {
    let filtered = [...patients];
    
    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(query) ||
        patient.phone.includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.id.toString().includes(query)
      );
    }
    
    // Apply status filter
    if (state.activeTab !== 'all') {
      filtered = filtered.filter(patient => patient.status === state.activeTab);
    }
    
    // Apply additional filters
    if (state.filters.status !== 'all') {
      filtered = filtered.filter(patient => patient.status === state.filters.status);
    }
    
    if (state.filters.insuranceStatus !== 'all') {
      filtered = filtered.filter(patient => patient.insuranceStatus === state.filters.insuranceStatus);
    }
    
    if (state.filters.hasBalance) {
      filtered = filtered.filter(patient => patient.balance > 0);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[state.sort.field as keyof Patient] ?? '';
      const bValue = b[state.sort.field as keyof Patient] ?? '';
      
      if (state.sort.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  }, [patients, state.searchQuery, state.activeTab, state.filters, state.sort]);
  
  // Pagination
  const paginatedPatients = useMemo(() => {
    const start = (state.pagination.page - 1) * state.pagination.pageSize;
    const end = start + state.pagination.pageSize;
    return filteredPatients.slice(start, end);
  }, [filteredPatients, state.pagination]);
  
  // Update functions
  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, pagination: { ...prev.pagination, page: 1 } }));
  }, []);
  
  const setActiveTab = useCallback((tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab, pagination: { ...prev.pagination, page: 1 } }));
  }, []);
  
  const selectPatient = useCallback((patientId: number | null) => {
    setState(prev => ({ 
      ...prev, 
      selectedPatientId: patientId,
      currentView: patientId ? 'detail' : 'list'
    }));
  }, []);
  
  const setShowNewPatientForm = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showNewPatientForm: show }));
  }, []);
  
  const setFilter = useCallback((filterKey: string, value: any) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, [filterKey]: value },
      pagination: { ...prev.pagination, page: 1 }
    }));
  }, []);
  
  const setSort = useCallback((field: string) => {
    setState(prev => ({
      ...prev,
      sort: {
        field,
        direction: prev.sort.field === field && prev.sort.direction === 'asc' ? 'desc' : 'asc'
      }
    }));
  }, []);
  
  const setPage = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      pagination: { ...prev.pagination, page }
    }));
  }, []);
  
  // Get selected patient details
  const selectedPatient = useMemo(() => {
    if (!state.selectedPatientId) return null;
    return patients.find(p => p.id === state.selectedPatientId);
  }, [state.selectedPatientId, patients]);
  
  // Calculate stats
  const stats = useMemo(() => {
    const total = patients.length;
    const active = patients.filter(p => p.status === 'active').length;
    const needsFollowup = patients.filter(p => p.status === 'needs-followup').length;
    const withBalance = patients.filter(p => p.balance > 0).length;
    const totalBalance = patients.reduce((sum, p) => sum + p.balance, 0);
    
    return {
      total,
      active,
      needsFollowup,
      withBalance,
      totalBalance,
      activePercentage: Math.round((active / total) * 100)
    };
  }, [patients]);
  
  return {
    state,
    patients: paginatedPatients,
    filteredCount: filteredPatients.length,
    selectedPatient,
    stats,
    actions: {
      setSearchQuery,
      setActiveTab,
      selectPatient,
      setShowNewPatientForm,
      setFilter,
      setSort,
      setPage
    }
  };
};

// Hook for handling patient actions
export const usePatientActions = () => {
  const handleAction = useCallback((action: string, patient: any) => {
    switch (action) {
      case 'schedule':
        console.log('Schedule appointment for:', patient.name);
        // Would integrate with scheduling module
        break;
      case 'message':
        console.log('Send message to:', patient.name);
        // Would integrate with communication module
        break;
      case 'call':
        console.log('Calling:', patient.phone);
        // Would trigger phone dialer
        window.location.href = `tel:${patient.phone}`;
        break;
      case 'edit':
        console.log('Edit patient:', patient.name);
        // Would open edit form
        break;
      case 'delete':
        console.log('Delete patient:', patient.name);
        // Would show confirmation dialog
        break;
      default:
        console.log('Unknown action:', action);
    }
  }, []);
  
  return { handleAction };
};

// Hook for new patient form
export const useNewPatientForm = () => {
  const [formData, setFormData] = useState<NewPatientFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    gender: '',
    phone: '',
    email: '',
    preferredContact: 'phone',
    preferredLanguage: 'English',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      alternatePhone: ''
    }
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateStep = useCallback((step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        break;
      case 2:
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (formData.email && !formData.email.includes('@')) {
          newErrors.email = 'Invalid email address';
        }
        break;
      // Add more validation for other steps
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);
  
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, validateStep]);
  
  const prevStep = useCallback(() => {
    setCurrentStep(prev => prev - 1);
  }, []);
  
  const updateField = useCallback((field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else {
        // Handle nested fields like address.street
        const [parent, child] = keys;
        if (parent === 'address') {
          return {
            ...prev,
            address: {
              ...prev.address,
              [child]: value
            }
          };
        } else if (parent === 'emergencyContact') {
          return {
            ...prev,
            emergencyContact: {
              ...prev.emergencyContact,
              [child]: value
            }
          };
        }
        return prev;
      }
    });
  }, []);
  
  return {
    formData,
    currentStep,
    errors,
    updateField,
    nextStep,
    prevStep,
    validateStep
  };
};
