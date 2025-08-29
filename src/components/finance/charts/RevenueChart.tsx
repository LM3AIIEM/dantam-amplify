import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatCurrency } from '@/lib/utils/finance'
import type { MonthlyTrend } from '@/types/finance'

interface RevenueChartProps {
  data: MonthlyTrend[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Revenue Trend Analysis</CardTitle>
        <CardDescription>Monthly revenue vs targets and collections</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickFormatter={(value: number) => `$${value/1000}k`} 
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
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
  )
}
