module.exports = {
  mode:'jit',
  purge: ['index.hhml', './src/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {fontFamily :{
      sans: ['Inter var', ...require('tailwindcss/defaultTheme').fontFamily.sans]
    }},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
