/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Exo 2', 'sans-serif'],
        'playwrite': ['Playwrite NZ Guides', 'cursive'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        },
        accent: {
          400: '#84cc16',
          500: '#9EFF00',
          600: '#84cc16'
        },
        neutral: {
          50: '#F3F4F6',
          100: '#f3f4f6',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        grido: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
          dark: '#0f172a',
          card: '#1e293b'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'grid-move': 'gridMove 20s linear infinite',
        'circuit-pulse': 'circuitPulse 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #9EFF00' },
          '100%': { boxShadow: '0 0 20px #9EFF00, 0 0 30px #9EFF00' }
        },
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(60px, 60px)' }
        },
        circuitPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tech-grid': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg stroke=\"%239EFF00\" stroke-width=\"0.5\" stroke-opacity=\"0.2\"%3E%3Cpath d=\"M0 0h60v60H0z\"/%3E%3Cpath d=\"M30 0v60M0 30h60\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'circuit-pattern': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" stroke=\"%239EFF00\" stroke-width=\"1\" stroke-opacity=\"0.1\"%3E%3Cpath d=\"M10 10h20v20h-20zM70 10h20v20h-20zM10 70h20v20h-20zM70 70h20v20h-20z\"/%3E%3Cpath d=\"M30 20h40M20 30v40M80 30v40M30 80h40\"/%3E%3Ccircle cx=\"30\" cy=\"20\" r=\"2\" fill=\"%239EFF00\" fill-opacity=\"0.5\"/%3E%3Ccircle cx=\"70\" cy=\"20\" r=\"2\" fill=\"%239EFF00\" fill-opacity=\"0.5\"/%3E%3Ccircle cx=\"30\" cy=\"80\" r=\"2\" fill=\"%239EFF00\" fill-opacity=\"0.5\"/%3E%3Ccircle cx=\"70\" cy=\"80\" r=\"2\" fill=\"%239EFF00\" fill-opacity=\"0.5\"/%3E%3C/g%3E%3C/svg%3E')"
      }
    },
  },
  plugins: [],
}