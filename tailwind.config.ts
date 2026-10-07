import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/{App,RouteTree}.tsx", "./src/pages/**/*.{ts,tsx}", "./src/components/*.tsx"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // PREMIUM "GRAPHITE ELEGANCE" PALETTE
        charcoal: {
          50: "#F5F5F6",
          100: "#E6E6E8",
          200: "#CECFD2",
          300: "#A8AAAF",
          400: "#7A7D84",
          500: "#5A5D64",
          600: "#4A4D54",
          700: "#3D4047",
          800: "#24272B",
          900: "#1A1C1F",
          950: "#0C0D0F", // Deepest charcoal
        },
        graphite: {
          50: "#F7F8F9",
          100: "#EDEEF0",
          200: "#D8DADD",
          300: "#B6B9BE",
          400: "#8E9299",
          500: "#71757D",
          600: "#5C5F66",
          700: "#4D5056",
          800: "#373A3F",
          900: "#24272B",
          950: "#1A1C1F", // Primary graphite
        },
        slate: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E1E4E8",
          300: "#C4CDD5",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#2C2F33", // Card backgrounds
          900: "#1F2937",
          950: "#111827",
        },
        // MUTED PREMIUM CYAN ACCENT
        cyan: {
          50: "#ECFBFD",
          100: "#D0F2F7",
          200: "#A1E5EF",
          300: "#72D8E7",
          400: "#5FC8E1", // Hover state
          500: "#3ABAD6", // Primary accent
          600: "#2A9BB8", // Pressed state
          700: "#227D98",
          800: "#1A5F73",
          900: "#134151",
          950: "#0B2330",
        },
        // GLASS TINTS
        glass: {
          white: "#E8F1F7",  // Soft glass white
          blue: "#D0E7F2",   // Subtle blue tint
          smoke: "#C4CDD5",  // Smoke depth
        },
        // NEUTRAL TONES
        neutral: {
          50: "#FAFBFC",
          100: "#F5F7FA",
          200: "#E1E4E8",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        quaternary: {
          DEFAULT: "hsl(var(--quaternary))",
          foreground: "hsl(var(--quaternary-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-text': 'var(--gradient-text)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-chaos': 'var(--gradient-chaos)',
        'gradient-burn': 'var(--gradient-burn)',
        'gradient-electric': 'var(--gradient-electric)',
        'gradient-retro': 'var(--gradient-retro)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'glow-intense': 'var(--shadow-glow-intense)',
        'quantum': 'var(--shadow-quantum)',
        'card': 'var(--shadow-card)',
        'elegant': 'var(--shadow-elegant)',
        'elegant-sm': 'var(--shadow-elegant-sm)',
        'elegant-md': 'var(--shadow-elegant-md)',
        'elegant-lg': 'var(--shadow-elegant-lg)',
        'ultrathin': 'var(--shadow-ultrathin)',
        'depth': 'var(--shadow-depth)',
        'deepthink': 'var(--shadow-deepthink)',
        'hyperdeep': 'var(--shadow-hyperdeep)',
        'infinity': 'var(--shadow-infinity)',
        'holographic': 'var(--shadow-holographic)',
        'particle': 'var(--shadow-particle)',
        'brutal': 'var(--shadow-brutal)',
        'brutal-lg': 'var(--shadow-brutal-lg)',
        'brutal-xl': 'var(--shadow-brutal-xl)',
        'glitch': 'var(--shadow-glitch)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // UI Component Animations
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // Entrance Animations
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "morph-in": {
          "0%": { opacity: "0", transform: "scale(0.92) rotateX(8deg)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "scale(1) rotateX(0deg)", filter: "blur(0)" },
        },
        "slide-reveal": {
          "0%": { opacity: "0", transform: "translateX(-30px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateX(0)", filter: "blur(0)" },
        },

        // Floating Animations
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-8px) translateX(5px)" },
          "66%": { transform: "translateY(-5px) translateX(-4px)" },
        },
        "float-ethereal": {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "25%": { transform: "translateY(-15px) translateX(8px) rotate(1deg)" },
          "50%": { transform: "translateY(-8px) translateX(-6px) rotate(-0.5deg)" },
          "75%": { transform: "translateY(-18px) translateX(4px) rotate(0.8deg)" },
        },

        // Glow & Pulse Animations
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(230 35% 58% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(230 35% 58% / 0.6)" },
        },
        "pulse-quantum": {
          "0%, 100%": { opacity: "0.4", boxShadow: "var(--shadow-glow)" },
          "50%": { opacity: "1", boxShadow: "var(--shadow-quantum)" },
        },
        "breathe-glow": {
          "0%, 100%": {
            opacity: "0.7",
            filter: "brightness(1)",
            boxShadow: "0 0 20px rgba(120, 160, 200, 0.2)"
          },
          "50%": {
            opacity: "1",
            filter: "brightness(1.08)",
            boxShadow: "0 0 40px rgba(120, 160, 200, 0.35)"
          },
        },

        // Kinetic & Morphing Animations
        "glass-morph": {
          "0%, 100%": {
            backdropFilter: "blur(16px) saturate(140%)",
            borderColor: "var(--glass-border)"
          },
          "50%": {
            backdropFilter: "blur(24px) saturate(160%)",
            borderColor: "var(--glass-border-bright)"
          },
        },
        "shimmer-flow": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "aurora-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%", opacity: "0.6" },
          "33%": { backgroundPosition: "50% 100%", opacity: "0.8" },
          "66%": { backgroundPosition: "100% 0%", opacity: "0.7" },
        },
        "depth-shift": {
          "0%, 100%": { transform: "translateZ(0)", boxShadow: "var(--shadow-elegant-md)" },
          "50%": { transform: "translateZ(10px)", boxShadow: "var(--shadow-depth)" },
        },

        // Hyper-Advanced Animations
        "border-shimmer": {
          "0%, 100%": { backgroundPosition: "0% 50%", opacity: "0.8" },
          "50%": { backgroundPosition: "100% 50%", opacity: "1" },
        },
        "holographic-flow": {
          "0%, 100%": { opacity: "0.8", filter: "hue-rotate(0deg)" },
          "33%": { opacity: "1", filter: "hue-rotate(10deg)" },
          "66%": { opacity: "0.9", filter: "hue-rotate(-5deg)" },
        },
        "chromatic-shift": {
          "0%": { backgroundPosition: "0% center", filter: "hue-rotate(0deg)" },
          "50%": { backgroundPosition: "50% center", filter: "hue-rotate(20deg)" },
          "100%": { backgroundPosition: "100% center", filter: "hue-rotate(0deg)" },
        },
        "infinity-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "light-sweep": {
          "0%, 100%": { transform: "translateY(0%) scaleX(1)", opacity: "0.8" },
          "50%": { transform: "translateY(100%) scaleX(1.5)", opacity: "0.4" },
        },
        "liquid-morph": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%"
          },
          "25%": {
            transform: "translate(-10%, -10%) scale(1.1)",
            borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%"
          },
          "50%": {
            transform: "translate(10%, 10%) scale(0.9)",
            borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%"
          },
          "75%": {
            transform: "translate(-5%, 15%) scale(1.05)",
            borderRadius: "30% 70% 70% 30% / 60% 40% 60% 40%"
          },
        },
        "particle-float": {
          "0%": { transform: "translate(20%, 0%) scale(0)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "0.6" },
          "100%": { transform: "translate(80%, -100%) scale(1)", opacity: "0" },
        },
        "holographic-sweep": {
          "0%": { backgroundPosition: "-200% -200%" },
          "100%": { backgroundPosition: "200% 200%" },
        },
        "chromatic-flow": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "300% center" },
        },
        "prism-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%", filter: "hue-rotate(0deg) brightness(1)" },
          "25%": { backgroundPosition: "100% 0%", filter: "hue-rotate(15deg) brightness(1.05)" },
          "50%": { backgroundPosition: "100% 100%", filter: "hue-rotate(0deg) brightness(1)" },
          "75%": { backgroundPosition: "0% 100%", filter: "hue-rotate(-10deg) brightness(1.05)" },
        },
        "aurora-dance": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
            opacity: "0.5",
            filter: "blur(30px) hue-rotate(0deg)"
          },
          "25%": {
            backgroundPosition: "100% 0%",
            opacity: "0.7",
            filter: "blur(35px) hue-rotate(20deg)"
          },
          "50%": {
            backgroundPosition: "100% 100%",
            opacity: "0.6",
            filter: "blur(25px) hue-rotate(0deg)"
          },
          "75%": {
            backgroundPosition: "0% 100%",
            opacity: "0.8",
            filter: "blur(40px) hue-rotate(-15deg)"
          },
        },
        "perspective-rotate": {
          "0%, 100%": { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" },
          "25%": { transform: "perspective(1000px) rotateX(5deg) rotateY(5deg)" },
          "50%": { transform: "perspective(1000px) rotateX(0deg) rotateY(10deg)" },
          "75%": { transform: "perspective(1000px) rotateX(-5deg) rotateY(5deg)" },
        },
        "quantum-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 40px rgba(120, 160, 200, 0.3), 0 0 80px rgba(120, 160, 200, 0.15), inset 0 0 40px rgba(220, 230, 245, 0.08)",
            transform: "scale(1)"
          },
          "50%": {
            boxShadow: "0 0 60px rgba(120, 160, 200, 0.5), 0 0 120px rgba(140, 180, 220, 0.3), 0 0 180px rgba(160, 200, 240, 0.2), inset 0 0 60px rgba(220, 230, 245, 0.12)",
            transform: "scale(1.02)"
          },
        },
        "ripple-expand": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "lens-flare": {
          "0%, 100%": { opacity: "0", transform: "translateX(-100%) scale(0.5)" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateX(100%) scale(1.5)" },
        },
      },
      animation: {
        // UI Component Animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // Entrance Animations
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "morph-in": "morph-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-reveal": "slide-reveal 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards",

        // Floating Animations
        "float-gentle": "float-gentle 10s ease-in-out infinite",
        "float-ethereal": "float-ethereal 14s ease-in-out infinite",

        // Glow & Pulse Animations
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "pulse-quantum": "pulse-quantum 4.5s ease-in-out infinite",
        "breathe-glow": "breathe-glow 5s ease-in-out infinite",

        // Kinetic & Morphing Animations
        "glass-morph": "glass-morph 6s ease-in-out infinite",
        "shimmer-flow": "shimmer-flow 3s linear infinite",
        "aurora-flow": "aurora-flow 12s ease-in-out infinite",
        "depth-shift": "depth-shift 8s ease-in-out infinite",

        // Hyper-Advanced Animations
        "border-shimmer": "border-shimmer 4s linear infinite",
        "holographic-flow": "holographic-flow 6s ease-in-out infinite",
        "chromatic-shift": "chromatic-shift 8s linear infinite",
        "infinity-rotate": "infinity-rotate 10s linear infinite",
        "light-sweep": "light-sweep 5s ease-in-out infinite",
        "liquid-morph": "liquid-morph 6s ease-in-out infinite",
        "particle-float": "particle-float 4s ease-in-out infinite",
        "holographic-sweep": "holographic-sweep 3s ease-in-out infinite",
        "chromatic-flow": "chromatic-flow 6s linear infinite",
        "prism-shift": "prism-shift 8s ease-in-out infinite",
        "aurora-dance": "aurora-dance 12s ease-in-out infinite",
        "perspective-rotate": "perspective-rotate 20s ease-in-out infinite",
        "quantum-pulse": "quantum-pulse 5s ease-in-out infinite",
        "ripple-expand": "ripple-expand 2s ease-out forwards",
        "lens-flare": "lens-flare 4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
