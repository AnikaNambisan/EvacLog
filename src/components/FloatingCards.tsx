"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════ Item data ═══════════════════ */

interface InventoryItem {
  name: string;
  category: string;
  price: string;
  icon: React.ReactNode;
}

const primaryItems: InventoryItem[] = [
  {
    name: 'MacBook Pro 16"',
    category: "Electronics",
    price: "$2,890.00",
    icon: <LaptopSvg />,
  },
  {
    name: "Engagement Ring",
    category: "Jewelry",
    price: "$18,050.00",
    icon: <RingSvg />,
  },
  {
    name: "Blue Eames Ottoman",
    category: "Furniture",
    price: "$5,020.00",
    icon: <ChairSvg />,
  },
  {
    name: "Rolex Daydate",
    category: "Jewelry",
    price: "$9,500.00",
    icon: <WatchSvg />,
  },
  {
    name: "Painting",
    category: "Art & Decor",
    price: "$28,400.00",
    icon: <ImageSvg />,
  },
];

/** Extra items that cycle in when cards refresh */
const cycleItems: InventoryItem[] = [
  {
    name: "Sony A7IV Camera",
    category: "Electronics",
    price: "$2,499.00",
    icon: <CameraSvg />,
  },
  {
    name: "Herman Miller Aeron",
    category: "Furniture",
    price: "$1,395.00",
    icon: <ChairSvg />,
  },
  {
    name: "Cartier Love Bracelet",
    category: "Jewelry",
    price: "$8,050.00",
    icon: <RingSvg />,
  },
  {
    name: "Dyson V15 Detect",
    category: "Appliances",
    price: "$749.99",
    icon: <LaptopSvg />,
  },
  {
    name: "Le Creuset Set",
    category: "Kitchen",
    price: "$1,100.00",
    icon: <CameraSvg />,
  },
];

const allItems = [...primaryItems, ...cycleItems];

/* ═══════════════════ Card slot layout ═══════════════════ */

interface Slot {
  /** CSS positioning for desktop */
  top: number;
  right: number;
  /** Float animation params */
  floatAmp: number;
  floatDuration: number;
  floatDelay: number;
  /** Parallax multiplier (higher = moves more on scroll) */
  parallaxFactor: number;
}

const slots: Slot[] = [
  { top: 10,  right: 30,  floatAmp: 14, floatDuration: 5.0, floatDelay: 0,   parallaxFactor: 0.08 },
  { top: 90,  right: -10, floatAmp: 18, floatDuration: 6.0, floatDelay: 0.5, parallaxFactor: 0.12 },
  { top: 180, right: 50,  floatAmp: 10, floatDuration: 5.5, floatDelay: 1.0, parallaxFactor: 0.06 },
  { top: 270, right: 10,  floatAmp: 20, floatDuration: 7.0, floatDelay: 1.5, parallaxFactor: 0.14 },
  { top: 370, right: 40,  floatAmp: 12, floatDuration: 6.5, floatDelay: 0.8, parallaxFactor: 0.10 },
];

/* ═══════════════════ Component ═══════════════════ */

