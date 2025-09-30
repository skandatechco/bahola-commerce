/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ✅ Bahola brand colors
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        brand: {
          primary: 'hsl(var(--color-primary))',
          primaryLight: 'hsl(var(--color-primary-light))',
          primaryDark: 'hsl(var(--color-primary-dark))',
          gold: 'hsl(var(--color-accent-gold))',
          goldLight: 'hsl(var(--color-accent-gold-light))',
          green: 'hsl(var(--color-accent-green))',
          greenLight: 'hsl(var(--color-accent-green-light))',
          focus: 'hsl(var(--focus))',
          charcoal: 'hsl(var(--color-charcoal))',
          softWhite: 'hsl(var(--color-soft-white))',
        },
        success: 'hsl(var(--color-success))',
        warning: 'hsl(var(--color-warning))',
        danger: 'hsl(var(--color-danger))',
        info: 'hsl(var(--color-info))',
        // Legacy Bahola colors for compatibility
        baholaNavy: '#003366',
        baholaGold: '#AD8B3A',
        baholaSage: '#7FB069',
        baholaCream: '#F5F1E9'
      },

      // ✅ Fonts: Inter as main sans, Helvetica as fallback
      fontFamily: {
        sans: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-secondary)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['Helvetica', 'Arial', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'brand-gradient':
          'radial-gradient(1200px circle at 0% 0%, hsl(var(--brand-500)/0.25), transparent 40%), radial-gradient(1200px circle at 100% 0%, hsl(var(--brand-400)/0.20), transparent 40%), radial-gradient(1200px circle at 50% 100%, hsl(var(--brand-600)/0.25), transparent 40%)',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    })
  ]
};
