import React from 'react'
import { 
  DollarSign, 
  Target, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Users 
} from 'lucide-react'
import KPICard from './KPICard'
import type { KPIMetrics, ProviderMetrics } from '@/types/finance'

interface KPIGridProps {
  kpiMetrics: KPIMetrics
  providerMetrics: ProviderMetrics[]
}

export default function KPIGrid({ kpiMetrics, providerMetrics }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Monthly Revenue */}
      <KPICard
        title="Monthly Revenue"
        icon={DollarSign}
        current={kpiMetrics.monthlyRevenue.current}
        previous={kpiMetrics.monthlyRevenue.previous}
        target={kpiMetrics.monthlyRevenue.target}
        type="currency"
        showProgress
        trendLabel="vs last month"
      />

      {/* Collection Rate */}
      <KPICard
        title="Collection Rate"
        icon={Target}
        current={kpiMetrics.collectionRate.current}
        previous={kpiMetrics.collectionRate.previous}
        target={kpiMetrics.collectionRate.target}
        type="percentage"
        showProgress
        trendLabel={`+${(kpiMetrics.collectionRate.current - kpiMetrics.collectionRate.previous).toFixed(1)}% improvement`}
      />

      {/* Outstanding AR */}
      <KPICard
        title="Outstanding AR"
        icon={Clock}
        current={kpiMetrics.outstandingAR.current}
        previous={kpiMetrics.outstandingAR.previous}
        type="currency"
        description={`Average DSO: ${kpiMetrics.averageDSO.current} days`}
        trendLabel="reduction"
      />

      {/* Net Collection Ratio */}
      <KPICard
        title="Net Collection Ratio"
        icon={TrendingUp}
        current={kpiMetrics.netCollectionRatio.current}
        type="percentage"
        showProgress
        industryAverage={94.5}
        customTrend={
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span>Above industry average</span>
          </div>
        }
      />

      {/* Claim Denial Rate */}
      <KPICard
        title="Claim Denial Rate"
        icon={AlertTriangle}
        current={kpiMetrics.denialRate.current}
        previous={kpiMetrics.denialRate.previous}
        target={kpiMetrics.denialRate.target}
        type="percentage"
        trendLabel={`-${(kpiMetrics.denialRate.previous - kpiMetrics.denialRate.current).toFixed(1)}% improvement`}
      />

      {/* Top Producer */}
      <KPICard
        title="Top Producer"
        icon={Users}
        current={providerMetrics[0].production}
        type="currency"
        description={providerMetrics[0].name}
        customTrend={
          <div className="text-xs text-slate-600">
            Collection Rate: {(providerMetrics[0].collectionRate * 100).toFixed(1)}%
          </div>
        }
      />
    </div>
  )
}
