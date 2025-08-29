/* ⚠️ LEGACY MOCK – do not edit */



"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, 
  Camera, 
  FileText, 
  Plus, 
  Save, 
  User, 
  Stethoscope,
  Clipboard,
  Edit3,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react'

// Clinical data with realistic dental cases
const clinicalCases = [
  {
    id: 'CS-2025-001',
    patientName: 'Sarah Mitchell',
    age: 34,
    phone: '(555) 234-5678',
    email: 'sarah.mitchell@email.com',
    priority: 'routine',
    chiefComplaint: 'Routine cleaning and checkup',
    painScale: 0,
    provider: 'Dr. Emily Rodriguez',
    stage: 'assessment',
    lastUpdated: '2025-01-15',
    procedures: ['D1110', 'D0150'],
    teeth: {
      4: { status: 'restoration', condition: 'amalgam-filling' },
      8: { status: 'missing', condition: 'extracted' },
      14: { status: 'decay', condition: 'caries-occlusal' },
      19: { status: 'restoration', condition: 'crown' },
      30: { status: 'decay', condition: 'caries-mesial' }
    }
  },
  {
    id: 'CS-2025-002',
    patientName: 'Michael Chen',
    age: 42,
    phone: '(555) 876-5432',
    email: 'mchen@techcorp.com',
    priority: 'urgent',
    chiefComplaint: 'Severe tooth pain, upper right molar',
    painScale: 8,
    provider: 'Dr. James Thompson',
    stage: 'treatment',
    lastUpdated: '2025-01-16',
    procedures: ['D3330', 'D2740'],
    teeth: {
      3: { status: 'decay', condition: 'pulpitis' },
      14: { status: 'treatment', condition: 'crown-prep' }
    }
  }
]

const toothStatuses = {
  healthy: { color: 'bg-green-500', label: 'Healthy' },
  decay: { color: 'bg-red-500', label: 'Decay' },
  restoration: { color: 'bg-blue-500', label: 'Restoration' },
  missing: { color: 'bg-gray-400', label: 'Missing' },
  treatment: { color: 'bg-yellow-500', label: 'Under Treatment' }
}

const painColors = {
  0: 'text-green-600', 1: 'text-green-500', 2: 'text-green-400',
  3: 'text-yellow-500', 4: 'text-yellow-600', 5: 'text-orange-400',
  6: 'text-orange-500', 7: 'text-orange-600', 8: 'text-red-500',
  9: 'text-red-600', 10: 'text-red-700'
}

const procedures = [
  { code: 'D0150', name: 'Comprehensive Oral Evaluation', category: 'Diagnostic' },
  { code: 'D1110', name: 'Adult Prophylaxis', category: 'Preventive' },
  { code: 'D2140', name: 'Amalgam Restoration - One Surface', category: 'Restorative' },
  { code: 'D2740', name: 'Crown - Porcelain/Ceramic', category: 'Restorative' },
  { code: 'D3330', name: 'Root Canal Therapy - Molar', category: 'Endodontic' },
  { code: 'D4910', name: 'Periodontal Maintenance', category: 'Periodontic' }
]

