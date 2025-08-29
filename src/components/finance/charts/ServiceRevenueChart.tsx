import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatCurrency, formatPercentage } from '@/lib/utils/finance'
import type { RevenueByService } from '@/types/finance'

interface ServiceRevenueChartProps {
  data: RevenueByService[]
}

export default function ServiceRevenueChart({ data }: ServiceRevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Revenue by Service Type</CardTitle>
        <CardDescription>Current month service distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${formatPercentage(percentage)}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-1 gap-2 mt-4">
          {data.map((service, index) => (
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
  )
}
