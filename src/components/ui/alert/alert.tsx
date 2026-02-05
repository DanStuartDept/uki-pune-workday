import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Alert variant styles for different contextual meanings.
 * Includes default and destructive variants with appropriate color schemes.
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        /** Default alert style with neutral colors */
        default: "bg-background text-foreground",
        /** Destructive alert style for errors and warnings */
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Alert component displays important messages to users.
 * Supports optional icon, title, and description with semantic HTML and proper ARIA roles.
 * @example
 * ```tsx
 * <Alert>
 *   <Terminal className="h-4 w-4" />
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>You can add components using the CLI.</AlertDescription>
 * </Alert>
 * ```
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

/**
 * AlertTitle component provides a heading for the alert message.
 * Rendered as an h5 element for semantic HTML structure.
 */
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

/**
 * AlertDescription component provides detailed information for the alert.
 * Supports rich text content including paragraphs and inline elements.
 */
const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
