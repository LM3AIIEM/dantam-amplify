"use client"

import React from 'react'
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
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Import our extracted utilities and hook
import { 
  calculatePercentageChange, 
  formatCurrency, 
  formatPercentage, 
  getStatusColor,
  getTrendDirection,
  getTrendColorClass
} from '@/lib/utils/finance'
import { useFinance } from '@/hooks/useFinance'
import { ExecutiveDashboard } from '@/components/finance'

export default function FinancialManagementModule() {
  // Use our custom hook for state management
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedDateRange,
    setSelectedDateRange,
    filteredTransactions,
    data: {
      kpiMetrics,
      monthlyTrends,
      revenueByService,
      arAging,
      providerMetrics,
      recentTransactions,
      upcomingPayments
    }
  } = useFinance()

  // Helper function for getting trend icon - returns JSX
  const getTrendIcon = (current: number, target: number) => {
    const direction = getTrendDirection(current, target);
    const colorClass = getTrendColorClass(direction);
    
    if (direction === 'up') {
      return <ArrowUpRight className={`h-4 w-4 ${colorClass}`} />
    } else if (direction === 'down') {
      return <ArrowDownRight className={`h-4 w-4 ${colorClass}`} />
    }
    return <ArrowUpRight className={`h-4 w-4 ${colorClass}`} />
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
            <ExecutiveDashboard
              kpiMetrics={kpiMetrics}
              monthlyTrends={monthlyTrends}
              revenueByService={revenueByService}
              arAging={arAging}
              providerMetrics={providerMetrics}
            />
          </TabsContent>

          {/* Billing & Payments Tab - Simplified for now */}
          <TabsContent value="billing" className="space-y-6">
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
                </div>

                {/* Recent Transactions */}
                <div className="space-y-4">
                  <h3 className="text-md font-semibold">Recent Transactions</h3>
                  <div className="space-y-2">
                    {filteredTransactions.slice(0, 5).map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <CreditCard className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{transaction.patient}</div>
                            <div className="text-xs text-slate-600">{transaction.type} - {transaction.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-900">
                            {formatCurrency(transaction.amount)}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getStatusColor(transaction.status)}`}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Analytics Tab - Placeholder */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Analytics</CardTitle>
                <CardDescription>Advanced revenue insights and forecasting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Advanced Analytics</h3>
                  <p className="text-slate-600 mb-4">
                    Revenue forecasting and trend analysis features coming soon.
                  </p>
                  <Button variant="outline">
                    Request Early Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Reports Tab - Placeholder */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Reports</CardTitle>
                <CardDescription>Generate and manage financial reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Report Builder</h3>
                  <p className="text-slate-600 mb-4">
                    Custom report generation and automated scheduling features coming soon.
                  </p>
                  <Button variant="outline">
                    Request Early Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
