import type { Config } from "tailwindcss";

const config: Config = {
    // darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}"
    ],
    theme: {
        borderRadius: {
            "base-lg": "var(--base-radius)",
            "base-md": "calc(var(--base-radius) - 2px)",
            "base-sm": "calc(var(--base-radius) - 4px)",

            "container-lg": "var(--container-radius)",
            "container-md": "calc(var(--container-radius) - 2px)",
            "container-sm": "calc(var(--container-radius) - 4px)"
        },
        colors: {
            background: {
                DEFAULT: "hsl(var(--background))",
                foreground: "hsl(var(--background-foreground))",
                muted: {
                    DEFAULT: "hsl(var(--background-muted))",
                    foreground: "hsl(var(--background-muted-foreground))"
                }
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
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))"
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
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
};

export default config;