/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'feud-blue': '#1e3a8a',
                'feud-gold': '#fbbf24',
                'feud-red': '#dc2626',
            },
            fontFamily: {
                'display': ['Impact', 'Arial Black', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
