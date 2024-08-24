const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#93C5FD', // A lighter blue for dark mode
          DEFAULT: '#3B82F6', // A vibrant blue as the main primary color
          dark: '#1D4ED8', // A darker blue for contrast
        },
        secondary: {
          light: '#A78BFA', // A lighter purple for dark mode
          DEFAULT: '#8B5CF6', // A vibrant purple as the main secondary color
          dark: '#6D28D9', // A darker purple for contrast
        },
        background: {
          light: '#1F2937', // Slightly lighter dark background
          DEFAULT: '#111827', // Main dark background
          dark: '#030712', // Very dark background for contrast
        },
        text: {
          light: '#F9FAFB', // Very light text for dark mode
          DEFAULT: '#D1D5DB', // Default text color for dark mode
          dark: '#6B7280', // Subdued text color for dark mode
        },
        accent: {
          light: '#34D399', // A lighter green for accents
          DEFAULT: '#10B981', // A vibrant green for accents
          dark: '#059669', // A darker green for contrast
        },
      },
    },
  },
  plugins: [require('daisyui')],
  darkMode: 'class', // This enables dark mode variant
};
