export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  effectiveDate: string;
  expirationDate: string;
}

export interface MedicalHistory {
  allergies: string[];
  medications: string[];
  conditions: string[];
  surgeries: string[];
  familyHistory: string[];
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  address: Address;
  lastVisit: string;
  nextAppt?: string | null;
  status: 'active' | 'needs-followup' | 'inactive';
  insuranceStatus: 'verified' | 'pending' | 'expired';
  balance: number;
  medicalAlerts: string[];
  family: number;
  familyMembers: number[];
  avatar?: string | null;
  preferredLanguage: string;
  preferredContactMethod: 'phone' | 'email' | 'sms';
  emergencyContact: EmergencyContact;
  insuranceInfo: InsuranceInfo;
  medicalHistory: MedicalHistory;
}

export interface PatientState {
  currentView: 'list' | 'detail';
  selectedPatientId: number | null;
  searchQuery: string;
  activeTab: string;
  detailTab: string;
  showNewPatientForm: boolean;
  newPatientStep: number;
  filters: {
    status: string;
    ageRange: [number, number] | null;
    hasBalance: boolean;
    insuranceStatus: string;
  };
  sort: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
  ui: {
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
  };
}

export interface NewPatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'email' | 'sms' | 'whatsapp';
  preferredLanguage: string;
  address: Address;
  emergencyContact: EmergencyContact;
  // Optional medical fields
  allergies?: string;
  conditions?: string;
  medications?: string;
  currentStep?: number;
}
