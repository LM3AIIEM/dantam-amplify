/* 👥 Patient Management Module - Enhanced Implementation */

"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { 
  PatientCard, 
  StatsCard, 
  EmptyState,
  PatientAvatar,
  MedicalAlert
} from '@/modules/patient/components';
import { usePatientManagement, usePatientActions, useNewPatientForm } from '@/modules/patient/hooks';
import { formatINR } from '@/shared/utils';
import { 
  Search, 
  Plus, 
  Filter, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign,
  ChevronDown,
  Calendar,
  Phone,
  Mail,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

export default function PatientsPage() {
  const { state, patients, filteredCount, selectedPatient, stats, actions } = usePatientManagement();
  const { handleAction } = usePatientActions();
  const newPatientForm = useNewPatientForm();
  const [showFilters, setShowFilters] = useState(false);

  // If showing new patient form
  if (state.showNewPatientForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <NewPatientForm form={newPatientForm} onClose={() => actions.setShowNewPatientForm(false)} />
        </div>
      </div>
    );
  }

  // If showing patient detail
  if (state.currentView === 'detail' && selectedPatient) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <PatientDetailView patient={selectedPatient} onBack={() => actions.selectPatient(null)} />
        </div>
      </div>
    );
  }

  // Main list view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-2">Manage patient records, appointments, and medical information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Patients" 
            value={stats.total} 
            icon={Users} 
            color="blue"
          />
          <StatsCard 
            title="Active Patients" 
            value={stats.active} 
            icon={CheckCircle2} 
            trend={`${stats.activePercentage}% of total`}
            color="green"
          />
          <StatsCard 
            title="Need Follow-up" 
            value={stats.needsFollowup} 
            icon={AlertCircle} 
            color="yellow"
          />
          <StatsCard 
            title="Outstanding Balance" 
            value={formatINR(stats.totalBalance)} 
            icon={DollarSign} 
            trend={`${stats.withBalance} patients`}
            color="red"
          />
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name, phone, email, or ID..."
                value={state.searchQuery}
                onChange={(e) => actions.setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="h-10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(state.filters.status !== 'all' || state.filters.hasBalance || state.filters.insuranceStatus !== 'all') && 
                  <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                    Active
                  </span>
                }
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 h-10"
                onClick={() => actions.setShowNewPatientForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Patient
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">Account Status</Label>
                <select 
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  value={state.filters.status}
                  onChange={(e) => actions.setFilter('status', e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="needs-followup">Needs Follow-up</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <Label className="text-sm">Insurance Status</Label>
                <select 
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  value={state.filters.insuranceStatus}
                  onChange={(e) => actions.setFilter('insuranceStatus', e.target.value)}
                >
                  <option value="all">All Insurance</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.filters.hasBalance}
                    onChange={(e) => actions.setFilter('hasBalance', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Has Outstanding Balance</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Status Tabs */}
        <Tabs value={state.activeTab} onValueChange={actions.setActiveTab} className="mb-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="all">All Patients ({stats.total})</TabsTrigger>
            <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
            <TabsTrigger value="needs-followup">Needs Follow-up ({stats.needsFollowup})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Patient List */}
        {patients.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {patients.map((patient) => (
              <PatientCard 
                key={patient.id} 
                patient={patient} 
                onSelect={actions.selectPatient}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No patients found"
            description={state.searchQuery ? "Try adjusting your search or filters" : "Start by adding your first patient"}
            action={!state.searchQuery ? {
              label: "Add New Patient",
              onClick: () => actions.setShowNewPatientForm(true)
            } : undefined}
          />
        )}

        {/* Pagination */}
        {filteredCount > state.pagination.pageSize && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={state.pagination.page === 1}
                onClick={() => actions.setPage(state.pagination.page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600 px-4">
                Page {state.pagination.page} of {Math.ceil(filteredCount / state.pagination.pageSize)}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={state.pagination.page >= Math.ceil(filteredCount / state.pagination.pageSize)}
                onClick={() => actions.setPage(state.pagination.page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// New Patient Form Component
function NewPatientForm({ form, onClose }: { form: any, onClose: () => void }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>New Patient Registration</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[
              { num: 1, label: 'Personal Info', required: true },
              { num: 2, label: 'Contact', required: true },
              { num: 3, label: 'Medical Alerts', required: false },
              { num: 4, label: 'Insurance', required: false }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="text-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto ${
                    step.num <= form.currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.num}
                  </div>
                  <p className={`text-xs mt-1 ${
                    step.num <= form.currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                    {!step.required && <span className="block text-gray-400">(Optional)</span>}
                  </p>
                </div>
                {idx < 3 && (
                  <div className={`w-12 h-1 mt-5 ${
                    step.num < form.currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Information */}
          {form.currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input 
                    value={form.formData.firstName}
                    onChange={(e) => form.updateField('firstName', e.target.value)}
                    className={form.errors.firstName ? 'border-red-500' : ''}
                  />
                  {form.errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input 
                    value={form.formData.lastName}
                    onChange={(e) => form.updateField('lastName', e.target.value)}
                    className={form.errors.lastName ? 'border-red-500' : ''}
                  />
                  {form.errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date of Birth *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {form.formData.dateOfBirth 
                          ? form.formData.dateOfBirth.toLocaleDateString() 
                          : "Select date"}
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={form.formData.dateOfBirth}
                        onSelect={(date) => form.updateField('dateOfBirth', date)}
                      />
                    </PopoverContent>
                  </Popover>
                  {form.errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.dateOfBirth}</p>
                  )}
                </div>
                <div>
                  <Label>Gender</Label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={form.formData.gender}
                    onChange={(e) => form.updateField('gender', e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {form.currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone Number *</Label>
                  <Input 
                    value={form.formData.phone}
                    onChange={(e) => form.updateField('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input 
                    type="email"
                    value={form.formData.email}
                    onChange={(e) => form.updateField('email', e.target.value)}
                    placeholder="patient@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Contact Method</Label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={form.formData.preferredContact}
                    onChange={(e) => form.updateField('preferredContact', e.target.value)}
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <Label>Preferred Language</Label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={form.formData.preferredLanguage}
                    onChange={(e) => form.updateField('preferredLanguage', e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Medical Alerts (Optional) */}
          {form.currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Known Allergies & Medical Alerts</h3>
                <Badge variant="outline" className="text-gray-500">Optional</Badge>
              </div>
              <p className="text-sm text-gray-600">Add any known allergies or medical conditions that staff should be aware of.</p>
              
              <div>
                <Label>Known Allergies</Label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  placeholder="e.g., Penicillin, Peanuts, Latex..."
                  value={form.formData.allergies || ''}
                  onChange={(e) => form.updateField('allergies', e.target.value)}
                />
              </div>
              
              <div>
                <Label>Medical Conditions</Label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  placeholder="e.g., Diabetes, Hypertension, Asthma..."
                  value={form.formData.conditions || ''}
                  onChange={(e) => form.updateField('conditions', e.target.value)}
                />
              </div>
              
              <div>
                <Label>Current Medications</Label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  placeholder="List any medications the patient is currently taking..."
                  value={form.formData.medications || ''}
                  onChange={(e) => form.updateField('medications', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Insurance (Optional) */}
          {form.currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Insurance Information</h3>
                <Badge variant="outline" className="text-gray-500">Optional</Badge>
              </div>
              <p className="text-sm text-gray-600">Insurance details can be added later from the patient profile.</p>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Insurance information collection coming soon</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={form.currentStep > 1 ? form.prevStep : onClose}
            >
              {form.currentStep > 1 ? 'Previous' : 'Cancel'}
            </Button>
            <div className="flex gap-2">
              {form.currentStep >= 3 && form.currentStep < 4 && (
                <Button 
                  variant="outline"
                  onClick={() => form.updateField('currentStep', form.currentStep + 1)}
                >
                  Skip This Step
                </Button>
              )}
              {form.currentStep === 2 && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    console.log('Creating patient with basic info:', form.formData);
                    onClose();
                  }}
                >
                  Create Patient
                </Button>
              )}
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={form.currentStep < 4 ? form.nextStep : () => {
                  console.log('Submit complete form:', form.formData);
                  onClose();
                }}
              >
                {form.currentStep < 4 ? 'Next' : 'Complete Registration'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Patient Detail View Component
function PatientDetailView({ patient, onBack }: { patient: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Patients
            </Button>
            <PatientAvatar patient={patient} size="large" />
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <p className="text-gray-600">Age {patient.age} • Patient ID: #00{patient.id}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              New Visit
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <div className={activeTab === 'overview' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatsCard 
                title="Total Visits" 
                value="24" 
                icon={Calendar} 
                color="blue"
              />
              <StatsCard 
                title="Outstanding Balance" 
                value={formatINR(patient.balance)} 
                icon={DollarSign} 
                color={patient.balance > 0 ? "red" : "green"}
              />
              <StatsCard 
                title="Last Visit" 
                value={new Date(patient.lastVisit).toLocaleDateString()} 
                icon={Clock} 
                color="green"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="text-sm">
                      {patient.address.street}<br />
                      {patient.address.city}, {patient.address.state} {patient.address.zip}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider</span>
                      <span className="font-medium">{patient.insuranceInfo.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Policy #</span>
                      <span className="font-medium">{patient.insuranceInfo.policyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.insuranceStatus === 'verified' ? 'bg-green-100 text-green-800' : 
                        patient.insuranceStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {patient.insuranceStatus}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {patient.medicalAlerts.length > 0 && (
              <div className="mt-6">
                <MedicalAlert alerts={patient.medicalAlerts} />
              </div>
            )}
          </div>

          {/* Medical History Tab */}
          <div className={activeTab === 'medical' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Alerts & Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  <MedicalAlert alerts={patient.medicalHistory.allergies} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {patient.medicalHistory.medications.map((med: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-blue-600 rounded-full" />
                        <span>{med}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medical Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {patient.medicalHistory.conditions.map((condition: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-yellow-600 rounded-full" />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Placeholder for other tabs */}
          <div className={activeTab === 'appointments' ? 'block' : 'hidden'}>
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                Appointment history and scheduling will be displayed here
              </CardContent>
            </Card>
          </div>

          <div className={activeTab === 'billing' ? 'block' : 'hidden'}>
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                Billing information and payment history will be displayed here
              </CardContent>
            </Card>
          </div>

          <div className={activeTab === 'documents' ? 'block' : 'hidden'}>
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                Patient documents and forms will be displayed here
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
