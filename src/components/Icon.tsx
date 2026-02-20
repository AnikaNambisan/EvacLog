import { SVGAttributes } from "react";

interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

function base(size: number, props: SVGAttributes<SVGSVGElement>) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

/* ── Home / House ── */
export function HomeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <polyline points="9 21 9 14 15 14 15 21" />
    </svg>
  );
}

/* ── Lightning Bolt ── */
export function LightningIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Photo / Image (mountain + sun) ── */
export function PhotoIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/* ── Shield / Lock ── */
export function ShieldIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="10" y="10" width="4" height="5" rx="1" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}

/* ── Checklist / Clipboard ── */
export function ChecklistIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

/* ── Briefcase / Drawer ── */
export function BriefcaseIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="2" y1="13" x2="22" y2="13" />
    </svg>
  );
}

/* ── Credit Card (used in "Connect Your Card" step) ── */
export function CreditCardIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

/* ── Alert / Exclamation (used in "Be Prepared" step) ── */
export function AlertIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
    </svg>
  );
}

/* ── Inventory / Boxes (used in "Build Your Inventory" step) ── */
export function InventoryIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
