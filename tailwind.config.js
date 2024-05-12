/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      // typograpy: (theme) => ({
      //   default:{
      //     css: { 
      //       a: {
      //         textDecoration : 'none' ,
      //         color: theme('colors.blue.500'),
      //         fontWeight: '600',
      //         '&:hover': {
      //           textDecoration: 'underline',
      //         },
      //       }
      //     }
      //   }
      // }),
      colors: {
        //#14B04C
        'primary_color': '#339BD6',
        'linkColor': '#0057e3',
        'lightGreen': '#E0EDF3',
        
      },
      fontWeight: {
        'amy-extra-bold': 900
      },
      backgroundImage: {
       
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
        require("daisyui"),
    ]

   
}