import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Background colour preset */
  background?: "white" | "gray" | "dark";
  /** Vertical padding size */
  spacing?: "sm" | "md" | "lg";
  /** Max-width of inner container */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  /** Center text content */
  centered?: boolean;
}

const bgStyles = {
  white: "bg-white",
  gray: "bg-neutral-50",
  dark: "bg-neutral-900 text-white",
};

const spacingStyles = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
};

const maxWidthStyles = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Section({
  background = "white",
  spacing = "md",
  maxWidth = "lg",
  centered = false,
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={`${bgStyles[background]} ${spacingStyles[spacing]} ${className}`}
      {...props}
    >
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthStyles[maxWidth]} ${
          centered ? "text-center" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
