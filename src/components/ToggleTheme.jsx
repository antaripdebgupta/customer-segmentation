'use client';

import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ToggleTheme = ({ onClick }) => {
  const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const initialDarkMode = storedTheme === 'dark';
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    const themeChangeEvent = new Event('theme-change');
    document.dispatchEvent(themeChangeEvent);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    tap: { scale: 0.8, rotate: 20 },
    hover: { scale: 1.1 },
  };

  const themeSwitchVariants = {
    enter: { opacity: 0, rotate: -90 },
    center: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 90 },
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-2 text-xl outline-2 focus:outline-blue-600"
      aria-label="toggle theme"
    >
      {isMobile ? (
        darkMode ? (
          <Sun className="text-yellow-500" />
        ) : (
          <Moon className="text-blue-400" />
        )
      ) : (
        <motion.div
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.span
                key="light"
                variants={themeSwitchVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <Sun className="text-yellow-500" />
              </motion.span>
            ) : (
              <motion.span
                key="dark"
                variants={themeSwitchVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <Moon className="text-blue-400" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </button>
  );
};

ToggleTheme.defaultProps = {
  onClick: () => {},
};

export default memo(ToggleTheme);
