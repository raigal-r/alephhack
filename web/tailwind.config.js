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
      fontFamily: {
        sans: ['VT323', 'DotGothic16', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#000000', // Black for primary text and UI elements
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White for secondary elements
        },
        background: {
          DEFAULT: '#FFFFFF', // White for main background
        },
        text: {
          DEFAULT: '#000000', // Black for most text
        },
        accent: {
          green: '#4CAF50', // Green for Pepe meme images
          yellow: '#FFF59D', // Light yellow for some card backgrounds
          pink: '#FFCCCB', // Light pink for some card backgrounds
        },
        button: {
          DEFAULT: '#000000', // Black for button backgrounds
          text: '#FFFFFF', // White for button text
        },
      },
    },
  },
  plugins: [require('daisyui')],
  darkMode: 'class', // This enables dark mode variant
};
