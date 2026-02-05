import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge variant styles for different contextual meanings.
 * Provides visual differentiation for status indicators and labels.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        /** Primary badge style */
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        /** Secondary badge for less prominent labels */
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        /** Destructive badge for errors or warnings */
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        /** Outline badge with border */
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Badge component props extending HTML div attributes.
 * @property {string} [variant] - Visual style variant
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

/**
 * Badge component for displaying status, labels, or counts.
 * Typically used to highlight information or indicate state.
 * @example
 * ```tsx
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="secondary">Beta</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
