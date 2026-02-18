/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E31C25',
          blue: '#006AB4',
          yellow: '#FFC906',
          black: '#1a1a1a',
          offwhite: '#faf9f6',
        },
      },
      fontFamily: {
        brand: ['"Alfa Slab One"', 'serif'],
        slab: ['"Zilla Slab"', 'serif'],
        sans: ['"Public Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
