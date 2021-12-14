module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "4/sm": "160px",
      "2/sm": "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      width: {
        "custom-31": "31.871429%",
        "custom-66": "66%"
      }
    }
  },
  variants: {
    extend: {
      width: ["even", "odd"],
      borderWidth: ["hover"]
    }
  },
  plugins: []
};
