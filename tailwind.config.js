/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                "min-h-640": {'raw': '(min-height: 640px)'},
                "max-w-640": {'raw': '(max-width: 640px)'},
            },
            boxShadow: {
                'fill-black': 'inset 0 0 0 1000px rgba(0, 0, 0, 0.5)'
            },
            padding: {
                '.5rem-clamp(1.5rem,2vw,4rem)': '.5rem clamp(1.5rem, 2vw, 4rem)'
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar-hide'),
    ],
}