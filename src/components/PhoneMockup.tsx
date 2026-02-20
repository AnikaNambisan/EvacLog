import { HTMLAttributes } from "react";

interface PhoneMockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Scale factor relative to a natural ~375×812 phone size. Default 1. */
  scale?: number;
}

/**
 * iPhone-style mockup frame.
 * Place content inside as children — it will scroll within the phone screen area.
 *
 * Usage:
 * ```tsx
 * <PhoneMockup>
 *   <img src="/screenshot.png" alt="App screenshot" className="w-full" />
 * </PhoneMockup>
 * ```
 */
export default function PhoneMockup({
  scale = 1,
  className = "",
  children,
  ...props
}: PhoneMockupProps) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: `min(${280 * scale}px, 100%)` }}
      {...props}
    >
      {/* Outer device shell */}
      <div className="relative bg-neutral-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Top notch / dynamic island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] max-w-[120px] h-[30px] bg-neutral-900 rounded-b-2xl z-10" />

        {/* Screen bezel */}
        <div className="relative bg-white rounded-[2.4rem] overflow-hidden">
          {/* Status bar */}
          <div className="h-12 bg-white flex items-end justify-between px-8 pb-1">
            <span className="text-[11px] font-semibold text-neutral-900">
              9:41
            </span>
            <div className="flex items-center gap-1">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                className="text-neutral-900"
              >
                <rect x="0" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
                <rect x="3" y="4" width="2" height="6" rx="0.5" fill="currentColor" />
                <rect x="6" y="2" width="2" height="8" rx="0.5" fill="currentColor" />
                <rect x="9" y="0" width="2" height="10" rx="0.5" fill="currentColor" />
              </svg>
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                className="text-neutral-900"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="13"
                  height="9"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <rect x="2" y="2" width="9" height="6" rx="0.5" fill="currentColor" />
                <rect x="14.5" y="3" width="1.5" height="4" rx="0.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Screen content area */}
          <div
            className="overflow-y-auto"
            style={{ height: 540 * scale }}
          >
            {children}
          </div>

          {/* Home indicator */}
          <div className="h-8 bg-white flex items-center justify-center">
            <div className="w-[100px] h-[4px] bg-neutral-900 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
