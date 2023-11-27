import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'warm-gray': '#DCD6D1',
      'drizzle': '#A4A29E',
      'black': '#000000',
      '286-c': '#0032A0',
      'orange-016-c': '#FF5600',
      'cloud-dancer': '#F1F0EC',
    },
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      16: '4rem',
      20: '5rem',
      25: '6.25rem',
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};
