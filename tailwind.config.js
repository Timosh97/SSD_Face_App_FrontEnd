module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#EDF2F7",
        secondary: "#FFFFFF",
      },
      screens: {
        'andred': '900px',
      },
    },
  },
  plugins: [],
}
