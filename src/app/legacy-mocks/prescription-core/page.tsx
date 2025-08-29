/* ⚠️ LEGACY MOCK – do not edit */

'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, Pill, FileText, Settings, Check, ChevronDown, Info, X, Eye, EyeOff } from 'lucide-react';

const PrescriptionTool = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patient: {
      name: '',
      dob: '',
      address: '',
      phone: '',
      insurance: ''
    },
    medications: [],
    notes: ''
  });
  const [showTooltip, setShowTooltip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    theme: 'light'
  });

  // Mock medication database
  const medicationDB = [
    { id: 1, name: 'Amoxicillin', strength: '500mg', form: 'Capsule', category: 'Antibiotic' },
    { id: 2, name: 'Lisinopril', strength: '10mg', form: 'Tablet', category: 'ACE Inhibitor' },
    { id: 3, name: 'Metformin', strength: '500mg', form: 'Tablet', category: 'Diabetes' },
    { id: 4, name: 'Amlodipine', strength: '5mg', form: 'Tablet', category: 'Calcium Channel Blocker' },
    { id: 5, name: 'Omeprazole', strength: '20mg', form: 'Capsule', category: 'PPI' }
  ];

  const steps = [
    { id: 1, title: 'Patient Information', icon: User },
    { id: 2, title: 'Medication Selection', icon: Pill },
    { id: 3, title: 'Review & Notes', icon: FileText }
  ];

  const filteredMedications = medicationDB.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addMedication = (medication) => {
    const newMed = {
      ...medication,
      dosage: '1 tablet',
      frequency: 'twice daily',
      duration: '7 days',
      instructions: 'Take with food'
    };
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, newMed]
    }));
    setSelectedMedication(null);
    setSearchQuery('');
  };

  const removeMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const updatePatientField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      patient: { ...prev.patient, [field]: value }
    }));
  };

  const updateMedicationField = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const Tooltip = ({ content, children, id }) => (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(id)}
        onMouseLeave={() => setShowTooltip(null)}
        className="cursor-help"
      >
        {children}
      </div>
      {showTooltip === id && (
        <div className="absolute z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    } ${settings.fontSize === 'small' ? 'text-sm' : settings.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
      
      {/* Sticky Header */}
      <header className={`sticky top-0 z-40 ${
        settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b shadow-sm`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Pill className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold">RxPro</h1>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      currentStep === step.id 
                        ? 'bg-blue-600 text-white' 
                        : currentStep > step.id 
                          ? 'bg-green-100 text-green-800' 
                          : settings.theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <step.icon className="h-4 w-4" />
                    <span className="font-medium">{step.title}</span>
                    {currentStep > step.id && <Check className="h-4 w-4" />}
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronDown className="h-4 w-4 text-gray-400 mx-2 rotate-270" />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors ${
                settings.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`fixed top-20 right-6 z-50 ${
          settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-xl shadow-xl p-6 w-80`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <select
                value={settings.fontSize}
                onChange={(e) => setSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                className={`w-full p-2 border rounded-lg ${
                  settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                className={`w-full p-2 border rounded-lg ${
                  settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Step 1: Patient Information */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-bold mb-2">Patient Information</h2>
              <p className="text-gray-600">Enter the patient's details to begin the prescription process.</p>
            </div>

            <div className={`${
              settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-8 shadow-sm`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                    <Tooltip content="Patient's legal name as it appears on insurance" id="name-tooltip">
                      <Info className="inline h-4 w-4 ml-1 text-gray-400" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={formData.patient.name}
                    onChange={(e) => updatePatientField('name', e.target.value)}
                    className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Enter patient's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.patient.dob}
                    onChange={(e) => updatePatientField('dob', e.target.value)}
                    className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.patient.address}
                    onChange={(e) => updatePatientField('address', e.target.value)}
                    className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Patient's address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.patient.phone}
                    onChange={(e) => updatePatientField('phone', e.target.value)}
                    className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Insurance Provider</label>
                  <select
                    value={formData.patient.insurance}
                    onChange={(e) => updatePatientField('insurance', e.target.value)}
                    className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="">Select insurance provider</option>
                    <option value="blue-cross">Blue Cross Blue Shield</option>
                    <option value="aetna">Aetna</option>
                    <option value="cigna">Cigna</option>
                    <option value="united">United Healthcare</option>
                    <option value="medicare">Medicare</option>
                    <option value="medicaid">Medicaid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Medication Selection */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-bold mb-2">Medication Selection</h2>
              <p className="text-gray-600">Search and add medications to the prescription.</p>
            </div>

            {/* Medication Search */}
            <div className={`${
              settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6 shadow-sm`}>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Search medications by name or category..."
                />
              </div>

              {searchQuery && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMedications.map((med) => (
                    <div
                      key={med.id}
                      onClick={() => addMedication(med)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        settings.theme === 'dark' 
                          ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <h4 className="font-semibold">{med.name}</h4>
                      <p className="text-sm text-gray-500">{med.strength} • {med.form}</p>
                      <p className="text-xs text-blue-600 mt-1">{med.category}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Medications */}
            {formData.medications.length > 0 && (
              <div className={`${
                settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-xl p-6 shadow-sm`}>
                <h3 className="text-xl font-semibold mb-4">Prescribed Medications</h3>
                <div className="space-y-4">
                  {formData.medications.map((med, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${
                      settings.theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{med.name} {med.strength}</h4>
                          <p className="text-sm text-gray-500">{med.form} • {med.category}</p>
                        </div>
                        <button
                          onClick={() => removeMedication(index)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Dosage</label>
                          <input
                            type="text"
                            value={med.dosage}
                            onChange={(e) => updateMedicationField(index, 'dosage', e.target.value)}
                            className={`w-full p-2 border rounded ${
                              settings.theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Frequency</label>
                          <select
                            value={med.frequency}
                            onChange={(e) => updateMedicationField(index, 'frequency', e.target.value)}
                            className={`w-full p-2 border rounded ${
                              settings.theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                            }`}
                          >
                            <option value="once daily">Once daily</option>
                            <option value="twice daily">Twice daily</option>
                            <option value="three times daily">Three times daily</option>
                            <option value="four times daily">Four times daily</option>
                            <option value="as needed">As needed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Duration</label>
                          <input
                            type="text"
                            value={med.duration}
                            onChange={(e) => updateMedicationField(index, 'duration', e.target.value)}
                            className={`w-full p-2 border rounded ${
                              settings.theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="block text-sm font-medium mb-1">Instructions</label>
                        <input
                          type="text"
                          value={med.instructions}
                          onChange={(e) => updateMedicationField(index, 'instructions', e.target.value)}
                          className={`w-full p-2 border rounded ${
                            settings.theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                          }`}
                          placeholder="Special instructions for the patient"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Review & Notes */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-bold mb-2">Review & Notes</h2>
              <p className="text-gray-600">Review the prescription details and add any additional notes.</p>
            </div>

            {/* Patient Summary */}
            <div className={`${
              settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6 shadow-sm`}>
              <h3 className="text-xl font-semibold mb-4">Patient Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {formData.patient.name || 'Not provided'}</div>
                <div><strong>DOB:</strong> {formData.patient.dob || 'Not provided'}</div>
                <div><strong>Phone:</strong> {formData.patient.phone || 'Not provided'}</div>
                <div><strong>Insurance:</strong> {formData.patient.insurance || 'Not provided'}</div>
              </div>
              {formData.patient.address && (
                <div className="mt-2 text-sm"><strong>Address:</strong> {formData.patient.address}</div>
              )}
            </div>

            {/* Prescription Summary */}
            <div className={`${
              settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6 shadow-sm`}>
              <h3 className="text-xl font-semibold mb-4">Prescription Summary</h3>
              {formData.medications.length > 0 ? (
                <div className="space-y-4">
                  {formData.medications.map((med, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${
                      settings.theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                    }`}>
                      <div className="font-semibold">{med.name} {med.strength}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {med.dosage} • {med.frequency} • {med.duration}
                      </div>
                      {med.instructions && (
                        <div className="text-sm mt-1"><strong>Instructions:</strong> {med.instructions}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No medications added yet.</p>
              )}
            </div>

            {/* Additional Notes */}
            <div className={`${
              settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-xl p-6 shadow-sm`}>
              <label className="block text-lg font-semibold mb-4">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className={`w-full p-4 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  settings.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                placeholder="Add any additional notes, allergies, or special instructions..."
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : settings.theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={() => alert('Prescription completed! In a real app, this would save and process the prescription.')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Complete Prescription
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default PrescriptionTool;