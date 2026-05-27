/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        medical: {
          navy: "#0b2545",
          blue: "#1d7ed0",
          teal: "#0f766e",
          green: "#19a974",
          mist: "#eaf7f8",
          ink: "#122033",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 118, 110, 0.12)",
        card: "0 12px 34px rgba(11, 37, 69, 0.10)",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.75s ease both",
        marquee: "marquee 22s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
