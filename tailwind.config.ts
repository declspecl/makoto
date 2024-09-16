import type { Config } from "tailwindcss";

export default {
    darkMode: "selector",
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}"
    ],
    theme: {
        colors: {
            white: "hsl(0, 0%, 100%)",
            black: "hsl(0, 0%, 0%)",
            background: {
                DEFAULT: "hsl(var(--background))",
                foreground: "hsl(var(--background-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))"
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
                muted: {
                    DEFAULT: "hsl(var(--popover-muted))",
                    foreground: "hsl(var(--popover-muted-foreground))"
                }
            },
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))"
            },
            primary: {
                DEFAULT: "hsl(var(--primary-500))",
                50: "hsl(var(--primary-50))",
                100: "hsl(var(--primary-100))",
                200: "hsl(var(--primary-200))",
                300: "hsl(var(--primary-300))",
                400: "hsl(var(--primary-400))",
                500: "hsl(var(--primary-500))",
                600: "hsl(var(--primary-600))",
                700: "hsl(var(--primary-700))",
                800: "hsl(var(--primary-800))",
                900: "hsl(var(--primary-900))",
                950: "hsl(var(--primary-950))",
                foreground: "hsl(var(--primary-foreground))"
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary-500))",
                50: "hsl(var(--secondary-50))",
                100: "hsl(var(--secondary-100))",
                200: "hsl(var(--secondary-200))",
                300: "hsl(var(--secondary-300))",
                400: "hsl(var(--secondary-400))",
                500: "hsl(var(--secondary-500))",
                600: "hsl(var(--secondary-600))",
                700: "hsl(var(--secondary-700))",
                800: "hsl(var(--secondary-800))",
                900: "hsl(var(--secondary-900))",
                950: "hsl(var(--secondary-950))",
                foreground: "hsl(var(--secondary-foreground))"
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))"
            },
            success: {
                DEFAULT: "hsl(var(--success))",
                foreground: "hsl(var(--success-foreground))"
            },
            warning: {
                DEFAULT: "hsl(var(--warning))",
                foreground: "hsl(var(--warning-foreground))"
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))"
            },
            border: "hsl(var(--border))",
            ring: "hsl(var(--ring))",
            input: "hsl(var(--input))",
            transparent: "transparent"
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
} satisfies Config;