import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
}

const paddingStyles = {
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-5 sm:p-6 lg:p-8",
};

export default function Card({
  padding = "md",
  hoverable = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const classes = [
    "bg-white rounded-xl border border-neutral-200 shadow-sm",
    paddingStyles[padding],
    hoverable
      ? "transition-all hover:shadow-md hover:border-accent/20 hover:-translate-y-0.5 active:shadow-md active:border-accent/20"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/* ── Step Card variant (used in "How It Works" section) ── */

interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({
  step,
  icon,
  title,
  description,
  className = "",
}: StepCardProps) {
  return (
    <Card padding="lg" hoverable className={`text-center ${className}`}>
      <div className="flex justify-center mb-3 text-neutral-800">{icon}</div>
      <span className="block text-2xl font-bold text-neutral-900 mb-2">
        {step}
      </span>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
    </Card>
  );
}

/* ── Feature Card variant (used in "Core Features" section) ── */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <Card hoverable className={className}>
      <div className="mb-4 text-neutral-700">{icon}</div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
    </Card>
  );
}

/* ── Item Row Card (used in dashboard recent items list) ── */

interface ItemRowProps {
  icon?: React.ReactNode;
  name: string;
  category: string;
  date?: string;
  price: string;
  className?: string;
}

export function ItemRow({
  icon,
  name,
  category,
  date,
  price,
  className = "",
}: ItemRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-3 border-b border-neutral-100 last:border-0 ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-600">
            {icon}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-neutral-900">{name}</p>
          <p className="text-xs text-neutral-500">
            {category}
            {date && ` · ${date}`}
          </p>
        </div>
      </div>
      <span className="text-sm font-medium text-neutral-900">{price}</span>
    </div>
  );
}
