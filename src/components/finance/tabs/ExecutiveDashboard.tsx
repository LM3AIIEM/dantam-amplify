import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import KPIGrid from '../KPIGrid'
import RevenueChart from '../charts/RevenueChart'
import ServiceRevenueChart from '../charts/ServiceRevenueChart'
import { formatCurrency, formatPercentage } from '@/lib/utils/finance'
import type { 
  KPIMetrics, 
  MonthlyTrend, 
  RevenueByService, 
  ARAgingPeriod, 
  ProviderMetrics 
} from '@/types/finance'

interface ExecutiveDashboardProps {
  kpiMetrics: KPIMetrics
  monthlyTrends: MonthlyTrend[]
  revenueByService: RevenueByService[]
  arAging: ARAgingPeriod[]
  providerMetrics: ProviderMetrics[]
}

export default function ExecutiveDashboard({
  kpiMetrics,
  monthlyTrends,
  revenueByService,
  arAging,
  providerMetrics
}: ExecutiveDashboardProps) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KPIGrid kpiMetrics={kpiMetrics} providerMetrics={providerMetrics} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyTrends} />
        
        <ServiceRevenueChart data={revenueByService} />
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
              {arAging.map((period, index) => (
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
                  {arAging[3]?.percentage}% of AR is over 90 days old
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
              {providerMetrics.map((provider, index) => (
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
    </div>
  )
}
