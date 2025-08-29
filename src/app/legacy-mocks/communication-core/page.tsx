"use client"

import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MessageCircle as WhatsAppIcon,
  Send,
  Clock,
  CheckCheck,
  Star,
  TrendingUp,
  Calendar,
  Bell,
  Users,
  FileText,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  Target,
  Heart,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Smile,
  AlertCircle,
  CreditCard,
  BookOpen,
  Video
} from 'lucide-react'

// Realistic patient communication data
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
      channel: "whatsapp",
      lastMessage: "Can I reschedule my cleaning to next week?",
      timestamp: "2025-01-15T13:45:00Z",
      status: "read",
      unread: true,
      type: "schedule_request"
    },
    {
      id: 3,
      patientName: "Emma Williams",
      patientId: "PT-2024-1003",
      channel: "email",
      lastMessage: "Please send me the pre-treatment instructions for my root canal.",
      timestamp: "2025-01-15T11:20:00Z", 
      status: "delivered",
      unread: true,
      type: "treatment_inquiry"
    },
    {
      id: 4,
      patientName: "David Rodriguez",
      patientId: "PT-2024-1004",
      channel: "portal",
      lastMessage: "Payment submitted for invoice #INV-2024-0156",
      timestamp: "2025-01-15T09:15:00Z",
      status: "read",
      unread: false,
      type: "payment_confirmation"
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
      lastRun: "2025-01-10T08:00:00Z",
      nextRun: "2025-01-17T08:00:00Z"
    },
    {
      id: 2,
      name: "Post-Surgery Follow-up",
      type: "follow_up",
      status: "active", 
      schedule: "24 hours post-treatment",
      sentCount: 23,
      responseRate: 91,
      bookingRate: 15,
      lastRun: "2025-01-15T16:00:00Z",
      nextRun: "2025-01-16T16:00:00Z"
    },
    {
      id: 3,
      name: "Birthday Greetings & Checkup",
      type: "birthday",
      status: "paused",
      schedule: "Monthly",
      sentCount: 89,
      responseRate: 45,
      bookingRate: 28,
      lastRun: "2025-01-01T09:00:00Z",
      nextRun: "2025-02-01T09:00:00Z"
    }
  ],
  reviews: [
    {
      id: 1,
      platform: "Google",
      rating: 5,
      patientName: "Jennifer Kim",
      review: "Excellent dental care! Dr. Smith and the team are professional and caring.",
      date: "2025-01-14T10:30:00Z",
      responded: true
    },
    {
      id: 2,
      platform: "Yelp", 
      rating: 4,
      patientName: "Robert Taylor",
      review: "Good service, but had to wait a bit longer than expected.",
      date: "2025-01-13T15:20:00Z",
      responded: false
    },
    {
      id: 3,
      platform: "Facebook",
      rating: 5,
      patientName: "Maria Santos",
      review: "Best dental experience I've ever had. Highly recommend!",
      date: "2025-01-12T09:45:00Z",
      responded: true
    }
  ],
  portalMetrics: {
    totalUsers: 2847,
    activeUsers: 1923,
    adoptionRate: 67.5,
    avgSessionTime: "8:34",
    topFeatures: [
      { name: "Appointment Scheduling", usage: 89 },
      { name: "Bill Payment", usage: 76 },
      { name: "Secure Messaging", usage: 58 },
      { name: "Treatment Plans", usage: 45 }
    ]
  }
}

