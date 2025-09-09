/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	],
	darkMode: "class",
	theme: {
	  extend: {
		colors: {
		  background: 'var(--background)',
		  foreground: 'var(--foreground)',
		  dark: {
			200: '#0D0F10',
			300: '#020817',
			400: '#1A1D21',
			500: '#363A3D',
			600: '#76828D',
			700: '#ABB8C4',
			800: '#1F2937',
			900: '#111827',
		  },
		},
		fontFamily: {
		  sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
		  condiment: ['Condiment', 'sans-serif'],
		  bad: ['Bad Script', 'sans-serif'],
		  borel: ['Borel', 'sans-serif'],
		},
		screens: {
		  xs: '400px',
		  '3xl': '1680px',
		  '4xl': '2200px',
		},
	  },
	},
  };
  