/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (HSL CSS variables defined in src/index.css)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Neobrutalist palette (hex CSS variables defined in src/index.css)
        nb: {
          charcoal: 'var(--nb-charcoal)',
          'charcoal-light': 'var(--nb-charcoal-light)',
          blue: 'var(--nb-blue)',
          'blue-dark': 'var(--nb-blue-dark)',
          coral: 'var(--nb-coral)',
          'coral-dark': 'var(--nb-coral-dark)',
          yellow: 'var(--nb-yellow)',
          'yellow-dark': 'var(--nb-yellow-dark)',
          emerald: 'var(--nb-emerald)',
          purple: 'var(--nb-purple)',
          orange: 'var(--nb-orange)',
          white: 'var(--nb-white)',
          gray: 'var(--nb-gray)',
          dark: 'var(--nb-dark)',
        },
      },
      fontFamily: {
        headline: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        nb: '4px 4px 0px var(--nb-white)',
        'nb-lg': '8px 8px 0px var(--nb-blue)',
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
