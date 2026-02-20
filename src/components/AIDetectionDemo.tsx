"use client";

import { useState, useEffect } from "react";

/**
 * Interactive before/after demo of AI photo recognition.
 * Matches wireframe slides 12 → 13: a living-room photo with
 * teal bounding boxes that animate in on toggle.
 */

interface BoundingBox {
  label: string;
  /** Percentage-based position & size */
  top: string;
  left: string;
  width: string;
  height: string;
  /** Optional: marks a person (renders privacy blur) */
  person?: boolean;
  /** Stagger delay in ms */
  delay: number;
}

const boxes: BoundingBox[] = [
  // Large TV
  { label: "TV", top: "10%", left: "8%", width: "32%", height: "40%", delay: 0 },
  // Floor-standing lamp
  { label: "Lamp", top: "5%", left: "42%", width: "12%", height: "52%", delay: 80 },
  // Plant on left
  { label: "Plant", top: "8%", left: "2%", width: "10%", height: "42%", delay: 160 },
  // TV cabinet / console
  { label: "Cabinet", top: "42%", left: "6%", width: "38%", height: "16%", delay: 240 },
  // Round coffee table
  { label: "Coffee Table", top: "48%", left: "34%", width: "18%", height: "18%", delay: 320 },
  // Subwoofer / speaker left
  { label: "Subwoofer", top: "38%", left: "2%", width: "8%", height: "18%", delay: 400 },
  // Projector on floor
  { label: "Projector", top: "62%", left: "38%", width: "16%", height: "16%", delay: 480 },
  // Yoga mat / rug
  { label: "Rug", top: "60%", left: "10%", width: "24%", height: "22%", delay: 560 },
  // Curtains right
  { label: "Curtains", top: "2%", left: "62%", width: "20%", height: "50%", delay: 640 },
  // Couch / sofa
  { label: "Couch", top: "42%", left: "58%", width: "38%", height: "38%", delay: 720 },
  // Person 1 (privacy)
  { label: "Person", top: "14%", left: "54%", width: "20%", height: "56%", person: true, delay: 800 },
  // Person 2 (privacy)
  { label: "Person", top: "18%", left: "72%", width: "20%", height: "52%", person: true, delay: 880 },
];

