/* ⚠️ LEGACY MOCK – do not edit */


"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CreditCard, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, Pie, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Mock data for realistic financial scenarios
const mockFinancialData = {
  kpiMetrics: {
    monthlyRevenue: { current: 185420, target: 175000, previous: 168950 },
    collectionRate: { current: 94.2, target: 95.0, previous: 93.8 },
    outstandingAR: { current: 42350, target: 40000, previous: 45200 },
    averageDSO: { current: 28, target: 30, previous: 32 },
    netCollectionRatio: { current: 96.8, target: 97.0, previous: 95.9 },
    denialRate: { current: 4.2, target: 3.5, previous: 4.8 }
  },
  
  monthlyTrends: [
    { month: 'Jan', revenue: 165000, collections: 158000, target: 170000 },
    { month: 'Feb', revenue: 172000, collections: 165000, target: 170000 },
    { month: 'Mar', revenue: 168000, collections: 162000, target: 170000 },
    { month: 'Apr', revenue: 175000, collections: 168000, target: 175000 },
    { month: 'May', revenue: 182000, collections: 175000, target: 175000 },
    { month: 'Jun', revenue: 185420, collections: 178500, target: 175000 }
  ],

  revenueByService: [
    { name: 'Preventive Care', amount: 45230, percentage: 24.4, color: '#2563eb' },
    { name: 'Restorative', amount: 52180, percentage: 28.1, color: '#16a34a' },
    { name: 'Cosmetic', amount: 38920, percentage: 21.0, color: '#ea580c' },
    { name: 'Orthodontics', amount: 28450, percentage: 15.3, color: '#dc2626' },
    { name: 'Oral Surgery', amount: 20640, percentage: 11.1, color: '#64748b' }
  ],

  arAging: [
    { period: '0-30 days', amount: 18250, percentage: 43.1 },
    { period: '31-60 days', amount: 12400, percentage: 29.3 },
    { period: '61-90 days', amount: 7200, percentage: 17.0 },
    { period: '90+ days', amount: 4500, percentage: 10.6 }
  ],

  providerMetrics: [
    { name: 'Dr. Sarah Johnson', production: 85420, collection: 82150, collectionRate: 96.2 },
    { name: 'Dr. Michael Chen', production: 72180, collection: 68890, collectionRate: 95.4 },
    { name: 'Dr. Emily Rodriguez', production: 68350, collection: 64200, collectionRate: 93.9 },
    { name: 'Dr. James Wilson', production: 45890, collection: 43420, collectionRate: 94.6 }
  ],

  recentTransactions: [
    { id: 'TXN-2024-001', patient: 'John Smith', amount: 1250.00, type: 'Insurance Payment', status: 'Completed', date: '2024-08-07' },
    { id: 'TXN-2024-002', patient: 'Maria Garcia', amount: 420.00, type: 'Patient Payment', status: 'Completed', date: '2024-08-07' },
    { id: 'TXN-2024-003', patient: 'Robert Johnson', amount: 2180.00, type: 'Treatment Plan', status: 'Pending', date: '2024-08-06' },
    { id: 'TXN-2024-004', patient: 'Lisa Chen', amount: 650.00, type: 'Copay', status: 'Completed', date: '2024-08-06' },
    { id: 'TXN-2024-005', patient: 'David Wilson', amount: 890.00, type: 'Insurance Claim', status: 'Under Review', date: '2024-08-05' }
  ],

  upcomingPayments: [
    { patient: 'Jennifer Adams', amount: 125.00, dueDate: '2024-08-10', type: 'Payment Plan' },
    { patient: 'Michael Brown', amount: 750.00, dueDate: '2024-08-12', type: 'Treatment Balance' },
    { patient: 'Sarah Davis', amount: 200.00, dueDate: '2024-08-15', type: 'Payment Plan' },
    { patient: 'Thomas Miller', amount: 1200.00, dueDate: '2024-08-18', type: 'Insurance Deductible' }
  ]
}

