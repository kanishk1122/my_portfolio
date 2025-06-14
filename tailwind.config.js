/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "general-sans": ["General Sans", "sans-serif"],
        monument: ["Monument", "sans-serif"],
        aquire: ["Aquire", "sans-serif"],
      },
      animation: {
        "pulse-border": "pulse-border 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-border": {
          "0%, 100%": {
            borderColor: "rgba(59, 130, 246, 0.5)",
            boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.4)",
          },
          "50%": {
            borderColor: "rgba(59, 130, 246, 1)",
            boxShadow: "0 0 0 8px rgba(59, 130, 246, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
