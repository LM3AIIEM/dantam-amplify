// 👉 Extract static data from finance component
// Purpose: Centralize mock financial data and data generation functions

import { 
  FinancialData, 
  KPIMetrics, 
  MonthlyTrend, 
  RevenueByService, 
  ARAgingPeriod,
  ProviderMetrics,
  Transaction,
  UpcomingPayment
} from '@/types/finance';

// KPI Metrics data
export const kpiMetrics: KPIMetrics = {
  monthlyRevenue: { current: 185420, target: 175000, previous: 168950 },
  collectionRate: { current: 94.2, target: 95.0, previous: 93.8 },
  outstandingAR: { current: 42350, target: 40000, previous: 45200 },
  averageDSO: { current: 28, target: 30, previous: 32 },
  netCollectionRatio: { current: 96.8, target: 97.0, previous: 95.9 },
  denialRate: { current: 4.2, target: 3.5, previous: 4.8 }
};

// Monthly trends for chart data
export const monthlyTrends: MonthlyTrend[] = [
  { month: 'Jan', revenue: 165000, collections: 158000, target: 170000 },
  { month: 'Feb', revenue: 172000, collections: 165000, target: 170000 },
  { month: 'Mar', revenue: 168000, collections: 162000, target: 170000 },
  { month: 'Apr', revenue: 175000, collections: 168000, target: 175000 },
  { month: 'May', revenue: 182000, collections: 175000, target: 175000 },
  { month: 'Jun', revenue: 185420, collections: 178500, target: 175000 }
];

// Revenue breakdown by service type
export const revenueByService: RevenueByService[] = [
  { name: 'Preventive Care', amount: 45230, percentage: 24.4, color: '#2563eb' },
  { name: 'Restorative', amount: 52180, percentage: 28.1, color: '#16a34a' },
  { name: 'Cosmetic', amount: 38920, percentage: 21.0, color: '#ea580c' },
  { name: 'Orthodontics', amount: 28450, percentage: 15.3, color: '#dc2626' },
  { name: 'Oral Surgery', amount: 20640, percentage: 11.1, color: '#64748b' }
];

// AR aging analysis data
export const arAging: ARAgingPeriod[] = [
  { period: '0-30 days', amount: 18250, percentage: 43.1 },
  { period: '31-60 days', amount: 12400, percentage: 29.3 },
  { period: '61-90 days', amount: 7200, percentage: 17.0 },
  { period: '90+ days', amount: 4500, percentage: 10.6 }
];

// Provider performance metrics
export const providerMetrics: ProviderMetrics[] = [
  { name: 'Dr. Sarah Johnson', production: 85420, collection: 82150, collectionRate: 96.2 },
  { name: 'Dr. Michael Chen', production: 72180, collection: 68890, collectionRate: 95.4 },
  { name: 'Dr. Emily Rodriguez', production: 68350, collection: 64200, collectionRate: 93.9 },
  { name: 'Dr. James Wilson', production: 45890, collection: 43420, collectionRate: 94.6 }
];

// Recent transaction records
export const recentTransactions: Transaction[] = [
  { id: 'TXN-2024-001', patient: 'John Smith', amount: 1250.00, type: 'Insurance Payment', status: 'Completed', date: '2024-08-07' },
  { id: 'TXN-2024-002', patient: 'Maria Garcia', amount: 420.00, type: 'Patient Payment', status: 'Completed', date: '2024-08-07' },
  { id: 'TXN-2024-003', patient: 'Robert Johnson', amount: 2180.00, type: 'Treatment Plan', status: 'Pending', date: '2024-08-06' },
  { id: 'TXN-2024-004', patient: 'Lisa Chen', amount: 650.00, type: 'Copay', status: 'Completed', date: '2024-08-06' },
  { id: 'TXN-2024-005', patient: 'David Wilson', amount: 890.00, type: 'Insurance Claim', status: 'Under Review', date: '2024-08-05' }
];

// Upcoming payment schedules
export const upcomingPayments: UpcomingPayment[] = [
  { patient: 'Jennifer Adams', amount: 125.00, dueDate: '2024-08-10', type: 'Payment Plan' },
  { patient: 'Michael Brown', amount: 750.00, dueDate: '2024-08-12', type: 'Treatment Balance' },
  { patient: 'Sarah Davis', amount: 200.00, dueDate: '2024-08-15', type: 'Payment Plan' },
  { patient: 'Thomas Miller', amount: 1200.00, dueDate: '2024-08-18', type: 'Insurance Deductible' }
];

// Generate complete financial data structure
export const generateFinancialData = (): FinancialData => {
  return {
    kpiMetrics,
    monthlyTrends,
    revenueByService,
    arAging,
    providerMetrics,
    recentTransactions,
    upcomingPayments
  };
};

// Additional chart data for analytics (forecasting)
export const forecastData = [
  ...monthlyTrends,
  { month: 'Jul', revenue: 192000, collections: 185000, target: 180000 },
  { month: 'Aug', revenue: 198000, collections: 191000, target: 185000 },
  { month: 'Sep', revenue: 203000, collections: 196000, target: 190000 }
];

// Treatment acceptance data
export const treatmentAcceptanceData = [
  { treatment: 'Preventive Care', acceptance: 96.2, revenue: 45230 },
  { treatment: 'Restorative', acceptance: 87.5, revenue: 52180 },
  { treatment: 'Cosmetic', acceptance: 72.8, revenue: 38920 },
  { treatment: 'Orthodontics', acceptance: 68.4, revenue: 28450 },
  { treatment: 'Oral Surgery', acceptance: 81.3, revenue: 20640 }
];

// Cost center analysis data
export const costCenterData = [
  { category: 'Staff Salaries', amount: 65000, percentage: 50.6 },
  { category: 'Supplies', amount: 28500, percentage: 22.2 },
  { category: 'Equipment', amount: 15200, percentage: 11.8 },
  { category: 'Facility', amount: 12800, percentage: 10.0 },
  { category: 'Marketing', amount: 4200, percentage: 3.3 },
  { category: 'Other', amount: 2800, percentage: 2.2 }
];

// Export all for barrel import
export const financeData = {
  kpiMetrics,
  monthlyTrends,
  revenueByService,
  arAging,
  providerMetrics,
  recentTransactions,
  upcomingPayments,
  forecastData,
  treatmentAcceptanceData,
  costCenterData
};
