import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'warm-gray': '#DCD6D1',
      'drizzle': 'A4A29E',
      'black': '#000000',
      '286-c': '#0032A0',
      'orange-016-c': 'FF5600',
      'cloud-dancer': 'F1F0EC',
    },
    spacing: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      16: '64px',
      20: '80px',
      25: '100px',
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};
