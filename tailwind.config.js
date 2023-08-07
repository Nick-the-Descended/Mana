/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      blur: {
        'tiny': '1.5px'
      }
    }
  },
  plugins: [],
}

