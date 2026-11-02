/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a14',
          surface: '#0f0f1e',
          card: '#16162a',
          cardHover: '#1c1c36',
          border: 'rgba(139, 92, 246, 0.15)',
          muted: '#94a3b8',
          text: '#f8fafc'
        },
        light: {
          bg: '#f8fafc',
          surface: '#f1f5f9',
          card: '#ffffff',
          cardHover: '#f8fafc',
          border: 'rgba(139, 92, 246, 0.2)',
          muted: '#64748b',
          text: '#0f172a'
        },
        accent: {
          violet: '#8b5cf6',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      maxWidth: {
        content: '1200px'
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
        'accent-gradient-hover': 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)'
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-card': '0 8px 30px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
};

