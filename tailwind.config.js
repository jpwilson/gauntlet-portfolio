/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cmd-primary': '#006673',
        'cmd-primary-light': '#138090',
        'cmd-primary-dim': '#004e59',
        'cmd-secondary': '#904d00',
        'cmd-secondary-bright': '#fd8b00',
        'cmd-tertiary': '#8f4922',
        'cmd-tertiary-container': '#ad6038',
        'cmd-surface': '#f7f9fc',
        'cmd-surface-dim': '#d8dadd',
        'cmd-surface-container': '#eceef1',
        'cmd-surface-container-low': '#f2f4f7',
        'cmd-surface-container-high': '#e6e8eb',
        'cmd-surface-container-highest': '#e0e3e6',
        'cmd-on-surface': '#191c1e',
        'cmd-on-surface-variant': '#3d4949',
        'cmd-outline': '#6d7979',
        'cmd-outline-variant': '#bcc9c8',
        'cmd-inverse-surface': '#2d3133',
        'cmd-inverse-on-surface': '#eff1f4',
        'cmd-inverse-primary': '#7ad4e5',
        'cmd-error': '#ba1a1a',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        label: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
