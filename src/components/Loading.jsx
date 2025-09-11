'use client';

import { motion } from 'framer-motion';

export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="mt-8 text-center">
      <motion.div
        className="flex items-center justify-center space-x-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* SVG Spinner */}
        <motion.svg
          className="h-6 w-6 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <circle
            className="stroke-gray-400 opacity-25 dark:stroke-gray-600"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
          />
          <path
            className="stroke-blue-500 opacity-90"
            strokeWidth="4"
            strokeLinecap="round"
            d="M12 2a10 10 0 0 1 10 10"
          />
        </motion.svg>

        {/* Animated Text */}
        <motion.span
          className="text-gray-600 dark:text-gray-300"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
}
