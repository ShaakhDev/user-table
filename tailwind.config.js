const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
      screens: {
         "xss": "320px",
         "xs": "480px",
         ...defaultTheme.screens,
      },
      extend: {
         animation: {
            "fade-in": "fadeIn 300ms ease-out forwards",
         },
         keyframes: {
            "fadeIn": {
               "0%": {
                  right: "-30%",
               },
               "80%": {
                  right: "5%",
               },
               "100%": {
                  right: "3%",
               },
            }
         }
      },

   },
   plugins: [],
}
