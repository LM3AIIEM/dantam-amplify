"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Activity,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
  Pill,
  Package
} from 'lucide-react'

// DANTAM Dental Practice Management System
// Landing Page - Module Navigation Dashboard

const modules = [
  {
    id: 'scheduling',
    title: 'Scheduling & Resource Management',
    description: 'Intelligent appointment scheduling with real-time conflict detection and resource optimization',
    icon: Calendar,
    status: 'active',
    features: ['Smart Scheduling', 'Conflict Detection', 'Resource Management', 'Chair Utilization'],
    href: '/scheduling',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    progress: 95
  },
  {
    id: 'finance',
    title: 'Financial Management',
    description: 'Comprehensive revenue cycle management, financial analytics, and reporting dashboard',
    icon: DollarSign,
    status: 'active',
    features: ['Revenue Analytics', 'A/R Management', 'Financial Reporting', 'KPI Tracking'],
    href: '/finance',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    progress: 100
  },
  {
    id: 'patients',
    title: 'Patient Management',
    description: 'Complete patient records, treatment history, and clinical documentation system',
    icon: Users,
    status: 'active',
    features: ['Patient Records', 'Treatment History', 'Insurance Management', 'Communication'],
    href: '/patients',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
    progress: 85
  },
  {
    id: 'charting',
    title: 'Clinical Charting',
    description: 'Advanced dental charting system with digital records and treatment planning',
    icon: FileText,
    status: 'active',
    features: ['Digital Charting', 'Treatment Planning', 'Clinical Notes', 'Imaging Integration'],
    href: '/clinical/1', // Opens unified view for Priya Sharma
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
    progress: 85
  },
  {
    id: 'communication',
    title: 'Communication Hub',
    description: 'Multi-channel patient messaging, automated campaigns, and engagement analytics',
    icon: MessageSquare,
    status: 'active',
    features: ['SMS & Email', 'WhatsApp Integration', 'Campaign Management', 'Analytics'],
    href: '/communication',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600',
    progress: 80
  },
  {
    id: 'prescriptions',
    title: 'Digital Prescriptions',
    description: 'Electronic prescription management with drug database and pharmacy integration',
    icon: Pill,
    status: 'active',
    features: ['E-Prescriptions', 'Drug Database', 'Dosage Calculator', 'Pharmacy Integration'],
    href: '/prescriptions',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600',
    progress: 75
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'Track supplies, equipment, and materials with automated reorder alerts',
    icon: Package,
    status: 'active',
    features: ['Stock Tracking', 'Reorder Alerts', 'Expiration Monitoring', 'Vendor Management'],
    href: '/inventory',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    progress: 70
  }
]

