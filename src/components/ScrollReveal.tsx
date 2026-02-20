"use client";

import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Delay before animation starts (ms). Use for staggering siblings. */
  delay?: number;
  /** Viewport threshold to trigger reveal (0-1). Default 0.15 */
  threshold?: number;
}

/**
 * Wraps content in a scroll-triggered fade-in-up animation.
 * Uses IntersectionObserver for performance. Applies the
 * `.scroll-reveal` / `.is-visible` CSS classes from globals.css.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.15,
  className = "",
  style,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger the reveal
          if (delay > 0) {
            setTimeout(() => el.classList.add("is-visible"), delay);
          } else {
            el.classList.add("is-visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
