module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
