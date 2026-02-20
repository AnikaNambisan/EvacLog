import { HTMLAttributes } from "react";

/* ─────────────────────── Shared types ─────────────────────── */

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}

/* ─────────────────────── Display / Hero ─────────────────────── */

export function Display({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "h1") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────── Headings ─────────────────────── */

export function H1({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "h1") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-3xl sm:text-4xl font-bold text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function H2({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "h2") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-2xl sm:text-3xl font-bold text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function H3({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "h3") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-lg sm:text-xl font-semibold text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function H4({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "h4") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-base font-semibold text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────── Body text ─────────────────────── */

export function Body({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "p") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-base text-neutral-600 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function BodyLarge({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "p") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-lg sm:text-xl text-neutral-600 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────── Caption / small text ─────────────────────── */

export function Caption({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "span") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-xs text-neutral-500 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Label({ as, className = "", children, ...props }: TypographyProps) {
  const Tag = (as ?? "span") as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error – dynamic tag
    <Tag
      className={`text-sm font-medium text-neutral-700 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────── Accent highlight ─────────────────────── */

export function Accent({ className = "", children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`text-accent ${className}`} {...props}>
      {children}
    </span>
  );
}

/* ─────────────────────── Stat / big number ─────────────────────── */

interface StatProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
}

export function Stat({ value, label, className = "", ...props }: StatProps) {
  return (
    <div className={`text-center ${className}`} {...props}>
      <span className="block text-3xl sm:text-4xl font-bold text-neutral-900">
        {value}
      </span>
      <span className="block text-xs text-neutral-500 mt-1">{label}</span>
    </div>
  );
}