// Legacy Mock Modules for Testing & Development
const legacyMockModules = [
  {
    id: 'clinical-core',
    title: 'Clinical Core (Original)',
    description: 'Original clinical workflow implementation with comprehensive patient case management',
    icon: Activity,
    status: 'development',
    features: ['Case Management', 'Clinical Workflow', 'Patient Records', 'Treatment Planning'],
    href: '/legacy-mocks/clinical-core',
    color: 'bg-slate-50 border-slate-200',
    iconColor: 'text-slate-600'
  },
  {
    id: 'clinical-core-alt',
    title: 'Clinical Core (Alternative)',
    description: 'Alternative clinical interface design with enhanced user experience patterns',
    icon: Activity,
    status: 'development',
    features: ['Enhanced UX', 'Alternative Layout', 'Workflow Testing', 'Design Patterns'],
    href: '/legacy-mocks/clinical-core-alt',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600'
  },
  {
    id: 'patient-core-detailed',
    title: 'Patient Core (Detailed)',
    description: 'Comprehensive patient management with detailed information architecture',
    icon: Users,
    status: 'development',
    features: ['Detailed Records', 'Complex Workflows', 'Information Architecture', 'Data Management'],
    href: '/legacy-mocks/patient-core-detailed',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600'
  },
  {
    id: 'patient-core-sleek',
    title: 'Patient Core (Sleek)',
    description: 'Streamlined patient interface focused on essential information and quick actions',
    icon: Users,
    status: 'development',
    features: ['Minimal Design', 'Quick Actions', 'Essential Info', 'Streamlined UX'],
    href: '/legacy-mocks/patient-core-sleek',
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-600'
  },
  {
    id: 'financial-core',
    title: 'Financial Core (Legacy)',
    description: 'Original financial management system with comprehensive accounting features',
    icon: DollarSign,
    status: 'development',
    features: ['Accounting', 'Revenue Tracking', 'Financial Reports', 'Legacy Features'],
    href: '/legacy-mocks/financial-core',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600'
  },
  {
    id: 'scheduling-core',
    title: 'Scheduling Core (Legacy)',
    description: 'Original scheduling system with appointment management and resource allocation',
    icon: Calendar,
    status: 'development',
    features: ['Appointment Management', 'Resource Allocation', 'Legacy Interface', 'Scheduling Logic'],
    href: '/legacy-mocks/scheduling-core',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    id: 'communication-core',
    title: 'Communication Core (Legacy)',
    description: 'Original patient communication system with messaging and notification features',
    icon: MessageSquare,
    status: 'development',
    features: ['Patient Messaging', 'Notifications', 'Communication Hub', 'Legacy Features'],
    href: '/legacy-mocks/communication-core',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600'
  },
  {
    id: 'prescription-core',
    title: 'Prescription Core (Legacy)',
    description: 'Original digital prescription system with drug database and pharmacy integration',
    icon: Pill,
    status: 'development',
    features: ['Digital Prescriptions', 'Drug Database', 'Pharmacy Integration', 'Legacy Interface'],
    href: '/legacy-mocks/prescription-core',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600'
  },
  {
    id: 'inventory-core',
    title: 'Inventory Core (Legacy)',
    description: 'Original inventory management system with stock tracking and supplier management',
    icon: Package,
    status: 'development',
    features: ['Stock Management', 'Supplier Relations', 'Inventory Tracking', 'Legacy Features'],
    href: '/legacy-mocks/inventory-core',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600'
  }
]

const DashboardLanding = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              DANTAM Dental Practice Management
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive suite of integrated modules for modern dental practice management
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <div key={module.id} className="relative">
                <GlowingEffect
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={48}
                  inactiveZone={0.1}
                  borderWidth={2}
                  movementDuration={1.5}
                />
                <Link href={module.href}>
                  <Card className={`${module.color} hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 relative`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-white ${module.iconColor}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <Badge 
                            className={
                              module.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : module.status === 'disabled'
                                  ? 'bg-gray-100 text-gray-600'
                                  : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {module.status === 'active' ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : module.status === 'disabled' ? (
                              <>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Disabled
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Development
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-slate-700 mb-4">
                      {module.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-600">Development Progress</span>
                        <span className="text-sm text-slate-600">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Feature List */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-600 mb-2">Key Features:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {module.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Legacy Mock Modules Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Development Prototypes & Legacy Modules
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore different implementations and design approaches for testing and comparison
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {legacyMockModules.map((module) => {
              const IconComponent = module.icon
              return (
                <div key={module.id} className="relative">
                  <GlowingEffect
                    spread={25}
                    glow={true}
                    disabled={false}
                    proximity={40}
                    inactiveZone={0.2}
                    borderWidth={1.5}
                    movementDuration={2}
                    variant="white"
                  />
                  <Link href={module.href}>
                    <Card className={`${module.color} hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border-dashed relative`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg bg-white ${module.iconColor}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Prototype
                            </Badge>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-slate-700 mb-4">
                        {module.description}
                      </p>
                      
                      {/* Feature List */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-slate-600 mb-2">Features:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {module.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-yellow-600" />
                              <span className="text-xs text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLanding