import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1152d4",
          dark: "#0d3a94",
          light: "#eef4ff",
        },
        secondary: "#cca43b",
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        sovereign: {
          blue: '#1152d4',
          slate: '#0F172A',
          sand: '#F8FAFC',
          red: '#D94E41',
        }
      },
      fontFamily: {
        sans: ["Public Sans", "Noto Sans Ethiopic", "system-ui", "sans-serif"],
        display: ["Public Sans", "Noto Sans Ethiopic", "system-ui", "sans-serif"],
        body: ["Public Sans", "Noto Sans Ethiopic", "system-ui", "sans-serif"],
        ethiopic: ["Noto Sans Ethiopic", "system-ui", "sans-serif"],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'sm-soft': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md-soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg-soft': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl-soft': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'sovereign': '0 25px 50px -12px rgba(0, 107, 63, 0.12)',
        // Glow shadows
        'glow-emerald': '0 0 20px rgba(0, 107, 63, 0.15)',
        'glow-emerald-lg': '0 0 40px rgba(0, 107, 63, 0.2)',
        'glow-gold': '0 0 20px rgba(253, 184, 19, 0.2)',
        'glow-gold-lg': '0 0 40px rgba(253, 184, 19, 0.25)',
      },
      backgroundImage: {
        // Gradient utilities
        'gradient-emerald': 'linear-gradient(135deg, #006B3F 0%, #10b981 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FDB813 0%, #f59e0b 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-emerald': `radial-gradient(at 40% 20%, hsla(156, 100%, 22%, 0.1) 0px, transparent 50%),
                         radial-gradient(at 80% 0%, hsla(43, 98%, 54%, 0.08) 0px, transparent 50%),
                         radial-gradient(at 0% 50%, hsla(156, 64%, 43%, 0.05) 0px, transparent 50%)`,
      },
      backdropBlur: {
        'glass': '12px',
        'glass-strong': '20px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
export default config;