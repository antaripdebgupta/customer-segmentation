'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Users, BarChart3, ShoppingCart } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Customer Segmentation',
    description:
      'Automatically group customers into meaningful clusters based on purchase behavior.',
    color: 'text-blue-500',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Insights',
    description:
      'Analyze shopping patterns to create personalized campaigns and improve retention.',
    color: 'text-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Interactive Dashboards',
    description:
      'Visualize customer clusters with real-time, interactive dashboards powered by ML.',
    color: 'text-indigo-500',
  },
];

export default function Hero() {
  return (
    <section className="relative mt-20 flex min-h-screen w-full flex-col items-center justify-center px-6 text-center dark:bg-dark-900 dark:text-white sm:mt-0 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Smarter Segmentation with{' '}
          <span className="bg-gradient-to-r from-blue-500 via-emerald-500 to-indigo-500 bg-clip-text text-transparent">
            ClusterCart
          </span>
        </h1>
        <p className="text-md mt-4 px-2 leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-lg md:text-xl">
          Unlock hidden patterns in your e-commerce data. ClusterCart helps you understand
          customers, personalize marketing, and drive growth with machine learning.
        </p>

        <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <Link href="/upload" passHref className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full rounded-2xl px-6 py-3 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Upload Data
            </Button>
          </Link>
          <Link href="/clusters" passHref className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-lg px-6 py-3 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-900 sm:text-lg"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Explore Segments
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-14 grid w-full max-w-7xl grid-cols-1 gap-6 px-2 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="rounded-xl border bg-white text-left shadow-md dark:bg-gray-900"
          >
            <CardContent className="p-5 sm:p-6">
              <feature.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${feature.color} mb-3`} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-md mt-2 text-gray-600 dark:text-gray-300 sm:text-lg">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