// Tooth Diagram Component
const ToothChart = ({ teeth, selectedTooth, onToothSelect }) => {
  const upperTeeth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  const lowerTeeth = [32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17]
  
  const renderTooth = (number) => {
    const tooth = teeth[number] || { status: 'healthy' }
    const statusColor = toothStatuses[tooth.status]?.color || 'bg-gray-200'
    const isSelected = selectedTooth === number
    
    return (
      <div
        key={number}
        className={`w-7 h-9 ${statusColor} rounded cursor-pointer border-2 transition-all hover:scale-110 flex items-center justify-center text-white text-xs font-bold ${
          isSelected ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'
        }`}
        onClick={() => onToothSelect(number)}
        title={`Tooth ${number}: ${toothStatuses[tooth.status]?.label || 'Healthy'}`}
      >
        {number}
      </div>
    )
  }
  
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="text-center">
        <h3 className="text-sm font-semibold mb-2">Upper Arch</h3>
        <div className="flex justify-center gap-1">
          {upperTeeth.map(renderTooth)}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-semibold mb-2">Lower Arch</h3>
        <div className="flex justify-center gap-1">
          {lowerTeeth.map(renderTooth)}
        </div>
      </div>
      
      <div className="flex justify-center gap-3 text-xs">
        {Object.entries(toothStatuses).map(([status, config]) => (
          <div key={status} className="flex items-center gap-1">
            <div className={`w-3 h-3 ${config.color} rounded`}></div>
            <span>{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Component
const ClinicalChartingModule = () => {
  const [selectedCase, setSelectedCase] = useState(clinicalCases[0])
  const [selectedTooth, setSelectedTooth] = useState(null)
  const [activeTab, setActiveTab] = useState('assessment')
  const [notes, setNotes] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString())
  }, [])
  
  const getPriorityColor = (priority) => {
    const colors = {
      routine: 'bg-green-100 text-green-800',
      urgent: 'bg-red-100 text-red-800',
      emergency: 'bg-red-200 text-red-900'
    }
    return colors[priority] || colors.routine
  }
  
  const getStageColor = (stage) => {
    const colors = {
      assessment: 'bg-blue-100 text-blue-800',
      treatment: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    }
    return colors[stage] || colors.assessment
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Clinical Charting & Case Management</h1>
            <p className="text-sm text-gray-600 mt-1">Comprehensive dental documentation and treatment planning</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Case
            </Button>
          </div>
        </div>

        {/* Case Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Active Clinical Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedCase.id === caseItem.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{caseItem.patientName}</h3>
                      <p className="text-sm text-gray-600">{caseItem.id}</p>
                    </div>
                    <div className="space-y-1">
                      <Badge className={getPriorityColor(caseItem.priority)}>
                        {caseItem.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{caseItem.chiefComplaint}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Pain: <span className={painColors[caseItem.painScale]}>{caseItem.painScale}/10</span></span>
                    <span>{caseItem.provider}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Case Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Patient Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedCase.patientName}</h3>
                  <p className="text-sm text-gray-600">Age: {selectedCase.age} • Case: {selectedCase.id}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {selectedCase.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {selectedCase.email}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Case Status</h4>
                  <Badge className={getStageColor(selectedCase.stage)}>
                    {selectedCase.stage.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Pain Assessment</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold ${painColors[selectedCase.painScale]}`}>
                      {selectedCase.painScale}
                    </span>
                    <span className="text-sm text-gray-600">/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedCase.painScale <= 3 ? 'bg-green-500' :
                        selectedCase.painScale <= 6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${selectedCase.painScale * 10}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">Provider</h4>
                  <p className="text-sm text-gray-700">{selectedCase.provider}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="assessment">Assessment</TabsTrigger>
                    <TabsTrigger value="charting">Tooth Chart</TabsTrigger>
                    <TabsTrigger value="treatment">Treatment</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="assessment" className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Stethoscope className="w-5 h-5" />
                      Clinical Assessment
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Chief Complaint</label>
                        <Textarea 
                          value={selectedCase.chiefComplaint}
                          readOnly
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Clinical Findings</label>
                        <Textarea 
                          placeholder="Document examination findings..."
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Pain Scale (0-10)</label>
                        <Input 
                          type="number" 
                          min="0" 
                          max="10" 
                          value={selectedCase.painScale}
                          readOnly
                          className="w-20"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Diagnosis (ICD-10)</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select diagnosis..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="K02.9">Dental caries, unspecified</SelectItem>
                            <SelectItem value="K04.7">Periapical abscess</SelectItem>
                            <SelectItem value="Z01.20">Dental examination</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Assessment
                      </Button>
                      <Button variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photos
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="charting" className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clipboard className="w-5 h-5" />
                      Interactive Tooth Chart
                    </h3>
                    
                    <ToothChart 
                      teeth={selectedCase.teeth}
                      selectedTooth={selectedTooth}
                      onToothSelect={setSelectedTooth}
                    />
                    
                    {selectedTooth && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle>Tooth #{selectedTooth} Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Status</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="healthy">Healthy</SelectItem>
                                  <SelectItem value="decay">Decay</SelectItem>
                                  <SelectItem value="restoration">Restoration</SelectItem>
                                  <SelectItem value="missing">Missing</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Condition</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select condition..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="caries-occlusal">Occlusal Caries</SelectItem>
                                  <SelectItem value="amalgam-filling">Amalgam Filling</SelectItem>
                                  <SelectItem value="crown">Crown</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Notes</label>
                            <Textarea placeholder="Tooth-specific notes..." />
                          </div>
                          
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Save className="w-4 h-4 mr-2" />
                            Update Tooth
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="treatment" className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Treatment Plan</h3>
                    
                    <div className="space-y-3">
                      {selectedCase.procedures.map((code, index) => {
                        const proc = procedures.find(p => p.code === code)
                        return (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-semibold">{proc?.name || code}</h4>
                                  <p className="text-sm text-gray-600">Code: {code} | {proc?.category}</p>
                                </div>
                                <Badge variant="outline">Planned</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                    
                    <Card className="border-dashed">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-3 gap-4">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Add procedure..." />
                            </SelectTrigger>
                            <SelectContent>
                              {procedures.map(proc => (
                                <SelectItem key={proc.code} value={proc.code}>
                                  {proc.code} - {proc.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input placeholder="Tooth number(s)" />
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Save Treatment Plan
                    </Button>
                  </TabsContent>

                  <TabsContent value="notes" className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Clinical Notes</h3>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">January 16, 2025 - 2:30 PM</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Root canal therapy initiated on tooth #3. Working length established. Patient reports pain decreased to 3/10.</p>
                        <p className="text-xs text-gray-500 mt-2">Dr. James Thompson</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardContent className="p-4 space-y-4">
                        <Textarea 
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add clinical note..."
                          className="min-h-[100px]"
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Note type..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clinical">Clinical</SelectItem>
                              <SelectItem value="treatment">Treatment</SelectItem>
                              <SelectItem value="follow-up">Follow-up</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Input value={currentTime} readOnly className="bg-gray-50" />
                        </div>
                        
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={!notes.trim()}
                          onClick={() => setNotes('')}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Note
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClinicalChartingModule