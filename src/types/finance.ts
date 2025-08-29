// 👉 Extract types & schemas from finance page
// Purpose: Centralize TypeScript interfaces and types for financial management

// Core KPI metrics interface
export interface KPIMetrics {
  monthlyRevenue: KPIMetric;
  collectionRate: KPIMetric;
  outstandingAR: KPIMetric;
  averageDSO: KPIMetric;
  netCollectionRatio: KPIMetric;
  denialRate: KPIMetric;
}

// Individual KPI metric structure
export interface KPIMetric {
  current: number;
  target: number;
  previous: number;
}

// Monthly trend data for charts
export interface MonthlyTrend {
  month: string;
  revenue: number;
  collections: number;
  target: number;
}

// Revenue breakdown by service type
export interface RevenueByService {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

// Accounts receivable aging periods
export interface ARAgingPeriod {
  period: string;
  amount: number;
  percentage: number;
}

// Provider performance metrics
export interface ProviderMetrics {
  name: string;
  production: number;
  collection: number;
  collectionRate: number;
}

// Transaction records
export interface Transaction {
  id: string;
  patient: string;
  amount: number;
  type: string;
  status: string;
  date: string;
}

// Upcoming payments
export interface UpcomingPayment {
  patient: string;
  amount: number;
  dueDate: string;
  type: string;
}

// Complete financial data structure
export interface FinancialData {
  kpiMetrics: KPIMetrics;
  monthlyTrends: MonthlyTrend[];
  revenueByService: RevenueByService[];
  arAging: ARAgingPeriod[];
  providerMetrics: ProviderMetrics[];
  recentTransactions: Transaction[];
  upcomingPayments: UpcomingPayment[];
}

// State management interfaces
export interface FinanceFilters {
  searchTerm: string;
  selectedDateRange: string;
}

export interface FinanceState {
  activeTab: string;
  filters: FinanceFilters;
}

// UI-specific interfaces
export interface KPICardProps {
  title: string;
  value: string | number;
  target?: number;
  previous?: number;
  icon: React.ComponentType;
  format?: 'currency' | 'percentage' | 'number';
}

// Utility type unions
export type FinanceTab = 'dashboard' | 'billing' | 'analytics' | 'reports';
export type TransactionStatus = 'Completed' | 'Pending' | 'Under Review' | 'Overdue';
export type PaymentType = 'Insurance Payment' | 'Patient Payment' | 'Treatment Plan' | 'Copay' | 'Insurance Claim' | 'Payment Plan' | 'Treatment Balance' | 'Insurance Deductible';