export default function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [cardItems, setCardItems] = useState<InventoryItem[]>(primaryItems);
  /** Index of the card currently crossfading, -1 = none */
  const [cyclingIndex, setCyclingIndex] = useState(-1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  /* ── Scroll listener for parallax ── */
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Offset relative to viewport centre
      setScrollY(rect.top);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Cycle one random card every 4 seconds ── */
  const pickNextItem = useCallback(
    (currentName: string): InventoryItem => {
      // Pick from pool, avoid showing the same item
      const available = allItems.filter(
        (i) =>
          i.name !== currentName &&
          !cardItems.some((c) => c.name === i.name)
      );
      if (available.length === 0) return cycleItems[0];
      return available[Math.floor(Math.random() * available.length)];
    },
    [cardItems]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * slots.length);

      // Phase 1: fade out
      setCyclingIndex(idx);
      setIsFadingOut(true);

      // Phase 2: swap item + fade in
      setTimeout(() => {
        setCardItems((prev) => {
          const next = [...prev];
          next[idx] = pickNextItem(prev[idx].name);
          return next;
        });
        setIsFadingOut(false);
      }, 400);

      // Phase 3: clear cycling state
      setTimeout(() => {
        setCyclingIndex(-1);
      }, 800);
    }, 4000);

    return () => clearInterval(interval);
  }, [pickNextItem]);

  /* ── Parallax offset per slot ── */
  function parallaxY(slot: Slot): number {
    // scrollY is rect.top: positive when below viewport, negative when above
    return slot.parallaxFactor * scrollY * -0.3;
  }

  return (
    <>
      {/* ── Desktop: absolute-positioned floating cards ── */}
      <div
        ref={containerRef}
        className="relative w-full h-[480px] hidden lg:block"
      >
        {slots.map((slot, i) => {
          const item = cardItems[i];
          if (!item) return null;

          const isCycling = cyclingIndex === i;
          const pY = parallaxY(slot);

          return (
            <div
              key={i}
              className="absolute transition-opacity duration-400"
              style={{
                top: slot.top,
                right: slot.right,
                transform: `translateY(${pY}px)`,
                opacity: isCycling && isFadingOut ? 0 : 1,
              }}
            >
              <div
                className="floating-card"
                style={{
                  animationDuration: `${slot.floatDuration}s`,
                  animationDelay: `${slot.floatDelay}s`,
                  // @ts-expect-error CSS custom property
                  "--float-amp": `${slot.floatAmp}px`,
                }}
              >
                <Card item={item} />
              </div>
            </div>
          );
        })}

        {/* Depth ghost cards */}
        <div className="absolute top-16 -right-16 opacity-25 blur-[1px]">
          <GhostCard width={220} />
        </div>
        <div className="absolute top-48 -right-24 opacity-15 blur-[2px]">
          <GhostCard width={200} />
        </div>
        <div className="absolute top-[22rem] -right-12 opacity-20 blur-[1px]">
          <GhostCard width={190} />
        </div>
      </div>

      {/* ── Mobile: horizontal scrollable strip ── */}
      <div className="lg:hidden mt-6 sm:mt-10 -mx-3 sm:-mx-6">
        <div className="flex gap-2 sm:gap-3 px-3 sm:px-6 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {cardItems.map((item, i) => (
            <div
              key={item.name}
              className="shrink-0 floating-card-mobile snap-start"
              style={{
                animationDuration: `${slots[i]?.floatDuration ?? 5}s`,
                animationDelay: `${(slots[i]?.floatDelay ?? 0) + i * 0.2}s`,
              }}
            >
              <Card item={item} compact />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════ Card sub-component ═══════════════════ */

function Card({
  item,
  compact = false,
}: {
  item: InventoryItem;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 bg-white rounded-xl border border-neutral-200 shadow-md hover:shadow-lg transition-shadow ${
        compact ? "px-3 py-2.5 min-w-[180px] sm:min-w-[220px]" : "px-4 py-3 min-w-[240px] sm:min-w-[260px]"
      }`}
    >
      <div
        className={`rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 shrink-0 ${
          compact ? "w-8 h-8" : "w-10 h-10"
        }`}
      >
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium text-neutral-900 truncate ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {item.name}
        </p>
        <p className={`text-neutral-500 ${compact ? "text-[11px]" : "text-xs"}`}>
          {item.category}
        </p>
      </div>
      <span
        className={`font-semibold text-neutral-900 whitespace-nowrap ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {item.price}
      </span>
    </div>
  );
}

/* ═══════════════════ Ghost card (depth decoration) ═══════════════════ */

function GhostCard({ width }: { width: number }) {
  return (
    <div
      className="flex items-center gap-3 bg-white rounded-xl border border-neutral-200 shadow px-4 py-3"
      style={{ width }}
    >
      <div className="w-8 h-8 rounded-lg bg-neutral-100 shrink-0" />
      <div className="flex-1">
        <div className="h-3 bg-neutral-200 rounded w-3/4 mb-1" />
        <div className="h-2 bg-neutral-100 rounded w-1/2" />
      </div>
      <div className="h-3 bg-neutral-200 rounded w-12" />
    </div>
  );
}

/* ═══════════════════ SVG icons ═══════════════════ */

function LaptopSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function RingSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="6" />
      <path d="M12 2v4" />
      <path d="M6.34 6.34l1.41 1.41" />
    </svg>
  );
}

function ChairSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
      <path d="M4 18v2" />
      <path d="M20 18v2" />
    </svg>
  );
}

function WatchSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ImageSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function CameraSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