export default function AIDetectionDemo() {
  const [active, setActive] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  // Stagger boxes in when activated
  useEffect(() => {
    if (!active) {
      setVisibleCount(0);
      return;
    }

    setAnimating(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= boxes.length) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [active]);

  const detectedCount = active ? visibleCount : 0;
  const itemCount = boxes.filter((b, i) => !b.person && i < detectedCount).length;

  return (
    <div>
      {/* Toggle bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Analyzing spinner */}
          {animating && (
            <div className="shrink-0">
              <svg
                className="animate-spin-slow text-accent"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
          {/* Status complete checkmark */}
          {active && !animating && (
            <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-neutral-900">
              {animating
                ? "Analyzing photo..."
                : active
                  ? `${itemCount} items detected`
                  : "Upload a photo of any room"}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {animating
                ? "AI is scanning for objects and people"
                : active
                  ? "AI identifies and catalogs items automatically"
                  : "Our AI will identify every item instantly"}
            </p>
          </div>
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => setActive((prev) => !prev)}
          className={`relative inline-flex h-8 w-[56px] shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 min-w-[44px] min-h-[44px] ${
            active ? "bg-accent" : "bg-neutral-200"
          }`}
          role="switch"
          aria-checked={active}
          aria-label="Toggle AI detection"
        >
          <span
            className={`inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
              active ? "translate-x-[28px]" : "translate-x-[3px]"
            }`}
          />
        </button>
      </div>

      {/* Image container */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg select-none">
        {/* Living room background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg,
                hsl(25, 35%, 28%) 0%,
                hsl(28, 30%, 35%) 30%,
                hsl(30, 25%, 42%) 60%,
                hsl(22, 20%, 30%) 100%
              )`,
          }}
        >
          {/* ── Room decoration elements ── */}
          {/* Wall */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,15%,55%)] via-[hsl(28,18%,45%)] to-[hsl(25,20%,30%)] opacity-60" />

          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-[35%]">
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(22,40%,35%)] to-[hsl(25,30%,40%)] opacity-80" />
          </div>

          {/* TV */}
          <div className="absolute top-[12%] left-[10%] w-[30%] h-[36%] bg-neutral-900 rounded-sm shadow-lg">
            <div className="absolute inset-[4%] rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/80 via-orange-500/60 to-amber-800/70" />
              <div className="absolute bottom-[20%] left-[10%] w-[20%] h-[30%] bg-neutral-800/40 rounded-sm" />
            </div>
          </div>

          {/* TV Cabinet */}
          <div className="absolute top-[44%] left-[8%] w-[36%] h-[12%] bg-white/90 rounded-sm shadow">
            <div className="absolute inset-y-[15%] left-[5%] right-[5%] flex gap-[2%]">
              <div className="flex-1 bg-neutral-100 rounded-sm" />
              <div className="flex-1 bg-neutral-100 rounded-sm" />
              <div className="flex-1 bg-neutral-100 rounded-sm" />
            </div>
          </div>

          {/* Lamp */}
          <div className="absolute top-[8%] left-[44%] w-[2%] h-[44%]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[20%] bg-amber-200/50 rounded-full blur-[2px]" />
            <div className="absolute top-[15%] left-0 w-full h-[85%] bg-neutral-800/70 rounded-full" />
          </div>

          {/* Plant */}
          <div className="absolute top-[10%] left-[3%] w-[7%] h-[38%]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-neutral-700/50 rounded-sm" />
            <div className="absolute top-0 left-0 w-full h-[75%] bg-green-900/40 rounded-full" />
          </div>

          {/* Coffee table */}
          <div className="absolute top-[52%] left-[36%] w-[14%] h-[10%] bg-white/70 rounded-full shadow" />

          {/* Subwoofer */}
          <div className="absolute top-[40%] left-[3%] w-[6%] h-[14%] bg-neutral-800/80 rounded-sm" />

          {/* Projector */}
          <div className="absolute top-[64%] left-[40%] w-[12%] h-[10%] bg-neutral-900/70 rounded-sm shadow" />

          {/* Rug */}
          <div className="absolute top-[62%] left-[12%] w-[22%] h-[18%] bg-neutral-500/25 rounded-sm" />

          {/* Curtains */}
          <div className="absolute top-[2%] left-[64%] w-[18%] h-[46%] bg-amber-100/20 rounded-sm" />

          {/* Couch */}
          <div className="absolute top-[46%] left-[60%] w-[36%] h-[34%] bg-[hsl(25,15%,50%)] rounded-lg opacity-60" />

          {/* Person 1 */}
          <div className="absolute top-[18%] left-[58%] w-[14%] h-[50%]">
            <div className="w-full h-full bg-gradient-to-b from-[hsl(340,20%,55%)] to-[hsl(25,15%,45%)] rounded-t-full opacity-50" />
          </div>

          {/* Person 2 */}
          <div className="absolute top-[22%] left-[74%] w-[14%] h-[46%]">
            <div className="w-full h-full bg-gradient-to-b from-[hsl(200,15%,45%)] to-[hsl(25,15%,40%)] rounded-t-full opacity-50" />
          </div>

          {/* Warm ambient light glow */}
          <div className="absolute top-[5%] left-[20%] w-[30%] h-[30%] bg-amber-400/10 rounded-full blur-xl" />
        </div>

        {/* ── AI bounding boxes overlay ── */}
        {boxes.map((box, i) => (
          <div
            key={`${box.label}-${i}`}
            className="absolute transition-all duration-300"
            style={{
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
              opacity: i < detectedCount ? 1 : 0,
              transform: i < detectedCount ? "scale(1)" : "scale(0.92)",
            }}
          >
            {/* Border */}
            <div
              className={`absolute inset-0 rounded-sm ${
                box.person
                  ? "border-2 border-rose-400/70"
                  : "border-2 border-cyan-400/80"
              }`}
            />

            {/* Fill tint */}
            <div
              className={`absolute inset-0 rounded-sm ${
                box.person
                  ? "bg-rose-400/10 backdrop-blur-[2px]"
                  : "bg-cyan-400/5"
              }`}
            />

            {/* Label tag */}
            <span
              className={`absolute -top-5 left-0 text-[10px] font-semibold px-1.5 py-0.5 rounded hidden sm:block ${
                box.person
                  ? "bg-rose-400/90 text-white"
                  : "bg-cyan-400/90 text-neutral-900"
              }`}
            >
              {box.label}
            </span>
          </div>
        ))}

        {/* Scanning line animation when activating */}
        {animating && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
              style={{
                animation: "scanLine 2s ease-in-out infinite",
              }}
            />
          </div>
        )}
      </div>

      {/* Item count bar */}
      <div
        className={`mt-4 flex items-center gap-3 transition-all duration-500 ${
          active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${(itemCount / boxes.filter((b) => !b.person).length) * 100}%`,
            }}
          />
        </div>
        <span className="text-xs font-medium text-neutral-600 whitespace-nowrap">
          {itemCount} of {boxes.filter((b) => !b.person).length} items
        </span>
      </div>
    </div>
  );
}
