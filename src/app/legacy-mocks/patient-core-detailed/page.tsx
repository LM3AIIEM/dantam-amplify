"use client"

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, Mail, Calendar, AlertCircle, Users, FileText, Clock, CheckCircle2, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const PatientManagementDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();
  const [dobOpen, setDobOpen] = useState(false);
  
  // Get current year safely for client/server consistency
  const currentYear = 2024;

  // Sample patient data
  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 34,
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@email.com',
      lastVisit: '2024-01-15',
      nextAppt: '2024-02-20',
      status: 'active',
      insuranceStatus: 'verified',
      balance: 0,
      medicalAlerts: ['Penicillin allergy'],
      family: 2,
      avatar: null
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 45,
      phone: '+1 (555) 987-6543',
      email: 'm.chen@email.com',
      lastVisit: '2024-01-22',
      nextAppt: null,
      status: 'needs-followup',
      insuranceStatus: 'pending',
      balance: 285.50,
      medicalAlerts: [],
      family: 3,
      avatar: null
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      age: 28,
      phone: '+1 (555) 456-7890',
      email: 'emily.r@email.com',
      lastVisit: '2024-02-05',
      nextAppt: '2024-03-10',
      status: 'active',
      insuranceStatus: 'verified',
      balance: 0,
      medicalAlerts: ['Diabetes', 'Blood pressure medication'],
      family: 1,
      avatar: null
    },
    {
      id: 4,
      name: 'David Wilson',
      age: 52,
      phone: '+1 (555) 234-5678',
      email: 'd.wilson@email.com',
      lastVisit: '2023-11-30',
      nextAppt: null,
      status: 'inactive',
      insuranceStatus: 'expired',
      balance: 150.00,
      medicalAlerts: [],
      family: 4,
      avatar: null
    },
    {
      id: 5,
      name: 'Jessica Park',
      age: 31,
      phone: '+1 (555) 345-6789',
      email: 'j.park@email.com',
      lastVisit: '2024-02-08',
      nextAppt: '2024-02-25',
      status: 'active',
      insuranceStatus: 'verified',
      balance: 0,
      medicalAlerts: [],
      family: 1,
      avatar: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'needs-followup': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsuranceStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone.includes(searchQuery) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'active') return matchesSearch && patient.status === 'active';
    if (selectedTab === 'needs-followup') return matchesSearch && patient.status === 'needs-followup';
    if (selectedTab === 'inactive') return matchesSearch && patient.status === 'inactive';
    return matchesSearch;
  });

  const PatientCard = ({ patient }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedPatient(patient)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={patient.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{patient.name}</h3>
              <p className="text-sm text-slate-600">Age {patient.age}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-1" />
                  {patient.email}
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Badge variant="secondary" className={getStatusColor(patient.status)}>
                {patient.status.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className={getInsuranceStatusColor(patient.insuranceStatus)}>
                {patient.insuranceStatus}
              </Badge>
              {patient.family > 1 && (
                <Badge variant="outline" className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  Family of {patient.family}
                </Badge>
              )}
            </div>
            {patient.balance > 0 && (
              <div className="text-sm font-medium text-red-600">
                Balance: ${patient.balance}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Last Visit:</span>
              <div className="font-medium">
                {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div>
              <span className="text-slate-600">Next Appointment:</span>
              <div className="font-medium">
                {patient.nextAppt ? new Date(patient.nextAppt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'Not scheduled'}
              </div>
            </div>
          </div>
          
          {patient.medicalAlerts.length > 0 && (
            <div className="flex items-start space-x-2 p-2 bg-red-50 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-red-800">Medical Alerts:</span>
                <p className="text-sm text-red-700">{patient.medicalAlerts.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const NewPatientForm = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          New Patient Registration
          <Button variant="ghost" onClick={() => setShowNewPatient(false)}>×</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <Input placeholder="Enter first name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name *</label>
              <Input placeholder="Enter last name" />
            </div>
            <div>
              <Label htmlFor="dob" className="block text-sm font-medium mb-2">
                Date of Birth *
              </Label>
              <Popover open={dobOpen} onOpenChange={setDobOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="dob"
                    className="w-full justify-between font-normal"
                  >
                    {dateOfBirth ? dateOfBirth.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : "Select date of birth"}
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dateOfBirth}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDateOfBirth(date)
                      setDobOpen(false)
                    }}
                    fromYear={1900}
                    toYear={currentYear}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <Input placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input type="email" placeholder="patient@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Phone</option>
                <option>Email</option>
                <option>SMS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Language</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>English</option>
                <option>Spanish</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Street Address</label>
                <Input placeholder="123 Main Street" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Input placeholder="City" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">State/Province</label>
                <Input placeholder="State" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
                <Input placeholder="12345" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Emergency Contact Name</label>
                <Input placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Relationship</label>
                <Input placeholder="e.g., Spouse, Parent, Sibling" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Emergency Contact Phone</label>
                <Input placeholder="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alternative Phone</label>
                <Input placeholder="+1 (555) 987-6543" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={() => setShowNewPatient(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Continue to Medical History
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PatientDetailView = ({ patient }) => (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setSelectedPatient(null)}>← Back</Button>
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-xl">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <p className="text-slate-600">Age {patient.age} • Patient ID: #00{patient.id}</p>
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="dental">Dental Records</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Account Status</p>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Outstanding Balance</p>
                      <p className={`text-2xl font-bold ${patient.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${patient.balance.toFixed(2)}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      $
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Next Appointment</p>
                      <p className="text-lg font-semibold">
                        {patient.nextAppt ? new Date(patient.nextAppt).toLocaleDateString() : 'Not scheduled'}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-slate-600 mb-1">Address</p>
                    <p className="text-sm">123 Main Street<br />Anytown, ST 12345</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Badge className={getInsuranceStatusColor(patient.insuranceStatus)}>
                        {patient.insuranceStatus}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Primary Insurance</p>
                      <p className="font-medium">Delta Dental PPO</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Policy Number</p>
                      <p className="font-medium">ABC123456789</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {patient.medicalAlerts.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Medical Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {patient.medicalAlerts.map((alert, index) => (
                      <li key={index} className="text-red-700">• {alert}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">Medical history details would be displayed here...</p>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Update Medical History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dental">
            <Card>
              <CardHeader>
                <CardTitle>Dental Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">Dental charts and treatment history would be displayed here...</p>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Dental Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">Billing history and payment information would be displayed here...</p>
                  <Button variant="outline">View Full Billing History</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="family">
            <Card>
              <CardHeader>
                <CardTitle>Family Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">Family member information would be displayed here...</p>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Add Family Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  if (showNewPatient) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <NewPatientForm />
        </div>
      </div>
    );
  }

  if (selectedPatient) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <PatientDetailView patient={selectedPatient} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
              <p className="text-slate-600">Manage patient records and information</p>
            </div>
            <Button onClick={() => setShowNewPatient(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Patient
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Patients</p>
                  <p className="text-3xl font-bold">{patients.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Patients</p>
                  <p className="text-3xl font-bold text-green-600">
                    {patients.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Need Follow-up</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {patients.filter(p => p.status === 'needs-followup').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Outstanding Balance</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${patients.reduce((sum, p) => sum + p.balance, 0).toFixed(2)}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                  $
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search patients by name, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Patients ({patients.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({patients.filter(p => p.status === 'active').length})</TabsTrigger>
                <TabsTrigger value="needs-followup">Follow-up ({patients.filter(p => p.status === 'needs-followup').length})</TabsTrigger>
                <TabsTrigger value="inactive">Inactive ({patients.filter(p => p.status === 'inactive').length})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
          
          {filteredPatients.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600">No patients found</h3>
                <p className="text-slate-500">Try adjusting your search criteria or add a new patient.</p>
                <Button onClick={() => setShowNewPatient(true)} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Patient
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientManagementDashboard;