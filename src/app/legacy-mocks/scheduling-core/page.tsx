/* ⚠️ LEGACY MOCK – do not edit */

"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  AlertCircle, 
  Plus, 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings
} from 'lucide-react'

// Realistic dental practice data
const providers = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "General Dentistry", color: "#2563eb" },
  { id: 2, name: "Dr. Michael Rodriguez", specialty: "Oral Surgery", color: "#16a34a" },
  { id: 3, name: "Dr. Emma Thompson", specialty: "Orthodontics", color: "#ea580c" },
  { id: 4, name: "Lisa Park", specialty: "Dental Hygienist", color: "#8b5cf6" }
]

const chairs = [
  { id: 1, name: "Chair 1", status: "available", equipment: ["Digital X-Ray", "Ultrasonic Scaler"], location: "Main Floor" },
  { id: 2, name: "Chair 2", status: "occupied", equipment: ["Intraoral Camera", "Laser"], location: "Main Floor" },
  { id: 3, name: "Chair 3", status: "available", equipment: ["Digital X-Ray", "Nitrous Oxide"], location: "Main Floor" },
  { id: 4, name: "Surgery Suite", status: "maintenance", equipment: ["Surgical Microscope", "Implant Kit"], location: "Second Floor" },
  { id: 5, name: "Chair 5", status: "available", equipment: ["Standard Equipment"], location: "Main Floor" },
  { id: 6, name: "Chair 6", status: "available", equipment: ["Orthodontic Setup"], location: "Main Floor" }
]

const appointmentTypes = [
  { id: "cleaning", name: "Routine Cleaning", duration: 60, color: "#16a34a", equipment: ["Ultrasonic Scaler"] },
  { id: "consultation", name: "Consultation", duration: 30, color: "#2563eb", equipment: [] },
  { id: "filling", name: "Dental Filling", duration: 90, color: "#ea580c", equipment: ["Digital X-Ray"] },
  { id: "root-canal", name: "Root Canal", duration: 120, color: "#dc2626", equipment: ["Digital X-Ray", "Surgical Microscope"] },
  { id: "orthodontic", name: "Orthodontic Adjustment", duration: 45, color: "#8b5cf6", equipment: ["Orthodontic Setup"] },
  { id: "surgery", name: "Oral Surgery", duration: 180, color: "#dc2626", equipment: ["Surgical Microscope", "Implant Kit"] },
  { id: "emergency", name: "Emergency", duration: 60, color: "#ef4444", equipment: [] }
]

// Generate realistic appointment data
const generateAppointments = () => {
  const today = new Date()
  const appointments = []
  
  // Current appointments for demo
  const demoAppointments = [
    {
      id: 1,
      patientName: "Jennifer Walsh",
      providerId: 1,
      chairId: 1,
      type: "cleaning",
      startTime: "09:00",
      endTime: "10:00",
      date: today.toISOString().split('T')[0],
      status: "confirmed"
    },
    {
      id: 2,
      patientName: "Robert Kim",
      providerId: 2,
      chairId: 2,
      type: "consultation",
      startTime: "10:30",
      endTime: "11:00",
      date: today.toISOString().split('T')[0],
      status: "in-progress"
    },
    {
      id: 3,
      patientName: "Maria Santos",
      providerId: 1,
      chairId: 3,
      type: "filling",
      startTime: "11:30",
      endTime: "13:00",
      date: today.toISOString().split('T')[0],
      status: "confirmed"
    },
    {
      id: 4,
      patientName: "David Chang",
      providerId: 3,
      chairId: 6,
      type: "orthodontic",
      startTime: "14:00",
      endTime: "14:45",
      date: today.toISOString().split('T')[0],
      status: "confirmed"
    }
  ]
  
  return demoAppointments
}

// Time slots for the calendar (8 AM to 6 PM)
const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor(8 + i / 2)
  const minute = (i % 2) * 30
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
})

