export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], // base (SF Pro style)
        mont: ['Montserrat', 'sans-serif'], // headings
        inter: ['Inter', 'sans-serif'], // optional
      },
      colors: {
        primary: "#4F6EF7",
        secondary: "#6EE7F9",
      },
      extend: {
  screens: {
    '3xl': '1920px',
    '4xl': '2560px',
  }
}
    },
  },
  plugins: [],
};


/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}