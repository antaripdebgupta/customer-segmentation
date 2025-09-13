export const CUSTOMER_CLUSTERS = {
  total: 2500,
  totalRevenue: 1250000,
  segments: [
    {
      id: 1,
      name: 'High Value',
      description: 'Premium customers with high lifetime value and frequent purchases',
      size: 350,
      percentage: 14,
      revenue: 525000,
      color: '#3b82f6',
    },
    {
      id: 2,
      name: 'Regular',
      description: 'Consistent customers with moderate spending patterns',
      size: 800,
      percentage: 32,
      revenue: 400000,
      color: '#10b981',
    },
    {
      id: 3,
      name: 'Occasional',
      description: 'Infrequent buyers who make purchases sporadically',
      size: 950,
      percentage: 38,
      revenue: 237500,
      color: '#f59e0b',
    },
    {
      id: 4,
      name: 'At Risk',
      description: 'Previously active customers showing declining engagement',
      size: 400,
      percentage: 16,
      revenue: 87500,
      color: '#ef4444',
    },
  ],
};

export const CUSTOMER_SAMPLES = [
  { id: 1, name: 'John Smith', age: 34, cluster: 'High Value', totalSpent: 2500, orderCount: 15 },
  { id: 2, name: 'Sarah Johnson', age: 28, cluster: 'Regular', totalSpent: 850, orderCount: 8 },
  { id: 3, name: 'Mike Davis', age: 45, cluster: 'High Value', totalSpent: 3200, orderCount: 18 },
  { id: 4, name: 'Emma Wilson', age: 31, cluster: 'Occasional', totalSpent: 420, orderCount: 3 },
  { id: 5, name: 'Chris Brown', age: 39, cluster: 'Regular', totalSpent: 1200, orderCount: 12 },
  { id: 6, name: 'Lisa Anderson', age: 26, cluster: 'At Risk', totalSpent: 680, orderCount: 5 },
  { id: 7, name: 'David Miller', age: 52, cluster: 'High Value', totalSpent: 4100, orderCount: 22 },
  { id: 8, name: 'Amy Garcia', age: 29, cluster: 'Occasional', totalSpent: 290, orderCount: 2 },
];

export const SCATTER_PLOT_DATA = [
  { x: 4.2, y: 4.8, z: 3200, cluster: 'High Value' },
  { x: 2.5, y: 3.2, z: 850, cluster: 'Regular' },
  { x: 4.8, y: 4.5, z: 4100, cluster: 'High Value' },
  { x: 1.2, y: 2.1, z: 420, cluster: 'Occasional' },
  { x: 3.1, y: 3.8, z: 1200, cluster: 'Regular' },
  { x: 2.8, y: 2.4, z: 680, cluster: 'At Risk' },
  { x: 1.8, y: 1.9, z: 290, cluster: 'Occasional' },
  { x: 2.2, y: 2.8, z: 750, cluster: 'Regular' },
];

export const CHART_CONFIG = {
  defaultHeight: 400,
  tooltip: {
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    borderRadius: 8,
  },
};
