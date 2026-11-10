/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf8eb',
          100: '#f6efcc',
          200: '#eddca0',
          300: '#e3c26d',
          400: '#d9a63c',
          500: '#d4af37', // signature warm gold
          600: '#b8861b',
          700: '#926317',
          800: '#774d1a',
          900: '#64401a',
        },
      },
      fontFamily: {
        jameel: ['"Jameel Noori Nastaleeq"', '"Noto Nastaliq Urdu"', 'Gulzar', 'serif'],
        nastaliq: ['"Jameel Noori Nastaleeq"', '"Noto Nastaliq Urdu"', 'Gulzar', 'serif'],
        lateefi: ['"MB Lateefi"', '"MB Amar Fayyaz"', '"MB Sindhi Web"', '"Noto Naskh Arabic"', 'serif'],
        sindhi: ['"MB Lateefi"', '"MB Amar Fayyaz"', '"MB Sindhi Web"', '"Noto Naskh Arabic"', 'serif'],
        amar: ['"MB Amar Fayyaz"', '"MB Lateefi"', 'serif'],
        naskh: ['"Noto Naskh Arabic"', 'Amiri', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
