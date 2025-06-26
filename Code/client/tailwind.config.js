// tailwind.config.js
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindScrollbar,
  ],
}
