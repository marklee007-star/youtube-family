import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: '#ffc0c0',
          light: '#ffe0e0',
          dark: '#ff9090',
        },
        brown: {
          primary: '#c45f3f',
          light: '#d4845f',
          dark: '#a04520',
        },
        yellow: {
          accent: '#d6d35f',
          light: '#e8e68a',
          dark: '#b0ad30',
        },
        bg: '#fff6f3',
      },
      fontFamily: {
        sans: ['Prompt', 'Noto Sans Thai', 'sans-serif'],
        display: ['Mitr', 'Prompt', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(196, 95, 63, 0.1)',
        'soft-lg': '0 8px 40px rgba(196, 95, 63, 0.15)',
        card: '0 2px 12px rgba(196, 95, 63, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
