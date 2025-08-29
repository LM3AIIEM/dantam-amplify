// 👉 Extract utility functions from finance component
// Purpose: Pure helper functions for financial business logic

// Calculation functions
export const calculatePercentageChange = (current: number, previous: number): string => {
  return ((current - previous) / previous * 100).toFixed(1);
};

// Formatting functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatCurrencyWithDecimals = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Status/UI helper functions
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'under review':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Trend direction helpers (returns string instead of JSX)
export const getTrendDirection = (current: number, target: number): 'up' | 'down' | 'neutral' => {
  if (current > target) return 'up';
  if (current < target) return 'down';
  return 'neutral';
};

export const getTrendColorClass = (direction: 'up' | 'down' | 'neutral'): string => {
  switch (direction) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

// Validation functions
export const isValidTransaction = (transaction: unknown): boolean => {
  return Boolean(transaction && 
         typeof transaction === 'object' &&
         transaction !== null &&
         (transaction as Record<string, unknown>).id && 
         (transaction as Record<string, unknown>).patient && 
         (transaction as Record<string, unknown>).amount && 
         (transaction as Record<string, unknown>).type && 
         (transaction as Record<string, unknown>).status);
};

export const isValidKPIMetric = (metric: unknown): boolean => {
  return Boolean(metric && 
         typeof metric === 'object' &&
         metric !== null &&
         typeof (metric as Record<string, unknown>).current === 'number' && 
         typeof (metric as Record<string, unknown>).target === 'number' && 
         typeof (metric as Record<string, unknown>).previous === 'number');
};

// Business logic functions
export const calculateCollectionEfficiency = (collected: number, billed: number): number => {
  if (billed === 0) return 0;
  return (collected / billed) * 100;
};

export const calculateDSO = (arBalance: number, dailyAvgCharges: number): number => {
  if (dailyAvgCharges === 0) return 0;
  return arBalance / dailyAvgCharges;
};

export const calculateVariance = (actual: number, budget: number): number => {
  return actual - budget;
};

export const calculateVariancePercentage = (actual: number, budget: number): number => {
  if (budget === 0) return 0;
  return ((actual - budget) / budget) * 100;
};

// Chart formatting helpers
export const formatChartValue = (value: number, type: 'currency' | 'percentage' | 'number' = 'currency'): string => {
  switch (type) {
    case 'currency':
      return formatCurrency(value);
    case 'percentage':
      return formatPercentage(value);
    case 'number':
      return value.toString();
    default:
      return formatCurrency(value);
  }
};

export const formatChartAxisValue = (value: number): string => {
  return `${value/1000}k`;
};

// Date and time utilities
export const isOverdue = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  return due < today;
};

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Financial analysis helpers
export const categorizeARAge = (days: number): string => {
  if (days <= 30) return '0-30 days';
  if (days <= 60) return '31-60 days';
  if (days <= 90) return '61-90 days';
  return '90+ days';
};

export const calculateROI = (gain: number, cost: number): number => {
  if (cost === 0) return 0;
  return ((gain - cost) / cost) * 100;
};

export const calculateGrossMargin = (revenue: number, costs: number): number => {
  if (revenue === 0) return 0;
  return ((revenue - costs) / revenue) * 100;
};
