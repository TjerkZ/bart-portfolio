import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#1a1f2e',
        'ink-soft': '#3b4360',
        paper: '#fff8ef',
        accent: '#f0a868',
        'sky-top': '#a4d8ff',
        'sky-bot': '#fbd3b6',
      },
      boxShadow: {
        soft: '0 14px 30px -10px rgba(20,30,60,0.25), 0 4px 10px -4px rgba(20,30,60,0.15)',
        chip: '0 6px 16px -8px rgba(20,30,60,0.35), 0 2px 4px -2px rgba(20,30,60,0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;
