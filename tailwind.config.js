/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@create-figma-plugin/ui/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '.figma-dark']
}
