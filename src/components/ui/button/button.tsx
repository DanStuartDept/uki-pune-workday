import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button variant and size styles using class-variance-authority.
 * Provides multiple visual variants and sizes for different use cases.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Primary button style for main actions */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        /** Destructive button style for dangerous actions */
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        /** Outline button with border and transparent background */
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        /** Secondary button for less prominent actions */
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        /** Ghost button with minimal styling */
        ghost: "hover:bg-accent hover:text-accent-foreground",
        /** Link styled button */
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        /** Default button size */
        default: "h-10 px-4 py-2",
        /** Small button size */
        sm: "h-9 rounded-md px-3",
        /** Large button size */
        lg: "h-11 rounded-md px-8",
        /** Icon-only button size (square) */
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Button component props extending HTML button attributes.
 * @property {boolean} [asChild] - Whether to render as a Slot component for composition
 * @property {string} [variant] - Visual style variant
 * @property {string} [size] - Size variant
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a Slot component, merging props with child element */
  asChild?: boolean;
}

/**
 * Button component for user interactions.
 * Supports multiple variants, sizes, icons, and can render as any element using asChild.
 * Follows WCAG accessibility guidelines with proper focus states and keyboard navigation.
 * @example
 * ```tsx
 * <Button variant="destructive" size="lg">
 *   <Trash className="mr-2 h-4 w-4" />
 *   Delete
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
