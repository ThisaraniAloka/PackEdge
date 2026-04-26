export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      colors: {
        'primary-green': '#639922',
        'dark-green': '#3B6D11',
        'light-green': '#EAF3DE',
        'dark-bg': '#1a1a1a',
      },
    },
  },
  plugins: [],
};
