'use client';

import { Target, Sprout, Gift } from 'lucide-react';

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  warning: '#f97316',
  info: '#06b6d4',
  success: '#22c55e',
  chartColors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'],
};

export const CLUSTER_SEGMENTS = {
  cluster1: {
    name: 'Premium Loyalists',
    color: COLORS.chartColors[0],
    icon: Crown, // Lucide icon
    size: 450,
    percentage: 32.3,
  },
  cluster2: {
    name: 'Deal Hunters',
    color: COLORS.chartColors[1],
    icon: Target,
    size: 380,
    percentage: 27.2,
  },
  cluster3: {
    name: 'Emerging Prospects',
    color: COLORS.chartColors[2],
    icon: Sprout,
    size: 295,
    percentage: 21.1,
  },
  cluster4: {
    name: 'Seasonal Shoppers',
    color: COLORS.chartColors[3],
    icon: Gift,
    size: 270,
    percentage: 19.4,
  },
};

export const MOCK_DATA = {
  clusterDistribution: Object.values(CLUSTER_SEGMENTS).map((segment) => ({
    name: segment.name,
    value: segment.size,
    percentage: segment.percentage,
    color: segment.color,
    icon: segment.icon,
  })),

  revenueData: [
    { cluster: 'Premium Loyalists', revenue: 125000, orders: 2850, aov: 185, growth: 15.2 },
    { cluster: 'Deal Hunters', revenue: 75000, orders: 1950, aov: 95, growth: 8.7 },
    { cluster: 'Emerging Prospects', revenue: 35000, orders: 880, aov: 65, growth: 25.4 },
    { cluster: 'Seasonal Shoppers', revenue: 85000, orders: 1350, aov: 135, growth: -5.2 },
  ],

  growthData: [
    { month: 'Jan', customers: 1100, revenue: 285000, orders: 3200, conversionRate: 3.2 },
    { month: 'Feb', customers: 1180, revenue: 298000, orders: 3450, conversionRate: 3.4 },
    { month: 'Mar', customers: 1250, revenue: 315000, orders: 3680, conversionRate: 3.6 },
    { month: 'Apr', customers: 1320, revenue: 332000, orders: 3920, conversionRate: 3.8 },
    { month: 'May', customers: 1395, revenue: 348000, orders: 4180, conversionRate: 4.1 },
    { month: 'Jun', customers: 1450, revenue: 365000, orders: 4450, conversionRate: 4.3 },
  ],

  topProducts: [
    {
      product: 'Wireless Headphones Pro',
      sales: 2850,
      revenue: '$285,000',
      margin: '45%',
      category: 'Electronics',
      trend: 'up',
    },
    {
      product: 'Premium Coffee Blend',
      sales: 2100,
      revenue: '$189,000',
      margin: '60%',
      category: 'Food & Beverage',
      trend: 'up',
    },
    {
      product: 'Designer Laptop Bag',
      sales: 1750,
      revenue: '$175,000',
      margin: '55%',
      category: 'Accessories',
      trend: 'stable',
    },
    {
      product: 'Organic Skincare Set',
      sales: 1450,
      revenue: '$145,000',
      margin: '65%',
      category: 'Beauty',
      trend: 'up',
    },
    {
      product: 'Smart Fitness Tracker',
      sales: 1250,
      revenue: '$125,000',
      margin: '40%',
      category: 'Electronics',
      trend: 'down',
    },
  ],

  weeklyData: [
    { day: 'Mon', orders: 145, revenue: 18500 },
    { day: 'Tue', orders: 167, revenue: 21200 },
    { day: 'Wed', orders: 189, revenue: 24100 },
    { day: 'Thu', orders: 156, revenue: 19800 },
    { day: 'Fri', orders: 201, revenue: 25600 },
    { day: 'Sat', orders: 234, revenue: 29800 },
    { day: 'Sun', orders: 198, revenue: 25200 },
  ],
};

export const KPI_METRICS = {
  totalCustomers: 1450,
  totalRevenue: 365000,
  averageOrderValue: 125,
  churnRate: 8.5,
  customerAcquisitionCost: 45,
  customerLifetimeValue: 1850,
  monthlyGrowthRate: 12.3,
  retentionRate: 91.5,
  conversionRate: 4.3,
  repeatCustomerRate: 68.2,
};

// src/constants/dashboardConfig.js
import {
  Users,
  Crown,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  BarChart3,
} from 'lucide-react';

// Filter buttons configuration
export const filterButtons = [
  { key: 'all', label: 'All Customers', icon: Users },
  { key: 'high-value', label: 'High Value', icon: Crown },
  { key: 'low-engagement', label: 'Low Engagement', icon: TrendingDown },
  { key: 'at-risk', label: 'At Risk', icon: AlertTriangle },
];

// Time range options
export const timeRangeOptions = [
  { value: '30d', label: 'Last 30 Days' },
  { value: '3m', label: 'Last 3 Months' },
  { value: '6m', label: 'Last 6 Months' },
  { value: '1y', label: 'Last Year' },
];

// KPI cards configuration (pass KPI_METRICS as argument for flexibility)
export const getKpiCards = (KPI_METRICS) => [
  {
    label: 'Total Customers',
    value: KPI_METRICS.totalCustomers.toLocaleString(),
    change: '+12.3%',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Total Revenue',
    value: `$${(KPI_METRICS.totalRevenue / 1000).toFixed(0)}K`,
    change: '+18.5%',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    label: 'Avg Order Value',
    value: `$${KPI_METRICS.averageOrderValue}`,
    change: '+5.2%',
    icon: ShoppingCart,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    label: 'Conversion Rate',
    value: `${KPI_METRICS.conversionRate}%`,
    change: '+0.8%',
    icon: BarChart3,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    label: 'Churn Risk',
    value: `${KPI_METRICS.churnRate}%`,
    change: '-2.1%',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    isNegative: true,
  },
];

// Metric selector options
export const metricOptions = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'customers', label: 'Customers' },
  { key: 'orders', label: 'Orders' },
];
