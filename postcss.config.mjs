const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          fontFamily: {
            sans: ["var(--font-poppins)", "sans-serif"],
          },
          colors: {
            // primary: "#1E40AF",
            // secondary: "#FBBF24",
            // muted: "#6B7280",
          },
        },
      },
    },
  },
};

export default config;
