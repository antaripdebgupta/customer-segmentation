'use client';

import { Crown, Target, Sprout, Trees, TrendingUp, CheckCircle } from 'lucide-react';

const COLORS = {
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
    id: 'cluster1',
    name: 'Premium Loyalists',
    color: COLORS.chartColors[0],
    icon: Crown,
    description: 'High-value customers with excellent lifetime value and strong brand loyalty',
    size: 450,
    percentage: 32.3,
    characteristics: [
      'High AOV ($185)',
      'Frequent purchases (15+ orders)',
      'Low churn risk (2%)',
      'Premium product preference',
    ],
    riskLevel: 'Low',
    growthPotential: 'High',
  },
  cluster2: {
    id: 'cluster2',
    name: 'Deal Hunters',
    color: COLORS.chartColors[1],
    icon: Target,
    description: 'Price-sensitive customers who respond excellently to promotions and discounts',
    size: 380,
    percentage: 27.2,
    characteristics: [
      'Price sensitive ($95 AOV)',
      'Promotional buyers',
      'Medium loyalty (8 orders avg)',
      'Discount seekers',
    ],
    riskLevel: 'Medium',
    growthPotential: 'Medium',
  },
  cluster3: {
    id: 'cluster3',
    name: 'Emerging Prospects',
    color: COLORS.chartColors[2],
    icon: Sprout,
    description: 'New customers with tremendous growth potential requiring strategic nurturing',
    size: 295,
    percentage: 21.1,
    characteristics: [
      'New customers (3 orders avg)',
      'Low purchase history ($65 AOV)',
      'High growth potential',
      'Need engagement',
    ],
    riskLevel: 'High',
    growthPotential: 'Very High',
  },
  cluster4: {
    id: 'cluster4',
    name: 'Seasonal Shoppers',
    color: COLORS.chartColors[3],
    icon: Trees,
    description: 'Predictable customers who shop during specific seasons, holidays, or events',
    size: 270,
    percentage: 19.4,
    characteristics: [
      'Seasonal patterns',
      'Event-driven purchases',
      'Predictable behavior',
      'Holiday focused ($135 AOV)',
    ],
    riskLevel: 'Medium',
    growthPotential: 'Low',
  },
};

export const getRecommendationsForCluster = (clusterId) => {
  const recommendations = {
    cluster1: [
      'VIP loyalty program with premium benefits and early access',
      'Provide personalized product recommendations based on purchase history',
      'Offer limited edition products and premium experiences',
      'Implement dedicated premium customer service with priority support',
      'Send personalized thank-you messages and milestone celebrations',
    ],
    cluster2: [
      'Send targeted flash sale notifications via email & SMS campaigns',
      'Create limited-time bundle offers with attractive volume discounts',
      'Implement dynamic retargeting for abandoned cart recovery',
      'Develop seasonal promotion campaigns with tiered discounts',
      'Use gamification with point-based reward systems',
    ],
    cluster3: [
      'Design comprehensive onboarding email sequences with education',
      'Offer substantial first-purchase incentives and welcome bonuses',
      'Implement referral programs to encourage word-of-mouth marketing',
      'Provide educational content about product benefits and usage',
      'Create engagement through social media and community building',
    ],
    cluster4: [
      'Create festival-specific marketing campaigns with themed content',
      'Develop seasonal product bundles with attractive themed packaging',
      'Send calendar-based reminders for upcoming seasonal events',
      'Offer pre-season early bird discounts and exclusive previews',
      'Track seasonal patterns to predict and prepare for peak periods',
    ],
  };
  return recommendations[clusterId] || [];
};

export const SUMMARY_SECTIONS = [
  {
    title: 'Focus Areas',
    icon: Target,
    items: [
      'Nurture Emerging Prospects (21.1% of base)',
      'Retain Premium Loyalists (highest LTV)',
      'Optimize Deal Hunter campaigns',
    ],
  },
  {
    title: 'Key Metrics',
    icon: TrendingUp,
    items: [
      '91.5% customer retention rate',
      '$125 average order value',
      '12.3% monthly growth rate',
    ],
  },
  {
    title: 'Action Items',
    icon: CheckCircle,
    items: [
      'Launch VIP program Q1 2025',
      'Implement AI-powered recommendations',
      'Optimize seasonal campaigns',
    ],
  },
];

export const KPI_CONFIG = [
  {
    key: 'revenue',
    label: 'Revenue Share',
    color: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-600',
    valueColor: 'text-blue-800',
  },
  {
    key: 'avgOrderValue',
    label: 'Avg Order Value',
    color: 'from-green-50 to-green-100',
    textColor: 'text-green-600',
    valueColor: 'text-green-800',
  },
  {
    key: 'size',
    label: 'Customer Count',
    color: 'from-purple-50 to-purple-100',
    textColor: 'text-purple-600',
    valueColor: 'text-purple-800',
    transform: (value) => value.split(' ')[0],
  },
  {
    key: 'growth',
    label: 'Growth Rate',
    color: 'from-orange-50 to-orange-100',
    textColor: 'text-orange-600',
    valueColor: (value) => (value.startsWith('+') ? 'text-green-800' : 'text-red-800'),
  },
];

export const QUICK_STATS = [
  { label: 'Customer Segments', value: '4', color: 'text-blue-600' },
  { label: 'Total Customers', value: '1,395', color: 'text-green-600' },
  { label: 'Total Revenue', value: '$365K', color: 'text-purple-600' },
];
