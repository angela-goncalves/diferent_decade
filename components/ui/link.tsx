import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/utils";

const linkVariants = cva(
  "self-center rounded-xl font-medium underline underline-offset-4 hover:no-underline transition",
  {
    variants: {
      variant: {
        default: "",
        button: "bg-primary px-4 py-3 no-underline text-white",
      },
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  children: React.ReactNode;
  asChild?: boolean;
}

const LinkCust = React.forwardRef(
  (
    {
      className,
      children,
      variant,
      asChild = false,
      href,
      ...props
    }: LinkProps,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <Link
        href={href}
        {...props}
        ref={ref}
        className={cn(linkVariants({ className, variant }))}>
        {children}
      </Link>
    );
  }
);

LinkCust.displayName = "LinkCust";

export { LinkCust, linkVariants };
