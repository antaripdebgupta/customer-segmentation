'use client';

import { useState } from 'react';
import {
  CLUSTER_SEGMENTS,
  getRecommendationsForCluster,
  SUMMARY_SECTIONS,
  KPI_CONFIG,
  QUICK_STATS,
} from '@/constants/insightsConstants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle, Briefcase } from 'lucide-react';

const INSIGHTS_DATA = Object.keys(CLUSTER_SEGMENTS).map((key) => {
  const segment = CLUSTER_SEGMENTS[key];
  const revenueContribution =
    key === 'cluster1' ? 39.1 : key === 'cluster2' ? 23.4 : key === 'cluster3' ? 10.9 : 26.6;
  const avgOrderValue =
    key === 'cluster1' ? 185 : key === 'cluster2' ? 95 : key === 'cluster3' ? 65 : 135;
  const totalOrders =
    key === 'cluster1' ? 2850 : key === 'cluster2' ? 1950 : key === 'cluster3' ? 880 : 1350;

  return {
    cluster: segment.name,
    color: segment.color,
    kpi: {
      revenue: `${revenueContribution}%`,
      avgOrderValue: `$${avgOrderValue}`,
      size: `${segment.size} customers`,
      orders: totalOrders,
      growth:
        key === 'cluster3'
          ? '+25.4%'
          : key === 'cluster1'
            ? '+15.2%'
            : key === 'cluster2'
              ? '+8.7%'
              : '-5.2%',
    },
    description: segment.description,
    characteristics: segment.characteristics,
    recommendations: getRecommendationsForCluster(key),
    riskLevel: segment.riskLevel,
    growthPotential: segment.growthPotential,
    priority: key === 'cluster3' ? 'High' : key === 'cluster1' ? 'High' : 'Medium',
  };
});

export default function InsightsPage() {
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [filterByPriority, setFilterByPriority] = useState('all');

  const cluster = CLUSTER_SEGMENTS[selectedCluster];

  const filteredInsights =
    filterByPriority === 'all'
      ? INSIGHTS_DATA
      : INSIGHTS_DATA.filter((insight) => insight.priority === filterByPriority);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'High':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="mt-20 min-h-screen">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
            Customer Insights & Strategic Recommendations
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Deep dive into customer behavior patterns, actionable insights, and data-driven
            recommendations to maximize engagement and revenue growth across all segments.
          </p>

          {/* Quick Stats */}
          <div className="mb-8 flex flex-wrap justify-center gap-6">
            {QUICK_STATS.map((stat, index) => (
              <Card
                key={index}
                className="rounded-2xl bg-white/70 shadow-lg backdrop-blur dark:bg-white"
              >
                <CardContent className="px-6 py-3">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-6 flex justify-center">
          <div className="flex flex-row items-center gap-3 rounded-xl bg-slate-200 shadow-xl sm:gap-6">
            {['all', 'High', 'Medium'].map((priority) => (
              <button
                key={priority}
                onClick={() => setFilterByPriority(priority)}
                className={`w-full rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out sm:w-auto ${
                  filterByPriority === priority
                    ? 'scale-105 bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-xl'
                    : 'text-gray-700 hover:scale-105 hover:bg-gray-100'
                }`}
              >
                {priority === 'all' ? 'All Segments' : `${priority} Priority`}
              </button>
            ))}
          </div>
        </div>

        {/*Insights Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredInsights.map((insight, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl border-2 border-transparent bg-white/80 p-8 shadow-xl backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-white ${
                selectedCluster === index ? 'border-blue-500 ring-4 ring-blue-200' : ''
              }`}
              onClick={() => setSelectedCluster(selectedCluster === index ? null : index)}
            >
              {/* Decorative Elements */}
              <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 transform rounded-full bg-gradient-to-bl from-blue-100 to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 h-16 w-16 -translate-x-6 translate-y-6 transform rounded-full bg-gradient-to-tr from-purple-100 to-transparent opacity-50"></div>

              {/* Header Section */}
              <div className="relative z-10 mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="transform text-4xl transition-transform duration-200 group-hover:scale-110">
                      {insight.icon}
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-gray-800"
                        style={{ color: insight.color }}
                      >
                        {insight.cluster}
                      </h2>
                      <div className="mt-1 flex items-center space-x-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getRiskColor(insight.riskLevel)}`}
                        >
                          Risk: {insight.riskLevel}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(insight.priority)}`}
                        >
                          {insight.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Growth Potential</div>
                    <div
                      className={`text-lg font-bold ${
                        insight.growthPotential === 'Very High'
                          ? 'text-green-600'
                          : insight.growthPotential === 'High'
                            ? 'text-blue-600'
                            : insight.growthPotential === 'Medium'
                              ? 'text-yellow-600'
                              : 'text-gray-600'
                      }`}
                    >
                      {insight.growthPotential}
                    </div>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {KPI_CONFIG.map((config, i) => (
                    <Card
                      key={i}
                      className={`rounded-xl bg-gradient-to-br ${config.color} border-0 p-3 text-center`}
                    >
                      <CardContent className="p-0">
                        <div className={`text-xs font-medium ${config.textColor}`}>
                          {config.label}
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            typeof config.valueColor === 'function'
                              ? config.valueColor(insight.kpi[config.key])
                              : config.valueColor
                          }`}
                        >
                          {config.transform
                            ? config.transform(insight.kpi[config.key])
                            : insight.kpi[config.key]}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-base leading-relaxed text-gray-700">{insight.description}</p>
              </div>

              {/* Characteristics */}
              <div className="mb-6">
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  Key Characteristics
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {insight.characteristics.map((char, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: insight.color }}
                      ></div>
                      <span className="text-gray-700">{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div
                className={`transition-all duration-300 ${
                  selectedCluster === index
                    ? 'max-h-[400px] overflow-y-auto'
                    : 'max-h-32 overflow-hidden'
                }`}
              >
                <h3 className="mb-2 flex items-center text-lg font-semibold text-gray-800">
                  Strategic Recommendations
                  {selectedCluster !== index && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                      Click to expand
                    </span>
                  )}
                </h3>
                <div className="space-y-2">
                  {insight.recommendations
                    .slice(0, selectedCluster === index ? undefined : 2)
                    .map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                      >
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white">
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700">{rec}</p>
                      </div>
                    ))}
                  {selectedCluster !== index && insight.recommendations.length > 2 && (
                    <div className="text-center">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-gray-500">
                        +{insight.recommendations.length - 2} more recommendations
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Indicators */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex flex-row justify-center gap-2 text-center">
                    <Briefcase /> {insight.kpi.orders.toLocaleString()} total orders
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      insight.priority === 'High' ? 'animate-pulse bg-red-500' : 'bg-yellow-500'
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {insight.priority} Priority Action
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="rounded-3xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
          <CardHeader className="mb-6 p-0 text-center">
            <CardTitle className="mb-3 flex items-center justify-center text-3xl font-bold">
              <TrendingUp className="mr-2 h-8 w-8" />
              Executive Summary
            </CardTitle>
            <p className="text-lg text-blue-100">
              Key takeaways and next steps for optimal customer segment management
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {SUMMARY_SECTIONS.map((section, index) => (
                <Card key={index} className="rounded-2xl border-0 bg-white/10 p-6 backdrop-blur">
                  <CardHeader className="mb-3 p-0">
                    <CardTitle className="flex items-center text-xl font-bold text-white">
                      <section.icon className="mr-2 h-6 w-6" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="space-y-2 text-blue-100">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
