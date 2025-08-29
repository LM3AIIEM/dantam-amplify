"use client"

import { useState, useMemo } from 'react'
import { 
  kpiMetrics,
  monthlyTrends,
  revenueByService,
  arAging,
  providerMetrics,
  recentTransactions,
  upcomingPayments
} from '@/lib/data/finance'
import type { Transaction } from '@/types/finance'

export type ActiveTab = 'dashboard' | 'billing' | 'analytics' | 'reports'
export type DateRange = 'current-month' | 'last-month' | 'quarter' | 'year-to-date' | 'custom'

interface UseFinanceState {
  // Navigation state
  activeTab: ActiveTab
  setActiveTab: (tab: string) => void
  
  // Search and filtering
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedDateRange: DateRange
  setSelectedDateRange: (range: DateRange) => void
  
  // Data access with filtering
  filteredTransactions: Transaction[]
  
  // All finance data
  data: {
    kpiMetrics: typeof kpiMetrics
    monthlyTrends: typeof monthlyTrends
    revenueByService: typeof revenueByService
    arAging: typeof arAging
    providerMetrics: typeof providerMetrics
    recentTransactions: typeof recentTransactions
    upcomingPayments: typeof upcomingPayments
  }
}

export function useFinance(): UseFinanceState {
  // State management
  const [activeTab, setActiveTabState] = useState<ActiveTab>('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>('current-month')

  // Filtered transactions based on search term
  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return recentTransactions
    
    const lowerSearchTerm = searchTerm.toLowerCase()
    return recentTransactions.filter(transaction =>
      transaction.patient.toLowerCase().includes(lowerSearchTerm) ||
      transaction.type.toLowerCase().includes(lowerSearchTerm) ||
      transaction.status.toLowerCase().includes(lowerSearchTerm) ||
      transaction.amount.toString().includes(searchTerm)
    )
  }, [searchTerm])

  // Wrapper function to handle tab changes with proper typing
  const setActiveTab = (tab: string) => {
    if (tab === 'dashboard' || tab === 'billing' || tab === 'analytics' || tab === 'reports') {
      setActiveTabState(tab as ActiveTab)
    }
  }

  return {
    // Navigation state
    activeTab,
    setActiveTab,
    
    // Search and filtering
    searchTerm,
    setSearchTerm,
    selectedDateRange,
    setSelectedDateRange,
    
    // Data access
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
  }
}
