/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'brand-logo': "url('/src/assets/images/logo.svg')",
                'opus-logo': "url('/src/assets/images/logo.png')",
                'sm-top-img': "url('/src/assets/images/bg-top-login.svg')",
                'top-img': "url('/src/assets/images/bg-top-l0.svg')",
                'bottom-img': "url('/src/assets/images/bg-bottom-l0.svg')",
                's2-top-img': "url('/src/assets/images/bg-s1.svg')",
                's2-bottom-img': "url('/src/assets/images/bg2-s1.svg')",
                'square-gray': "url('/src/assets/images/square-gray-s2.svg')",
                'top-circle-img': "url('/src/assets/images/top-circle-bg.svg')",
            },
            colors: {
                yellow: '#F1BF38',
                purple: '#614A92',
                'cst-green': '#009369',
                "lang-l-orange": '#FFE6D8',
                "lang-b-orange": '#FF5900',
                "square-gray": '#7694a8',
                "light-grayish-orange": '#f7f2f0',
                "light-purple": '#CABFE2',
                "extra-light-purple": '#ede5ff',
                "grayish": '#D9D9D9',
                "light-gray": '#8B8B8B',
                "dark-gray": '#7c7978',
                "rose-white": '#f7f2f0',
                "dark-green": '#294954',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
