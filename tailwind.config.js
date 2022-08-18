/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/components/**/*.tsx", "./pages/**/*.tsx"],
  important: true,
  theme: {
    extend: {
      screens: {
        // "2xl": { min: "1581px" },
        // xl: { min: "1200px", max: "1580px" },
        // lg: { min: "768px", max: "1199px" },
        // md: { max: "767px" },
        // "md-min": { min: "768px" },
        // sm: { max: "1023px" },
        // "sm-min": { min: "480px" },
        // s: { min: "360px", max: "375px" },
        xs: { max: "786px" }
      },
      height: {
        '400px': '400px',
      },
      width: {
        '400px': '400px',
        '100px': '100px'
      },
      fontSize: {
        '12px': '12px',
        '18px': '18px',
        '24px': '24px',
      },
      margin: {
        '100px': '100px',
      },
      padding: {
        '35px': '35px',
      }
    },
  },
  plugins: [],
}
