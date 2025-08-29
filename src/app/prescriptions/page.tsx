/* 💊 Prescription Module - Integrated from legacy-mocks */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  User, 
  Pill, 
  FileText, 
  Plus, 
  X, 
  ChevronRight,
  ChevronLeft,
  Check,
  Clock,
  AlertCircle,
  Printer,
  Send
} from 'lucide-react';

const PrescriptionModule = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patient: {
      name: '',
      dob: '',
      address: '',
      phone: '',
      insurance: ''
    },
    medications: [] as any[],
    notes: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock medication database
  const medicationDB = [
    { id: 1, name: 'Amoxicillin', strength: '500mg', form: 'Capsule', category: 'Antibiotic' },
    { id: 2, name: 'Ibuprofen', strength: '400mg', form: 'Tablet', category: 'NSAID' },
    { id: 3, name: 'Metronidazole', strength: '250mg', form: 'Tablet', category: 'Antibiotic' },
    { id: 4, name: 'Acetaminophen', strength: '500mg', form: 'Tablet', category: 'Analgesic' },
    { id: 5, name: 'Clindamycin', strength: '300mg', form: 'Capsule', category: 'Antibiotic' },
    { id: 6, name: 'Prednisone', strength: '10mg', form: 'Tablet', category: 'Corticosteroid' },
    { id: 7, name: 'Chlorhexidine', strength: '0.12%', form: 'Rinse', category: 'Antiseptic' }
  ];

  const steps = [
    { id: 1, title: 'Patient Information', icon: User },
    { id: 2, title: 'Medication Selection', icon: Pill },
    { id: 3, title: 'Review & Submit', icon: FileText }
  ];

  const filteredMedications = medicationDB.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addMedication = (medication: any) => {
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
    setSearchQuery('');
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const updatePatientField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      patient: { ...prev.patient, [field]: value }
    }));
  };

  const updateMedicationField = (index: number, field: string, value: string) => {
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

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Prescription Tool</h1>
          <p className="text-gray-600">Create and manage electronic prescriptions</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}>{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            
            {/* Step 1: Patient Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Patient Name</Label>
                    <Input
                      id="name"
                      value={formData.patient.name}
                      onChange={(e) => updatePatientField('name', e.target.value)}
                      placeholder="Enter patient name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.patient.dob}
                      onChange={(e) => updatePatientField('dob', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.patient.phone}
                      onChange={(e) => updatePatientField('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="insurance">Insurance Provider</Label>
                    <Select 
                      value={formData.patient.insurance}
                      onValueChange={(value) => updatePatientField('insurance', value)}
                    >
                      <SelectTrigger id="insurance">
                        <SelectValue placeholder="Select insurance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                        <SelectItem value="aetna">Aetna</SelectItem>
                        <SelectItem value="cigna">Cigna</SelectItem>
                        <SelectItem value="united">United Healthcare</SelectItem>
                        <SelectItem value="medicare">Medicare</SelectItem>
                        <SelectItem value="self-pay">Self Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.patient.address}
                    onChange={(e) => updatePatientField('address', e.target.value)}
                    placeholder="Enter patient address"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Medication Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <CardTitle>Select Medications</CardTitle>
                </CardHeader>
                
                {/* Medication Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medications..."
                    className="pl-10"
                  />
                </div>
                
                {/* Medication Grid */}
                {searchQuery && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredMedications.map((med) => (
                      <Card
                        key={med.id}
                        onClick={() => addMedication(med)}
                        className="cursor-pointer hover:shadow-md transition-all hover:border-blue-300"
                      >
                        <CardContent className="p-3">
                          <h4 className="font-semibold">{med.name}</h4>
                          <p className="text-sm text-gray-500">{med.strength} • {med.form}</p>
                          <Badge variant="secondary" className="mt-1">{med.category}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Selected Medications */}
                {formData.medications.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Selected Medications</h3>
                    {formData.medications.map((med, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{med.name} {med.strength}</h4>
                              <p className="text-sm text-gray-500">{med.form} • {med.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMedication(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <Label>Dosage</Label>
                              <Input
                                value={med.dosage}
                                onChange={(e) => updateMedicationField(index, 'dosage', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Frequency</Label>
                              <Input
                                value={med.frequency}
                                onChange={(e) => updateMedicationField(index, 'frequency', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Duration</Label>
                              <Input
                                value={med.duration}
                                onChange={(e) => updateMedicationField(index, 'duration', e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <Label>Special Instructions</Label>
                            <Input
                              value={med.instructions}
                              onChange={(e) => updateMedicationField(index, 'instructions', e.target.value)}
                              placeholder="e.g., Take with food"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <CardHeader className="p-0">
                  <CardTitle>Review Prescription</CardTitle>
                </CardHeader>
                
                {/* Patient Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="font-medium">Name:</span> {formData.patient.name || 'Not provided'}</div>
                      <div><span className="font-medium">DOB:</span> {formData.patient.dob || 'Not provided'}</div>
                      <div><span className="font-medium">Phone:</span> {formData.patient.phone || 'Not provided'}</div>
                      <div><span className="font-medium">Insurance:</span> {formData.patient.insurance || 'Not provided'}</div>
                    </div>
                    {formData.patient.address && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Address:</span> {formData.patient.address}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Prescription Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Prescribed Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {formData.medications.length > 0 ? (
                      <div className="space-y-3">
                        {formData.medications.map((med, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-semibold">{med.name} {med.strength}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {med.dosage} • {med.frequency} • {med.duration}
                            </div>
                            {med.instructions && (
                              <div className="text-sm mt-1">
                                <span className="font-medium">Instructions:</span> {med.instructions}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No medications selected</p>
                    )}
                  </CardContent>
                </Card>
                
                {/* Additional Notes */}
                <div>
                  <Label>Additional Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Add any additional notes or instructions..."
                    rows={4}
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center gap-3 pt-4">
                  <Button variant="outline" size="lg">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send to Pharmacy
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Complete
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Digital Prescription System</p>
                <p className="text-sm text-blue-700">All prescriptions are electronically signed and verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrescriptionModule;