const SchedulingModule = () => {
  const [appointments, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState("all")
  const [selectedChair, setSelectedChair] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [conflictWarning, setConflictWarning] = useState(null)
  const [chairUtilization, setChairUtilization] = useState({})

  // Initialize data on mount
  useEffect(() => {
    setAppointments(generateAppointments())
    setSelectedDate(new Date().toISOString().split('T')[0])
    
    // Calculate chair utilization
    const utilization = {}
    chairs.forEach(chair => {
      const chairAppointments = appointments.filter(apt => apt.chairId === chair.id)
      const totalMinutes = chairAppointments.reduce((sum, apt) => {
        const start = new Date(`2024-01-01T${apt.startTime}`)
        const end = new Date(`2024-01-01T${apt.endTime}`)
        return sum + (end - start) / (1000 * 60)
      }, 0)
      utilization[chair.id] = Math.round((totalMinutes / (10 * 60)) * 100) // 10 hour day
    })
    setChairUtilization(utilization)
  }, [])

  // Filter appointments based on selected criteria
  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesDate = apt.date === selectedDate
      const matchesProvider = selectedProvider === "all" || apt.providerId === parseInt(selectedProvider)
      const matchesChair = selectedChair === "all" || apt.chairId === parseInt(selectedChair)
      const matchesSearch = searchQuery === "" || 
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesDate && matchesProvider && matchesChair && matchesSearch
    })
  }, [appointments, selectedDate, selectedProvider, selectedChair, searchQuery])

  // Check for scheduling conflicts
  const checkConflicts = (newAppointment) => {
    const conflicts = appointments.filter(apt => 
      apt.date === newAppointment.date &&
      apt.chairId === newAppointment.chairId &&
      apt.id !== newAppointment.id &&
      (
        (newAppointment.startTime >= apt.startTime && newAppointment.startTime < apt.endTime) ||
        (newAppointment.endTime > apt.startTime && newAppointment.endTime <= apt.endTime) ||
        (newAppointment.startTime <= apt.startTime && newAppointment.endTime >= apt.endTime)
      )
    )
    return conflicts
  }

  const getAppointmentTypeInfo = (typeId) => {
    return appointmentTypes.find(type => type.id === typeId) || appointmentTypes[0]
  }

  const getProviderInfo = (providerId) => {
    return providers.find(provider => provider.id === providerId)
  }

  const getChairInfo = (chairId) => {
    return chairs.find(chair => chair.id === chairId)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800"
      case "occupied": return "bg-blue-100 text-blue-800"
      case "maintenance": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "available": return <CheckCircle className="h-4 w-4" />
      case "occupied": return <Activity className="h-4 w-4" />
      case "maintenance": return <XCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Scheduling & Resource Management</h1>
            <p className="text-gray-600">Intelligent appointment scheduling with collision prevention</p>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Smart scheduling with real-time conflict detection active
                    </AlertDescription>
                  </Alert>
                  <Input placeholder="Patient name" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map(provider => (
                        <SelectItem key={provider.id} value={provider.id.toString()}>
                          {provider.name} - {provider.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.duration} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" defaultValue={selectedDate} />
                    <Input type="time" placeholder="Start time" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Schedule Appointment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Input
                type="date"
                value={selectedDate || ''}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full"
              />
              
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="All Providers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  {providers.map(provider => (
                    <SelectItem key={provider.id} value={provider.id.toString()}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedChair} onValueChange={setSelectedChair}>
                <SelectTrigger>
                  <SelectValue placeholder="All Chairs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chairs</SelectItem>
                  {chairs.map(chair => (
                    <SelectItem key={chair.id} value={chair.id.toString()}>
                      {chair.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Daily Schedule
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    }) : 'Select Date'}
                  </span>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    {/* Time slots header */}
                    <div className="grid grid-cols-7 border-b">
                      <div className="p-2 text-xs font-medium text-gray-500">Time</div>
                      {chairs.slice(0, 6).map(chair => (
                        <div key={chair.id} className="p-2 text-xs font-medium text-gray-700 text-center border-l">
                          {chair.name}
                          <div className={`inline-block ml-1 px-1 py-0.5 rounded text-xs ${getStatusColor(chair.status)}`}>
                            {chair.status}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Time slots grid */}
                    <div className="divide-y">
                      {timeSlots.map((time, index) => (
                        <div key={time} className={`grid grid-cols-7 min-h-[60px] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <div className="p-2 text-sm text-gray-600 border-r">
                            {time}
                          </div>
                          {chairs.slice(0, 6).map(chair => {
                            const appointment = filteredAppointments.find(apt => 
                              apt.chairId === chair.id && 
                              apt.startTime <= time && 
                              apt.endTime > time
                            )
                            
                            return (
                              <div key={chair.id} className="p-1 border-l relative">
                                {appointment && appointment.startTime === time && (
                                  <div 
                                    className="absolute inset-1 rounded p-2 text-xs text-white shadow-sm"
                                    style={{ 
                                      backgroundColor: getAppointmentTypeInfo(appointment.type).color,
                                      height: `${(new Date(`2024-01-01T${appointment.endTime}`) - new Date(`2024-01-01T${appointment.startTime}`)) / (1000 * 60) * 2}px`
                                    }}
                                  >
                                    <div className="font-medium truncate">{appointment.patientName}</div>
                                    <div className="truncate">{getAppointmentTypeInfo(appointment.type).name}</div>
                                    <div className="truncate">{getProviderInfo(appointment.providerId)?.name}</div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chair Management Dashboard */}
          <div className="space-y-6">
            {/* Chair Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Chair Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chairs.map(chair => (
                  <div key={chair.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{chair.name}</div>
                      <div className="text-sm text-gray-500">{chair.location}</div>
                      <div className="text-xs text-gray-400">
                        {chair.equipment.slice(0, 2).join(", ")}
                        {chair.equipment.length > 2 && ` +${chair.equipment.length - 2} more`}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(chair.status)}>
                        {getStatusIcon(chair.status)}
                        <span className="ml-1 capitalize">{chair.status}</span>
                      </Badge>
                      {chairUtilization[chair.id] && (
                        <div className="text-xs text-gray-500 mt-1">
                          {chairUtilization[chair.id]}% utilized
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Today's Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{filteredAppointments.length}</div>
                    <div className="text-sm text-gray-600">Scheduled</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {chairs.filter(c => c.status === 'available').length}
                    </div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chair Utilization</span>
                    <span className="font-medium">
                      {Math.round(Object.values(chairUtilization).reduce((a, b) => a + b, 0) / Object.keys(chairUtilization).length) || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.round(Object.values(chairUtilization).reduce((a, b) => a + b, 0) / Object.keys(chairUtilization).length) || 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conflict Prevention Alert */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-5 w-5" />
                  Smart Scheduling Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700">
                  Intelligent collision prevention is monitoring all appointments. 
                  Conflicts are automatically detected and alternatives suggested.
                </p>
                <div className="mt-3 text-xs text-amber-600">
                  ✓ Real-time availability checking<br />
                  ✓ Resource conflict detection<br />
                  ✓ Equipment validation<br />
                  ✓ Buffer time enforcement
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulingModule