'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';
import {
  CUSTOMER_CLUSTERS,
  CUSTOMER_SAMPLES,
  SCATTER_PLOT_DATA,
} from '@/constants/clusterConstants';
import { Grid2x2, ChartColumnBig, Target } from 'lucide-react';

export default function ClusteringResultsPage() {
  const [selectedChart, setSelectedChart] = useState('pie');
  const [selectedCluster, setSelectedCluster] = useState('all');

  const pieData = CUSTOMER_CLUSTERS.segments.map((segment) => ({
    name: segment.name,
    value: segment.size,
    percentage: segment.percentage,
    color: segment.color,
  }));

  const barData = CUSTOMER_CLUSTERS.segments.map((segment) => ({
    cluster: segment.name,
    customers: segment.size,
    revenue: segment.revenue,
    color: segment.color,
  }));

  const filteredCustomers =
    selectedCluster === 'all'
      ? CUSTOMER_SAMPLES
      : CUSTOMER_SAMPLES.filter((customer) => {
          const cluster = CUSTOMER_CLUSTERS.segments.find((s) => s.name === selectedCluster);
          return customer.cluster === cluster?.name;
        });

  const chartButtons = [
    { key: 'pie', label: 'Distribution', icon: <Grid2x2 size={18} /> },
    { key: 'bar', label: 'Size Comparison', icon: <ChartColumnBig size={18} /> },
    { key: 'scatter', label: 'Behavior Map', icon: <Target size={18} /> },
  ];

  return (
    <div className="mx-auto mt-20 min-h-screen max-w-7xl p-4 transition-colors duration-300 sm:p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent sm:text-4xl">
          Customer Clustering Analysis
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          Discover patterns and segments in your customer base using AI-powered clustering
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {CUSTOMER_CLUSTERS.total.toLocaleString()} Total Customers
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-900 dark:text-green-300">
            {CUSTOMER_CLUSTERS.segments.length} Clusters Found
          </span>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            ${CUSTOMER_CLUSTERS.totalRevenue.toLocaleString()} Revenue
          </span>
        </div>
      </div>

      {/* Chart Selection */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {chartButtons.map((chart) => (
          <button
            key={chart.key}
            onClick={() => setSelectedChart(chart.key)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow transition-all duration-300 ${
              selectedChart === chart.key
                ? 'scale-105 bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {chart.icon}
            <span>{chart.label}</span>
          </button>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mb-8 rounded-2xl bg-white p-4 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:bg-gray-800/90 sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 sm:text-xl">
            {selectedChart === 'pie' && 'Cluster Distribution'}
            {selectedChart === 'bar' && 'Cluster Size Comparison'}
            {selectedChart === 'scatter' && 'Customer Behavior Mapping'}
          </h2>

          {selectedChart === 'scatter' && (
            <p className="text-center text-xs text-gray-600 dark:text-gray-400 sm:text-right sm:text-sm">
              X: Purchase Frequency • Y: Average Order Value • Size: Lifetime Value
            </p>
          )}
        </div>

        {/* Dynamic Chart */}
        <div className="h-[300px] w-full sm:h-[400px]">
          {selectedChart === 'pie' && (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="70%"
                  innerRadius="40%"
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    border: 'none',
                  }}
                  formatter={(value) => [`${value} customers`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'bar' && (
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="cluster" stroke="currentColor" tick={{ fontSize: 10 }} />
                <YAxis stroke="currentColor" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    color: '#ffffff',
                    borderRadius: 8,
                    border: 'none',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="customers" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'scatter' && (
            <ResponsiveContainer>
              <ScatterChart data={SCATTER_PLOT_DATA}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Purchase Frequency" domain={[0, 5]} />
                <YAxis type="number" dataKey="y" name="AOV Score" domain={[0, 5]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    border: 'none',
                  }}
                />
                <Scatter data={SCATTER_PLOT_DATA} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Cluster Filter */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCluster('all')}
          className={`rounded-xl px-3 py-2 text-xs sm:text-sm ${
            selectedCluster === 'all'
              ? 'bg-gray-800 text-white shadow'
              : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          All Customers
        </button>
        {CUSTOMER_CLUSTERS.segments.map((segment) => (
          <button
            key={segment.id}
            onClick={() => setSelectedCluster(segment.name)}
            className={`rounded-xl px-3 py-2 text-xs sm:text-sm ${
              selectedCluster === segment.name
                ? 'text-white shadow'
                : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
            }`}
            style={{
              backgroundColor: selectedCluster === segment.name ? segment.color : undefined,
            }}
          >
            {segment.name}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800/90">
        <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Customer Details
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                {selectedCluster === 'all' ? 'All customers' : `${selectedCluster} segment`} •{' '}
                {filteredCustomers.length} customers
              </p>
            </div>
            <button className="rounded-lg bg-blue-500 px-3 py-2 text-xs text-white hover:bg-blue-600 sm:text-sm">
              Export Data
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {['Customer', 'Cluster', 'Total Spent', 'Orders', 'AOV'].map((col) => (
                  <th
                    key={col}
                    className="px-3 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => {
                const cluster = CUSTOMER_CLUSTERS.segments.find((s) => s.name === customer.cluster);
                const aov = customer.totalSpent / customer.orderCount;

                return (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="flex items-center gap-3 whitespace-nowrap px-3 py-3 sm:px-6">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-10 sm:w-10"
                        style={{ backgroundColor: cluster?.color || '#6b7280' }}
                      >
                        {customer.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {customer.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Age: {customer.age}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 sm:px-6">
                      <span
                        className="inline-flex rounded-full px-2 py-1 text-xs font-semibold text-white"
                        style={{ backgroundColor: cluster?.color || '#6b7280' }}
                      >
                        {customer.cluster}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6">${customer.totalSpent.toLocaleString()}</td>
                    <td className="px-3 py-3 sm:px-6">{customer.orderCount}</td>
                    <td className="px-3 py-3 sm:px-6">${Math.round(aov).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cluster Insights Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {CUSTOMER_CLUSTERS.segments.map((segment) => (
          <div
            key={segment.id}
            className="rounded-xl bg-white p-4 shadow-lg transition hover:-translate-y-1 dark:bg-gray-800 sm:p-6"
            style={{ borderTop: `4px solid ${segment.color}` }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 sm:text-base">
                {segment.name}
              </h3>
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
            </div>
            <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">{segment.description}</p>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span>{segment.size.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Share:</span>
                <span>{segment.percentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Revenue:</span>
                <span>${segment.revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
