import * as React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function Link({ href, children, className, ...props }: LinkProps) {
  const classes = cn(
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
    className,
  );

  if (isInternalHref(href)) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
