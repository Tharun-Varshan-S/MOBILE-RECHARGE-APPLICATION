/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#e10000', // Airtel Red inspired
                    dark: '#b30000',
                    light: '#ff4d4d',
                },
                secondary: {
                    DEFAULT: '#1c1c1c', // Dark modern
                    light: '#2d2d2d',
                }
            }
        },
    },
    plugins: [],
}
