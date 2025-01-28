/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E22112", // Primary button and action color
          hover: "#C81D10",  // Hover state
          focus: "#FF4635",  // Focus/active state
        },
        secondary: {
          DEFAULT: "#362F2F", // Secondary background (cards, containers)
          hover: "#4A3E3E",   // Slightly lighter for hover effects
        },
        neutralDark: {
          DEFAULT: "#211B1B", // Main background
          secondary: "#362F2F",   // Slightly lighter variant
        },
        neutraLight: {
          DEFAULT: "#F0F0F0",  // Primary text
          secondary: "#E5E5E5", // Secondary text (e.g., captions)
        },
      },
    },
  plugins: [],
  }
}
