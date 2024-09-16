import * as React from "react";
import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
    `inline-flex justify-center items-center rounded-md ring-offset-background text-sm font-medium whitespace-nowrap transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50`,
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline"
            },
            size: {
                default: "px-4 py-2 h-10",
                sm: "px-3 h-9 rounded-md",
                lg: "px-8 h-11 rounded-md",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...rest }, ref) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...rest}
            />
        );
    }
);

Button.displayName = "Button";
