import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LucideIcon } from 'lucide-react'
import { 
  calculatePercentageChange, 
  formatCurrency, 
  formatPercentage, 
  getTrendDirection,
  getTrendColorClass
} from '@/lib/utils/finance'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface KPICardProps {
  title: string
  icon: LucideIcon
  current: number
  previous?: number
  target?: number
  type: 'currency' | 'percentage' | 'number'
  description?: string
  showProgress?: boolean
  trendLabel?: string
  industryAverage?: number
  customTrend?: React.ReactNode
}

export default function KPICard({
  title,
  icon: Icon,
  current,
  previous,
  target,
  type,
  description,
  showProgress = false,
  trendLabel,
  industryAverage,
  customTrend
}: KPICardProps) {
  
  // Format the main value based on type
  const formatValue = (value: number) => {
    switch (type) {
      case 'currency':
        return formatCurrency(value)
      case 'percentage':
        return formatPercentage(value)
      default:
        return value.toString()
    }
  }

  // Calculate trend information
  const renderTrend = () => {
    if (customTrend) {
      return customTrend
    }

    if (previous !== undefined) {
      const changePercent = calculatePercentageChange(current, previous)
      const direction = getTrendDirection(current, previous)
      const colorClass = getTrendColorClass(direction)
      
      const TrendIcon = direction === 'up' ? ArrowUpRight : ArrowDownRight
      
      return (
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <TrendIcon className={`h-4 w-4 ${colorClass}`} />
          <span>
            {trendLabel || `${changePercent}% ${direction === 'up' ? 'increase' : 'decrease'}`}
          </span>
        </div>
      )
    }

    return null
  }

  // Calculate progress value if target exists
  const progressValue = target ? (current / target) * 100 : current

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-slate-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">
          {formatValue(current)}
        </div>
        
        {renderTrend()}
        
        {showProgress && (
          <div className="mt-2">
            <Progress 
              value={progressValue} 
              className="h-2"
            />
            {target && (
              <p className="text-xs text-slate-500 mt-1">
                Target: {formatValue(target)}
              </p>
            )}
            {industryAverage && (
              <p className="text-xs text-slate-500 mt-1">
                Industry avg: {formatValue(industryAverage)}
              </p>
            )}
          </div>
        )}
        
        {description && (
          <div className="mt-2">
            <div className="text-xs text-slate-500">
              {description}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
