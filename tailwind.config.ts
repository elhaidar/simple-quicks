import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-secondary": "hsl(var(--border-secondary))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          2: "hsl(var(--secondary-2))",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        indicators: {
          1: "hsl(var(--indicators-1))",
          2: "hsl(var(--indicators-2))",
          3: "hsl(var(--indicators-3))",
          4: "hsl(var(--indicators-4))",
        },
        stickers: {
          1: "hsl(var(--stickers-1))",
          2: "hsl(var(--stickers-2))",
          3: "hsl(var(--stickers-3))",
          4: "hsl(var(--stickers-4))",
          5: "hsl(var(--stickers-5))",
          6: "hsl(var(--stickers-6))",
          7: "hsl(var(--stickers-7))",
          8: "hsl(var(--stickers-8))",
        },
        chats: {
          1: "hsl(var(--chats-1))",
          "1-foreground": "hsl(var(--chats-1-foreground))",
          2: "hsl(var(--chats-2))",
          "2-foreground": "hsl(var(--chats-2-foreground))",
          3: "hsl(var(--chats-3))",
          "3-foreground": "hsl(var(--chats-3-foreground))",
          4: "hsl(var(--chats-4))",
          "4-foreground": "hsl(var(--chats-4-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "button-clicked": "-15px 0px #4f4f4f",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
