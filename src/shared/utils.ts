// Format currency in Indian Rupees with Indian numbering system
export const formatINR = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(amount);
};

// Format number with Indian numbering system (lakhs, crores)
export const formatIndianNumber = (num: number): string => {
  const formatter = new Intl.NumberFormat('en-IN');
  return formatter.format(num);
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  // Already formatted Indian phone numbers
  return phone;
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};
