/* 💬 Communication Module - Integrated from legacy-mocks */

"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MessageCircle,
  Send,
  Clock,
  CheckCheck,
  Star,
  TrendingUp,
  Calendar,
  Bell,
  Users,
  Settings,
  Search,
  Plus,
  BarChart3,
  Target,
  ArrowUpRight,
  AlertCircle,
  BookOpen,
  FileText
} from 'lucide-react'

// Sample communication data
const communicationData = {
  messages: [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientId: "PT-2024-1001",
      channel: "sms",
      lastMessage: "Thank you for the reminder! I'll be there at 2 PM tomorrow.",
      timestamp: "2025-01-15T14:30:00Z",
      status: "delivered",
      unread: false,
      type: "appointment_confirmation"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientId: "PT-2024-1002", 
      channel: "email",
      lastMessage: "Could I reschedule my appointment to next week?",
      timestamp: "2025-01-15T13:15:00Z",
      status: "read",
      unread: true,
      type: "reschedule_request"
    },
    {
      id: 3,
      patientName: "Emily Davis",
      patientId: "PT-2024-1003",
      channel: "whatsapp",
      lastMessage: "Is it normal to have sensitivity after the cleaning?",
      timestamp: "2025-01-15T11:20:00Z", 
      status: "delivered",
      unread: true,
      type: "treatment_inquiry"
    }
  ],
  campaigns: [
    {
      id: 1,
      name: "6-Month Cleaning Recalls",
      type: "recall",
      status: "active",
      schedule: "Bi-annual",
      sentCount: 156,
      responseRate: 68,
      bookingRate: 42,
      nextRun: "2025-01-20"
    },
    {
      id: 2,
      name: "Appointment Reminders", 
      type: "reminder",
      status: "active",
      schedule: "24 hours before",
      sentCount: 89,
      responseRate: 91,
      bookingRate: 0,
      nextRun: "Daily"
    }
  ],
  analytics: {
    totalMessages: 324,
    responseRate: 82,
    averageResponseTime: "2.3 hours",
    satisfactionScore: 4.7
  }
}

const CommunicationModule = () => {
  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')

  const getChannelIcon = (channel: string) => {
    const icons = {
      sms: <MessageSquare className="h-4 w-4" />,
      email: <Mail className="h-4 w-4" />,
      whatsapp: <MessageCircle className="h-4 w-4" />,
      phone: <Phone className="h-4 w-4" />
    }
    return icons[channel as keyof typeof icons] || <MessageSquare className="h-4 w-4" />
  }

  const getChannelColor = (channel: string) => {
    const colors = {
      sms: 'bg-blue-100 text-blue-800',
      email: 'bg-gray-100 text-gray-800', 
      whatsapp: 'bg-green-100 text-green-800',
      phone: 'bg-purple-100 text-purple-800'
    }
    return colors[channel as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Patient Communications Hub</h1>
            <p className="text-sm text-gray-600 mt-1">Multi-channel messaging, campaigns, and patient engagement</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{communicationData.analytics.totalMessages}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-green-600">{communicationData.analytics.responseRate}%</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-orange-600">{communicationData.analytics.averageResponseTime}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">{communicationData.analytics.satisfactionScore}/5</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                  <TabsList className="grid w-full grid-rows-4 h-auto">
                    <TabsTrigger value="inbox" className="justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                      <Badge className="ml-auto">{communicationData.messages.filter(m => m.unread).length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="campaigns" className="justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Campaigns
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Templates
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  
                  <TabsContent value="inbox" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Patient Messages</h3>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Search messages..." className="pl-9 w-64" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {communicationData.messages.map((message) => (
                        <Card key={message.id} className={`cursor-pointer transition-all hover:shadow-md ${message.unread ? 'border-blue-200 bg-blue-50' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  {getChannelIcon(message.channel)}
                                  <Badge className={getChannelColor(message.channel)}>
                                    {message.channel.toUpperCase()}
                                  </Badge>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{message.patientName}</h4>
                                  <p className="text-sm text-gray-500">{message.patientId}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">{formatTimestamp(message.timestamp)}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  {message.status === 'delivered' && <CheckCheck className="h-4 w-4 text-green-500" />}
                                  {message.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2">{message.lastMessage}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="campaigns" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Automated Campaigns</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        New Campaign
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {communicationData.campaigns.map((campaign) => (
                        <Card key={campaign.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                                <p className="text-sm text-gray-500">{campaign.schedule}</p>
                              </div>
                              <Badge className={campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {campaign.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <p className="font-semibold text-gray-900">{campaign.sentCount}</p>
                                <p className="text-gray-500">Sent</p>
                              </div>
                              <div className="text-center">
                                <p className="font-semibold text-blue-600">{campaign.responseRate}%</p>
                                <p className="text-gray-500">Response Rate</p>
                              </div>
                              <div className="text-center">
                                <p className="font-semibold text-green-600">{campaign.bookingRate}%</p>
                                <p className="text-gray-500">Booking Rate</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-3 pt-3 border-t">
                              <p className="text-sm text-gray-500">Next run: {campaign.nextRun}</p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Pause</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <h3 className="text-lg font-semibold">Communication Analytics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Channel Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">SMS</span>
                              </div>
                              <div className="text-right">
                                <span className="font-medium">89%</span>
                                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-600" />
                                <span className="text-sm">Email</span>
                              </div>
                              <div className="text-right">
                                <span className="font-medium">76%</span>
                                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">WhatsApp</span>
                              </div>
                              <div className="text-right">
                                <span className="font-medium">92%</span>
                                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Message Types</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Appointment Reminders</span>
                              <span className="font-medium">45%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Treatment Follow-ups</span>
                              <span className="font-medium">28%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Recall Campaigns</span>
                              <span className="font-medium">18%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">General Inquiries</span>
                              <span className="font-medium">9%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="templates" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Message Templates</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        New Template
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Bell className="h-4 w-4 text-blue-600" />
                            Appointment Reminder
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            "Hi [Patient Name], this is a reminder that you have an appointment with [Doctor] tomorrow at [Time]. Please reply CONFIRM or call us to reschedule."
                          </p>
                          <div className="flex justify-between items-center">
                            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-600" />
                            Recall Campaign
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            "It's time for your 6-month cleaning! Call us at [Phone] to schedule your appointment. We have flexible hours to fit your schedule."
                          </p>
                          <div className="flex justify-between items-center">
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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

export default CommunicationModule