export default function FinancialManagementModule() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState('current-month')

  // Calculate percentage changes and trends
  const calculatePercentageChange = (current, previous) => {
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'under review':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTrendIcon = (current, target) => {
    if (current > target) {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />
    } else if (current < target) {
      return <ArrowDownRight className="h-4 w-4 text-red-600" />
    }
    return <ArrowUpRight className="h-4 w-4 text-green-600" />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Financial Management</h1>
            <p className="text-sm text-slate-600 mt-1">Revenue cycle management and financial analytics</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Financial Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Executive Dashboard</TabsTrigger>
            <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
            <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          </TabsList>

          {/* Executive Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Monthly Revenue */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatCurrency(mockFinancialData.kpiMetrics.monthlyRevenue.current)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    {getTrendIcon(mockFinancialData.kpiMetrics.monthlyRevenue.current, mockFinancialData.kpiMetrics.monthlyRevenue.target)}
                    <span>
                      {calculatePercentageChange(
                        mockFinancialData.kpiMetrics.monthlyRevenue.current,
                        mockFinancialData.kpiMetrics.monthlyRevenue.previous
                      )}% vs last month
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={(mockFinancialData.kpiMetrics.monthlyRevenue.current / mockFinancialData.kpiMetrics.monthlyRevenue.target) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Target: {formatCurrency(mockFinancialData.kpiMetrics.monthlyRevenue.target)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Collection Rate */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                  <Target className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatPercentage(mockFinancialData.kpiMetrics.collectionRate.current)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    {getTrendIcon(mockFinancialData.kpiMetrics.collectionRate.current, mockFinancialData.kpiMetrics.collectionRate.previous)}
                    <span>
                      +{(mockFinancialData.kpiMetrics.collectionRate.current - mockFinancialData.kpiMetrics.collectionRate.previous).toFixed(1)}% improvement
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={mockFinancialData.kpiMetrics.collectionRate.current} 
                      className="h-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Target: {formatPercentage(mockFinancialData.kpiMetrics.collectionRate.target)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Outstanding AR */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Outstanding AR</CardTitle>
                  <Clock className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatCurrency(mockFinancialData.kpiMetrics.outstandingAR.current)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                    <span>
                      {calculatePercentageChange(
                        mockFinancialData.kpiMetrics.outstandingAR.current,
                        mockFinancialData.kpiMetrics.outstandingAR.previous
                      )}% reduction
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-500">
                      Average DSO: {mockFinancialData.kpiMetrics.averageDSO.current} days
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Net Collection Ratio */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Collection Ratio</CardTitle>
                  <TrendingUp className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatPercentage(mockFinancialData.kpiMetrics.netCollectionRatio.current)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span>Above industry average</span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={mockFinancialData.kpiMetrics.netCollectionRatio.current} 
                      className="h-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Industry avg: 94.5%
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Denial Rate */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Claim Denial Rate</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatPercentage(mockFinancialData.kpiMetrics.denialRate.current)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                    <span>
                      -{(mockFinancialData.kpiMetrics.denialRate.previous - mockFinancialData.kpiMetrics.denialRate.current).toFixed(1)}% improvement
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-500">
                      Target: {formatPercentage(mockFinancialData.kpiMetrics.denialRate.target)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Provider Productivity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Producer</CardTitle>
                  <Users className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-slate-900">
                    {mockFinancialData.providerMetrics[0].name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {formatCurrency(mockFinancialData.providerMetrics[0].production)} production
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-500">
                      Collection rate: {formatPercentage(mockFinancialData.providerMetrics[0].collectionRate)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Trend Analysis</CardTitle>
                  <CardDescription>Monthly revenue vs targets and collections</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockFinancialData.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), '']}
                        labelStyle={{ color: '#1e293b' }}
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#2563eb" 
                        strokeWidth={2} 
                        name="Revenue"
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="collections" 
                        stroke="#16a34a" 
                        strokeWidth={2} 
                        name="Collections"
                        dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#64748b" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        name="Target"
                        dot={{ fill: '#64748b', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue by Service Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue by Service Type</CardTitle>
                  <CardDescription>Current month service distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={mockFinancialData.revenueByService}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="amount"
                      >
                        {mockFinancialData.revenueByService.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Revenue']}
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
                      />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    {mockFinancialData.revenueByService.map((service, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: service.color }}
                          />
                          <span className="text-slate-700">{service.name}</span>
                        </div>
                        <div className="font-medium text-slate-900">
                          {formatCurrency(service.amount)} ({service.percentage}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AR Aging and Provider Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AR Aging Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accounts Receivable Aging</CardTitle>
                  <CardDescription>Outstanding balances by aging period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFinancialData.arAging.map((period, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{period.period}</span>
                          <span className="font-medium text-slate-900">
                            {formatCurrency(period.amount)} ({period.percentage}%)
                          </span>
                        </div>
                        <Progress value={period.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        {mockFinancialData.arAging[3].percentage}% of AR is over 90 days old
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Provider Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Provider Performance</CardTitle>
                  <CardDescription>Production and collection metrics by provider</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFinancialData.providerMetrics.map((provider, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">{provider.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {formatPercentage(provider.collectionRate)} collection
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>Production: {formatCurrency(provider.production)}</span>
                          <span>Collected: {formatCurrency(provider.collection)}</span>
                        </div>
                        <Progress value={provider.collectionRate} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing & Payments Tab */}
          <TabsContent value="billing" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Billing & Payment Management</CardTitle>
                <CardDescription>Manage patient billing, payments, and insurance claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search transactions, patients, or claim numbers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </div>

                {/* Recent Transactions */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-900">Recent Transactions</h3>
                  {mockFinancialData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {transaction.status === 'Completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : transaction.status === 'Pending' ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{transaction.patient}</div>
                          <div className="text-xs text-slate-500">{transaction.id} • {transaction.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          <span className="text-xs text-slate-500">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Plans and Upcoming Payments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Payment Plans */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Payment Plans</CardTitle>
                  <CardDescription>Monitor patient payment plan progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFinancialData.upcomingPayments.filter(p => p.type === 'Payment Plan').map((payment, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">{payment.patient}</span>
                          <span className="text-sm font-medium text-slate-900">{formatCurrency(payment.amount)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Next payment due: {payment.dueDate}</span>
                          <Badge variant="outline" className="text-xs">Auto-pay enabled</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    View All Payment Plans
                  </Button>
                </CardContent>
              </Card>

              {/* Insurance Claims Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Insurance Claims Status</CardTitle>
                  <CardDescription>Track claim submissions and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-blue-600">24</div>
                        <div className="text-xs text-slate-600">Submitted</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-green-600">18</div>
                        <div className="text-xs text-slate-600">Approved</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-xs text-slate-600">Denied</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Claim #CLM-2024-089 approved</span>
                        </div>
                        <span className="text-sm font-medium text-green-900">{formatCurrency(1450)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-800">Claim #CLM-2024-087 denied</span>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">
                          Appeal
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Outstanding Balances */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Outstanding Patient Balances</CardTitle>
                <CardDescription>Patients with overdue balances requiring follow-up</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      12 patients have balances over 60 days old totaling {formatCurrency(11700)}
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <div className="text-sm font-medium text-red-900">Critical (90+ days)</div>
                      <div className="text-2xl font-bold text-red-700">{formatCurrency(4500)}</div>
                      <div className="text-xs text-red-600">3 patients</div>
                    </div>
                    <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div className="text-sm font-medium text-yellow-900">Overdue (61-90 days)</div>
                      <div className="text-2xl font-bold text-yellow-700">{formatCurrency(7200)}</div>
                      <div className="text-xs text-yellow-600">9 patients</div>
                    </div>
                    <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900">Follow-up (31-60 days)</div>
                      <div className="text-2xl font-bold text-blue-700">{formatCurrency(12400)}</div>
                      <div className="text-xs text-blue-600">15 patients</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Statements
                    </Button>
                    <Button variant="outline" size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Send Payment Reminders
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Start Collection Process
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Revenue Forecasting */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Forecasting & Trends</CardTitle>
                <CardDescription>AI-powered revenue predictions and trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600">Projected Next Month</div>
                    <div className="text-2xl font-bold text-slate-900">{formatCurrency(192000)}</div>
                    <div className="flex items-center space-x-1 text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+3.6% growth predicted</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600">Q3 2024 Forecast</div>
                    <div className="text-2xl font-bold text-slate-900">{formatCurrency(570000)}</div>
                    <div className="flex items-center space-x-1 text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>On track to exceed target</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600">Annual Projection</div>
                    <div className="text-2xl font-bold text-slate-900">{formatCurrency(2280000)}</div>
                    <div className="flex items-center space-x-1 text-xs text-blue-600">
                      <Target className="h-3 w-3" />
                      <span>12% above last year</span>
                    </div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={[
                    ...mockFinancialData.monthlyTrends,
                    { month: 'Jul', revenue: 192000, collections: 185000, target: 180000, forecast: true },
                    { month: 'Aug', revenue: 198000, collections: 191000, target: 185000, forecast: true },
                    { month: 'Sep', revenue: 203000, collections: 196000, target: 190000, forecast: true }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${value/1000}k`} />
                    <Tooltip 
                      formatter={(value, name) => [formatCurrency(value), name === 'revenue' ? 'Revenue' : name === 'collections' ? 'Collections' : 'Target']}
                      labelStyle={{ color: '#1e293b' }}
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#2563eb" 
                      fill="url(#colorRevenue)"
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#64748b" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Treatment Acceptance Rates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Treatment Acceptance Analysis</CardTitle>
                  <CardDescription>Case acceptance rates by treatment type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { treatment: 'Preventive Care', acceptance: 96.2, revenue: 45230 },
                      { treatment: 'Restorative', acceptance: 87.5, revenue: 52180 },
                      { treatment: 'Cosmetic', acceptance: 72.8, revenue: 38920 },
                      { treatment: 'Orthodontics', acceptance: 68.4, revenue: 28450 },
                      { treatment: 'Oral Surgery', acceptance: 81.3, revenue: 20640 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">{item.treatment}</span>
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-900">{item.acceptance}%</div>
                            <div className="text-xs text-slate-500">{formatCurrency(item.revenue)}</div>
                          </div>
                        </div>
                        <Progress value={item.acceptance} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="text-sm text-blue-800">
                      💡 Opportunity: Cosmetic treatment acceptance could increase revenue by 15-20%
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Optimization Insights</CardTitle>
                  <CardDescription>AI-powered recommendations for revenue growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-green-900">Optimal Scheduling</div>
                          <div className="text-xs text-green-700">Current efficiency: 89% (above target)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-yellow-900">Insurance Follow-up</div>
                          <div className="text-xs text-yellow-700">
                            {formatCurrency(8400)} in pending claims over 30 days
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-start space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-blue-900">Growth Opportunity</div>
                          <div className="text-xs text-blue-700">
                            Increase cosmetic consultations by 25% for +{formatCurrency(12000)}/month
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                      <div className="flex items-start space-x-2">
                        <BarChart3 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-purple-900">Patient Retention</div>
                          <div className="text-xs text-purple-700">
                            94.2% retention rate (2.1% above industry average)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    <PieChart className="h-4 w-4 mr-2" />
                    Generate Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Cost Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Center Analysis</CardTitle>
                <CardDescription>Expense breakdown and profitability by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-slate-600">Total Operating Costs</div>
                    <div className="text-2xl font-bold text-slate-900">{formatCurrency(128500)}</div>
                    <div className="text-xs text-green-600">-2.3% vs last month</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-sm text-slate-600">Gross Profit Margin</div>
                    <div className="text-2xl font-bold text-slate-900">72.1%</div>
                    <div className="text-xs text-green-600">+1.2% improvement</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-sm text-slate-600">Net Profit</div>
                    <div className="text-2xl font-bold text-slate-900">{formatCurrency(56920)}</div>
                    <div className="text-xs text-green-600">Above industry average</div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { category: 'Staff Salaries', amount: 65000, percentage: 50.6 },
                    { category: 'Supplies', amount: 28500, percentage: 22.2 },
                    { category: 'Equipment', amount: 15200, percentage: 11.8 },
                    { category: 'Facility', amount: 12800, percentage: 10.0 },
                    { category: 'Marketing', amount: 4200, percentage: 3.3 },
                    { category: 'Other', amount: 2800, percentage: 2.2 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="category" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${value/1000}k`} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Amount']}
                      labelStyle={{ color: '#1e293b' }}
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
                    />
                    <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            {/* Report Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Reports</CardTitle>
                <CardDescription>Generate comprehensive financial reports and statements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Profit & Loss Report */}
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <BarChart3 className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-medium text-slate-900">Profit & Loss Statement</div>
                        <div className="text-xs text-slate-500">Monthly, quarterly, annual</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Comprehensive income statement with revenue, expenses, and net profit analysis.
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  {/* Cash Flow Report */}
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-medium text-slate-900">Cash Flow Analysis</div>
                        <div className="text-xs text-slate-500">Real-time cash position</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Track cash inflows and outflows with detailed categorization and projections.
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  {/* AR Aging Report */}
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="h-8 w-8 text-yellow-600" />
                      <div>
                        <div className="font-medium text-slate-900">AR Aging Report</div>
                        <div className="text-xs text-slate-500">Outstanding receivables</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Detailed breakdown of outstanding patient and insurance balances by aging period.
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  {/* Provider Performance */}
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="h-8 w-8 text-purple-600" />
                      <div>
                        <div className="font-medium text-slate-900">Provider Performance</div>
                        <div className="text-xs text-slate-500">Individual productivity</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Production, collection rates, and performance metrics by provider and period.
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  {/* Insurance Analysis */}
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="h-8 w-8 text-indigo-600" />
                      <div>
                        <div className="font-medium text-slate-900">Insurance Analysis</div>
                        <div className="text-xs text-slate-500">Claims and reimbursements</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Comprehensive analysis of insurance claims, approval rates, and reimbursement trends.
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  {/* Budget vs Actual */}
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <Target className="h-8 w-8 text-red-600" />
                      <div>
                        <div className="font-medium text-slate-900">Budget Analysis</div>
                        <div className="text-xs text-slate-500">Budget vs actual performance</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Compare actual performance against budgets with variance analysis and explanations.
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>

                {/* Custom Report Builder */}
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <PieChart className="h-6 w-6 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Custom Report Builder</div>
                      <div className="text-sm text-blue-700">Create tailored reports with specific metrics and date ranges</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-blue-900 block mb-2">Report Type</label>
                      <select className="w-full p-2 border border-blue-300 rounded-md text-sm">
                        <option>Revenue Analysis</option>
                        <option>Expense Breakdown</option>
                        <option>Provider Comparison</option>
                        <option>Patient Analytics</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-900 block mb-2">Date Range</label>
                      <select className="w-full p-2 border border-blue-300 rounded-md text-sm">
                        <option>Current Month</option>
                        <option>Last 3 Months</option>
                        <option>Year to Date</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-900 block mb-2">Format</label>
                      <select className="w-full p-2 border border-blue-300 rounded-md text-sm">
                        <option>PDF Report</option>
                        <option>Excel Spreadsheet</option>
                        <option>CSV Data</option>
                        <option>PowerPoint</option>
                      </select>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Build Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Reports</CardTitle>
                <CardDescription>Previously generated financial reports and statements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'June 2024 P&L Statement', type: 'Profit & Loss', date: '2024-07-02', size: '2.4 MB' },
                    { name: 'Q2 2024 Cash Flow Analysis', type: 'Cash Flow', date: '2024-07-01', size: '1.8 MB' },
                    { name: 'Provider Performance - June', type: 'Provider Analysis', date: '2024-06-30', size: '1.2 MB' },
                    { name: 'AR Aging Report - June 30', type: 'Accounts Receivable', date: '2024-06-30', size: '956 KB' },
                    { name: 'Insurance Claims Analysis - Q2', type: 'Insurance', date: '2024-06-28', size: '3.1 MB' }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-5 w-5 text-slate-400" />
                        <div>
                          <div className="font-medium text-slate-900">{report.name}</div>
                          <div className="text-sm text-slate-500">{report.type} • {report.date} • {report.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}