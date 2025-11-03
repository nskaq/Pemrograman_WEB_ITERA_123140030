/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "ui-sans-serif", "system-ui"],
        mono: ["Space Mono", "ui-monospace", "SFMono-Regular"],
        jersey: ["Jersey 10", "ui-sans-serif"],
      },
      colors: {
        brand: {
          primary: "#B77466",
          soft: "#E2B59A",
          pale: "#FFE1AF",
          brown: "#957C62",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
