/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deepPurple: "#430B8A",
        deepSpace: "#110928",
        nodeBase: "#1B0C42",
        nodeHighlight: "#2D186F",
        edgeBlue: "#5C60FF",
        handleSource: "#D05CFF",
        handleTarget: "#5CFFD0",
        toolbarBorder: "#7042C2",
        toolbarBg: "#2A1459",
        deepStart: "#1B0C42",
        deepMid: "#31156B",
        deepAccent: "#430B8A",
        nodeHover: "#512E8B",
        toolbarGradientFrom: "#1B0C42",
        toolbarGradientTo: "#31156B",
        borderGlow: "#7042C2",
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        casual: ["Quicksand", "sans-serif"],
        sans: ['"Feixen Sans"', "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
