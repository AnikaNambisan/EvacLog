import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "text";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark/90 shadow-sm",
  secondary:
    "border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 active:bg-neutral-100",
  text: "text-accent hover:text-accent-dark underline-offset-4 hover:underline",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-4 py-1.5 rounded-md",
  md: "text-sm px-6 py-2.5 rounded-lg",
  lg: "text-base px-8 py-3 rounded-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const classes = [
    baseStyles,
    variantStyles[variant],
    variant !== "text" ? sizeStyles[size] : "text-sm",
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
