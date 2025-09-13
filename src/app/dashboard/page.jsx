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
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight, Target, Crown, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  filterButtons,
  timeRangeOptions,
  metricOptions,
  getKpiCards,
} from '@/constants/dataConstants';
import { COLORS, MOCK_DATA, KPI_METRICS } from '@/constants/dataConstants';

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const kpiCards = getKpiCards(KPI_METRICS);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border-gray-600 bg-gray-800 text-white">
          <CardContent className="p-3">
            <p className="font-semibold">{label}</p>
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}:{' '}
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </p>
            ))}
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  const getTrendIcon = (trend) => {
    const iconProps = { size: 24, className: 'text-current' };
    switch (trend) {
      case 'up':
        return <TrendingUp {...iconProps} />;
      case 'down':
        return <TrendingDown {...iconProps} />;
      default:
        return <ArrowRight {...iconProps} />;
    }
  };

  const filteredData =
    selectedFilter === 'all' ? MOCK_DATA.growthData : MOCK_DATA.growthData.slice(-3);

  return (
    <div className="mt-20 min-h-screen dark:bg-dark-900">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-10 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time insights into your customer segments and business performance
          </p>
          <Badge variant="secondary" className="mt-4">
            Last updated: {new Date().toLocaleString()} • Live Data
          </Badge>
        </div>

        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:gap-6 lg:flex-row lg:justify-between">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {filterButtons.map((filter) => {
              const IconComponent = filter.icon;
              const isSelected = selectedFilter === filter.key;
              return (
                <Button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  variant="outline"
                  className={`flex items-center text-sm transition-all duration-200 ${
                    isSelected
                      ? 'scale-105 bg-blue-600 text-white shadow-lg dark:bg-blue-500 dark:text-gray-100 dark:hover:bg-blue-600'
                      : 'bg-white text-gray-700 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  } `}
                >
                  <IconComponent className="mr-1 h-4 w-4" />
                  {filter.label}
                </Button>
              );
            })}
          </div>

          {/*Range Selector */}
          <div className="flex w-full justify-center sm:w-auto">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[200px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {kpiCards.map((kpi, i) => {
            const IconComponent = kpi.icon;
            return (
              <Card
                key={i}
                className="relative transform overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-90`} />
                <CardContent className="relative p-6 text-white">
                  <div className="mb-3 flex items-center justify-between">
                    <IconComponent className="h-8 w-8" />
                    <Badge
                      variant="secondary"
                      className={`${kpi.isNegative ? 'bg-green-400 text-green-900' : 'bg-white/20 text-white'}`}
                    >
                      {kpi.change}
                    </Badge>
                  </div>
                  <p className="mb-1 text-sm opacity-90">{kpi.label}</p>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                  <div className="absolute right-0 top-0 h-20 w-20 -translate-y-8 translate-x-8 transform rounded-full bg-white/10" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Customer Distribution */}
          <Card className="backdrop-blur xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Customer Segments
                </div>
                <Badge variant="outline" className="dark:text-white">
                  {MOCK_DATA.clusterDistribution.reduce((sum, item) => sum + item.value, 0)} total
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={MOCK_DATA.clusterDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={3}
                    label={({ name, percentage }) => `${percentage}%`}
                  >
                    {MOCK_DATA.clusterDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-2">
                {MOCK_DATA.clusterDistribution.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <IconComponent size={16} className="text-gray-700 dark:text-gray-300" />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trends */}
          <Card className="backdrop-blur xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Revenue & Growth Trends
                </div>
                <div className="flex gap-2">
                  {metricOptions.map((metric) => (
                    <Button
                      key={metric.key}
                      onClick={() => setSelectedMetric(metric.key)}
                      variant={selectedMetric === metric.key ? 'default' : 'outline'}
                      size="sm"
                      className="text-blue-500"
                    >
                      {metric.label}
                    </Button>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Cluster & Weekly Performance */}
        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="mr-2 h-5 w-5" />
                Revenue by Segment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MOCK_DATA.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="cluster"
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                    {MOCK_DATA.revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.chartColors[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Weekly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={MOCK_DATA.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products Table */}
        <Card className="backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Top Performing Products
              </div>
              <Badge variant="outline" className="dark:text-white">
                Showing top 5 products by revenue
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300">
                    {['Product', 'Category', 'Sales', 'Revenue', 'Margin', 'Trend'].map(
                      (header) => (
                        <TableHead
                          key={header}
                          className={`pb-3 font-semibold ${
                            header === 'Product' || header === 'Category'
                              ? 'text-left'
                              : header === 'Trend'
                                ? 'text-center'
                                : 'text-right'
                          } text-xs sm:text-sm`} // smaller font for headers on mobile
                        >
                          {header}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {MOCK_DATA.topProducts.map((item, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                    >
                      <TableCell className="py-3 sm:py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
                            {index + 1}
                          </div>
                          <div className="text-sm font-semibold text-gray-800 dark:text-white sm:text-base">
                            {item.product}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-3 sm:py-4">{item.category}</TableCell>

                      <TableCell className="py-2 text-right text-xs font-semibold text-gray-800 dark:text-white sm:py-4 sm:text-sm">
                        {item.sales.toLocaleString()}
                      </TableCell>

                      <TableCell className="py-2 text-right text-xs font-bold text-green-600 sm:py-4 sm:text-sm">
                        {item.revenue}
                      </TableCell>

                      <TableCell className="py-2 text-right text-xs font-semibold text-blue-600 sm:py-4 sm:text-sm">
                        {item.margin}
                      </TableCell>

                      <TableCell className="py-2 text-center text-xs sm:py-4 sm:text-sm">
                        {getTrendIcon(item.trend)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