const CommunicationsModule = () => {
  const [activeTab, setActiveTab] = useState('messages')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [messageText, setMessageText] = useState('')

  // Format timestamps to avoid hydration issues
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return ''
    try {
      return new Date(timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric', 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    } catch {
      return 'Just now'
    }
  }

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'sms': return <MessageSquare className="w-4 h-4" />
      case 'whatsapp': return <WhatsAppIcon className="w-4 h-4" />
      case 'email': return <Mail className="w-4 h-4" />
      case 'portal': return <Shield className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'sms': return 'bg-blue-100 text-blue-700'
      case 'whatsapp': return 'bg-green-100 text-green-700'
      case 'email': return 'bg-purple-100 text-purple-700'
      case 'portal': return 'bg-slate-100 text-slate-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCampaignStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const MessagesView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Message List */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Messages</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-100 rounded-md">
              <Search className="w-4 h-4 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-md">
              <Filter className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {communicationData.messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedMessage?.id === message.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              } ${message.unread ? 'bg-white' : 'bg-slate-50'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-1 rounded ${getChannelColor(message.channel)}`}>
                    {getChannelIcon(message.channel)}
                  </div>
                  <span className="font-medium text-slate-900">{message.patientName}</span>
                  {message.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <span className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{message.lastMessage}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">ID: {message.patientId}</span>
                <div className="flex items-center space-x-1">
                  {message.status === 'delivered' && <CheckCheck className="w-3 h-3 text-green-500" />}
                  {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <div className="bg-white rounded-lg border border-slate-200 h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded ${getChannelColor(selectedMessage.channel)}`}>
                    {getChannelIcon(selectedMessage.channel)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedMessage.patientName}</h3>
                    <p className="text-sm text-slate-500">Patient ID: {selectedMessage.patientId}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-md">
                  <MoreVertical className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Previous messages */}
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-lg max-w-xs">
                  <p className="text-sm">Reminder: You have an appointment tomorrow at 2:00 PM for a routine cleaning.</p>
                  <span className="text-xs text-slate-500 mt-1 block">Today 1:15 PM</span>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                  <p className="text-sm">{selectedMessage.lastMessage}</p>
                  <span className="text-xs text-blue-100 mt-1 block">{formatTimestamp(selectedMessage.timestamp)}</span>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <button className="text-xs text-slate-500 hover:text-slate-700">Templates</button>
                <button className="text-xs text-slate-500 hover:text-slate-700">Schedule Message</button>
                <button className="text-xs text-slate-500 hover:text-slate-700">Add Attachment</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Select a conversation</h3>
              <p className="text-slate-500">Choose a patient message to view the conversation history</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const CampaignsView = () => (
    <div className="space-y-6">
      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Campaigns</p>
              <p className="text-2xl font-semibold text-slate-900">12</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+2 this week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Messages Sent</p>
              <p className="text-2xl font-semibold text-slate-900">3,247</p>
            </div>
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+18% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Response Rate</p>
              <p className="text-2xl font-semibold text-slate-900">64%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Booking Rate</p>
              <p className="text-2xl font-semibold text-slate-900">38%</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
          <div className="flex items-center mt-2">
            <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600">-2% vs last month</span>
          </div>
        </div>
      </div>

      {/* Campaign Management */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Communication Campaigns</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {communicationData.campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-slate-900">{campaign.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCampaignStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <Edit className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-1 hover:bg-slate-100 rounded">
                      {campaign.status === 'active' ? 
                        <Pause className="w-4 h-4 text-slate-600" /> : 
                        <Play className="w-4 h-4 text-slate-600" />
                      }
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Schedule</p>
                    <p className="font-medium">{campaign.schedule}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Messages Sent</p>
                    <p className="font-medium">{campaign.sentCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Response Rate</p>
                    <p className="font-medium">{campaign.responseRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Booking Rate</p>
                    <p className="font-medium">{campaign.bookingRate}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div className="text-sm text-slate-500">
                    Last run: {formatTimestamp(campaign.lastRun)}
                  </div>
                  <div className="text-sm text-slate-500">
                    Next run: {formatTimestamp(campaign.nextRun)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const PatientPortalView = () => (
    <div className="space-y-6">
      {/* Portal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Portal Users</p>
              <p className="text-2xl font-semibold text-slate-900">{communicationData.portalMetrics.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Users</p>
              <p className="text-2xl font-semibold text-slate-900">{communicationData.portalMetrics.activeUsers.toLocaleString()}</p>
            </div>
            <Heart className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Adoption Rate</p>
              <p className="text-2xl font-semibold text-slate-900">{communicationData.portalMetrics.adoptionRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg. Session Time</p>
              <p className="text-2xl font-semibold text-slate-900">{communicationData.portalMetrics.avgSessionTime}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Portal Features Usage */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Portal Features Usage</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {communicationData.portalMetrics.topFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded">
                    {feature.name === 'Appointment Scheduling' && <Calendar className="w-4 h-4 text-blue-600" />}
                    {feature.name === 'Bill Payment' && <CreditCard className="w-4 h-4 text-blue-600" />}
                    {feature.name === 'Secure Messaging' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                    {feature.name === 'Treatment Plans' && <FileText className="w-4 h-4 text-blue-600" />}
                  </div>
                  <span className="font-medium text-slate-900">{feature.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${feature.usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{feature.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portal Preview */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Patient Portal Preview</h3>
        </div>
        <div className="p-6">
          <div className="bg-slate-50 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">SJ</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Welcome back, Sarah!</h4>
                <p className="text-slate-600">Your next appointment is Jan 16 at 2:00 PM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Appointments</span>
                </div>
                <p className="text-sm text-slate-600">Schedule or reschedule appointments</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-3 mb-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Payments</span>
                </div>
                <p className="text-sm text-slate-600">View bills and make payments</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Messages</span>
                </div>
                <p className="text-sm text-slate-600">Secure communication with your care team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ReputationView = () => (
    <div className="space-y-6">
      {/* Reputation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Overall Rating</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-semibold text-slate-900">4.8</p>
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Reviews</p>
              <p className="text-2xl font-semibold text-slate-900">342</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12 this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Response Rate</p>
              <p className="text-2xl font-semibold text-slate-900">95%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Response Time</p>
              <p className="text-2xl font-semibold text-slate-900">2.3h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Reviews</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All Reviews</button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {communicationData.reviews.map((review) => (
              <div key={review.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium text-slate-900">{review.patientName}</span>
                    <span className="text-sm text-slate-500">• {review.platform}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {review.responded ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Responded</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                    )}
                    <span className="text-sm text-slate-500">{formatTimestamp(review.date)}</span>
                  </div>
                </div>
                <p className="text-slate-700 mb-3">{review.review}</p>
                {!review.responded && (
                  <button className="text-sm text-blue-600 hover:text-blue-700">Respond to Review</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Request Campaign */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Review Request Automation</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-4">Campaign Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Send After Treatment</label>
                  <select className="w-full p-2 border border-slate-300 rounded-md">
                    <option>24 hours</option>
                    <option>48 hours</option>
                    <option>72 hours</option>
                    <option>1 week</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Platforms</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Google Reviews</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Yelp</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Facebook</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-4">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Requests Sent</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Reviews Received</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Conversion Rate</span>
                  <span className="font-medium text-green-600">57%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">4.7</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const EducationView = () => (
    <div className="space-y-6">
      {/* Education Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Content Library</p>
              <p className="text-2xl font-semibold text-slate-900">127</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-slate-600 mt-1">Articles & Videos</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Monthly Views</p>
              <p className="text-2xl font-semibold text-slate-900">2,847</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+23% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Engagement Rate</p>
              <p className="text-2xl font-semibold text-slate-900">72%</p>
            </div>
            <Heart className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Auto-Delivered</p>
              <p className="text-2xl font-semibold text-slate-900">1,234</p>
            </div>
            <Send className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Content Categories */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Educational Content Library</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded">
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Preventive Care</h4>
                  <p className="text-sm text-slate-600">23 articles</p>
                </div>
              </div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Daily brushing techniques</li>
                <li>• Flossing best practices</li>
                <li>• Diet and oral health</li>
                <li>• Regular checkup importance</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 rounded">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Post-Treatment Care</h4>
                  <p className="text-sm text-slate-600">18 guides</p>
                </div>
              </div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• After extraction care</li>
                <li>• Crown care instructions</li>
                <li>• Root canal recovery</li>
                <li>• Implant aftercare</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Video Content</h4>
                  <p className="text-sm text-slate-600">12 videos</p>
                </div>
              </div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Procedure explanations</li>
                <li>• Home care demonstrations</li>
                <li>• Treatment options overview</li>
                <li>• Patient testimonials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Education Delivery */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Automated Education Campaigns</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Pre-Appointment Education</h4>
                  <p className="text-sm text-slate-600">Sent 24 hours before appointment</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <Settings className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Post-Treatment Instructions</h4>
                  <p className="text-sm text-slate-600">Sent immediately after treatment</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <Settings className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Seasonal Oral Health Tips</h4>
                  <p className="text-sm text-slate-600">Monthly newsletter campaign</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Paused</span>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <Settings className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Patient Communications</h1>
          <p className="text-slate-600">Manage patient engagement across all channels</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'portal'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Patient Portal
          </button>
          <button
            onClick={() => setActiveTab('reputation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reputation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Reputation
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'education'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Education
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'messages' && <MessagesView />}
        {activeTab === 'campaigns' && <CampaignsView />}
        {activeTab === 'portal' && <PatientPortalView />}
        {activeTab === 'reputation' && <ReputationView />}
        {activeTab === 'education' && <EducationView />}
      </div>
    </div>
  )
}

export default CommunicationsModule