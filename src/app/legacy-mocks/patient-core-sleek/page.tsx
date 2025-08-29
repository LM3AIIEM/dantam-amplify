'use client';

import { useState } from 'react';
import { Search, Plus, Calendar, Phone, Mail, FileText, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock patient data
const recentPatients = [
  {
    id: 'P001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    lastVisit: '2024-07-28',
    nextAppointment: '2024-08-15',
    status: 'active',
    age: 34,
    insurance: 'Delta Dental',
    balance: 245.00,
    avatar: '/api/placeholder/40/40',
    riskLevel: 'low',
    treatmentPlan: 'Routine Cleaning'
  },
  {
    id: 'P002',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    lastVisit: '2024-07-25',
    nextAppointment: '2024-08-12',
    status: 'active',
    age: 42,
    insurance: 'Cigna',
    balance: 0,
    avatar: '/api/placeholder/40/40',
    riskLevel: 'medium',
    treatmentPlan: 'Crown Replacement'
  },
  {
    id: 'P003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 345-6789',
    lastVisit: '2024-07-22',
    nextAppointment: null,
    status: 'overdue',
    age: 28,
    insurance: 'MetLife',
    balance: 150.00,
    avatar: '/api/placeholder/40/40',
    riskLevel: 'high',
    treatmentPlan: 'Root Canal + Crown'
  },
  {
    id: 'P004',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    lastVisit: '2024-07-30',
    nextAppointment: '2024-08-20',
    status: 'active',
    age: 55,
    insurance: 'Aetna',
    balance: 75.00,
    avatar: '/api/placeholder/40/40',
    riskLevel: 'low',
    treatmentPlan: 'Periodontal Maintenance'
  },
  {
    id: 'P005',
    name: 'Lisa Park',
    email: 'lisa.park@email.com',
    phone: '(555) 567-8901',
    lastVisit: '2024-07-18',
    nextAppointment: '2024-08-14',
    status: 'active',
    age: 38,
    insurance: 'Guardian',
    balance: 320.00,
    avatar: '/api/placeholder/40/40',
    riskLevel: 'medium',
    treatmentPlan: 'Invisalign Treatment'
  }
];

const quickStats = [
  { label: 'Total Patients', value: '1,247', change: '+12 this month', trend: 'up' },
  { label: 'Active Treatments', value: '89', change: '15 completing soon', trend: 'neutral' },
  { label: 'Overdue Recalls', value: '23', change: '5 contacted today', trend: 'down' },
  { label: 'Outstanding Balance', value: '$12,450', change: '-8.2% this month', trend: 'down' }
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = recentPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-50 border-green-200 text-green-700';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'high': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Patient Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage patient records, appointments, and treatment plans</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100' : 
                  stat.trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-600' : 
                    stat.trend === 'down' ? 'bg-red-600' : 'bg-blue-600'
                  }`} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg">Patient Directory</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 truncate">{patient.name}</h3>
                        <Badge className={`text-xs ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>Last visit: {formatDate(patient.lastVisit)}</span>
                        </div>
                        {patient.nextAppointment && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>Next: {formatDate(patient.nextAppointment)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs">
                          <div className={`px-2 py-1 rounded-full border ${getRiskColor(patient.riskLevel)}`}>
                            {patient.riskLevel.toUpperCase()} RISK
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              ${patient.balance.toFixed(2)}
                            </div>
                            <div className="text-gray-500">Balance</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-600 truncate">
                            {patient.treatmentPlan}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          View Chart
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* High Priority Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertCircle className="w-5 h-5" />
            Priority Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Emily Rodriguez - Overdue Treatment</p>
                  <p className="text-sm text-gray-600">Root canal treatment scheduled 3 weeks ago, needs follow-up</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Contact</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">High-Risk Patients - Recall Due</p>
                  <p className="text-sm text-gray-600">3 high-risk patients haven't scheduled their 6-month recall</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Review</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}