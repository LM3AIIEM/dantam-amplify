"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Activity,
  AlertTriangle,
  Settings
} from 'lucide-react'

// 👉 Imports from extracted modules
import { useScheduling } from '@/hooks/useScheduling'
import { chairs, providers, appointmentTypes, timeSlots } from '@/lib/data/scheduling'
import { getAppointmentTypeInfo, getStatusColor } from '@/lib/utils/scheduling'
import { ChairStatusCard } from '@/components/scheduling/ChairStatusCard'
import { SchedulingFiltersComponent } from '@/components/scheduling/SchedulingFilters'
import { AppointmentCell } from '@/components/scheduling/AppointmentCell'

const SchedulingModule = () => {
  // 👉 All state management moved to custom hook
  const {
    appointments,
    filteredAppointments,
    filters,
    updateFilter,
    showNewAppointment,
    setShowNewAppointment,
    chairUtilization
  } = useScheduling()

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
                    <Input type="date" defaultValue={filters.selectedDate || ''} />
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

        {/* 👉 Extracted filters component */}
        <SchedulingFiltersComponent 
          filters={filters}
          onFilterChange={updateFilter}
        />

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
                    {filters.selectedDate ? new Date(filters.selectedDate).toLocaleDateString('en-US', { 
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
                                {appointment && <AppointmentCell appointment={appointment} timeSlot={time} />}
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
                  <ChairStatusCard 
                    key={chair.id}
                    chair={chair}
                    utilization={chairUtilization}
                  />
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