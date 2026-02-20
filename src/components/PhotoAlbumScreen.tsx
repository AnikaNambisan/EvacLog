"use client";

import { useState } from "react";

/**
 * Photo Album screen content for inside a PhoneMockup.
 * Matches the centre iPhone in wireframe slide 11.
 */

/* ── Placeholder photo data ── */

interface Photo {
  id: number;
  alt: string;
  /** HSL hue used to generate a unique placeholder colour */
  hue: number;
  /** Decorative label rendered inside the placeholder */
  label: string;
}

const octoberPhotos: Photo[] = [
  { id: 1, hue: 30, alt: "Living room with TV", label: "Living Room" },
  { id: 2, hue: 35, alt: "Kitchen countertop", label: "Kitchen" },
  { id: 3, hue: 200, alt: "Home office desk", label: "Office" },
  { id: 4, hue: 25, alt: "Bedroom nightstand", label: "Bedroom" },
  { id: 5, hue: 40, alt: "Dining room table", label: "Dining" },
  { id: 6, hue: 180, alt: "Bathroom vanity", label: "Bathroom" },
  { id: 7, hue: 20, alt: "Living room sofa", label: "Living Room" },
  { id: 8, hue: 45, alt: "Garage shelving", label: "Garage" },
  { id: 9, hue: 210, alt: "Guest bedroom", label: "Guest Room" },
  { id: 10, hue: 15, alt: "Entryway console", label: "Entryway" },
  { id: 11, hue: 50, alt: "Laundry room", label: "Laundry" },
  { id: 12, hue: 190, alt: "Patio furniture", label: "Patio" },
];

const septemberPhotos: Photo[] = [
  { id: 13, hue: 260, alt: "Master closet", label: "Closet" },
  { id: 14, hue: 150, alt: "Kids room", label: "Kids Room" },
  { id: 15, hue: 340, alt: "Home gym", label: "Gym" },
  { id: 16, hue: 90, alt: "Pantry shelves", label: "Pantry" },
  { id: 17, hue: 270, alt: "Basement storage", label: "Basement" },
  { id: 18, hue: 120, alt: "Backyard shed", label: "Shed" },
];

const months = ["October", "September"] as const;
type Month = (typeof months)[number];

const photosByMonth: Record<Month, Photo[]> = {
  October: octoberPhotos,
  September: septemberPhotos,
};

export default function PhotoAlbumScreen() {
  const [activeMonth, setActiveMonth] = useState<Month>("October");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const photos = photosByMonth[activeMonth];

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Nav bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-100">
        <button className="flex items-center gap-0.5 text-accent text-xs font-medium">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Go Back
        </button>

        <span className="text-sm font-semibold text-neutral-900">
          Photo Album
        </span>

        <button className="text-accent text-xs font-semibold">
          Analyze
        </button>
      </div>

      {/* ── Photo grid ── */}
      <div className="flex-1 overflow-y-auto px-[2px] pt-[2px]">
        <div className="grid grid-cols-3 gap-[2px]">
          {photos.map((photo) => {
            const isSelected = selected.has(photo.id);
            return (
              <button
                key={photo.id}
                onClick={() => toggle(photo.id)}
                className="relative aspect-square overflow-hidden focus:outline-none group"
              >
                {/* Placeholder image with unique warm/cool tone */}
                <div
                  className="absolute inset-0 flex items-end justify-start p-1.5"
                  style={{
                    background: `linear-gradient(135deg,
                      hsl(${photo.hue}, 25%, 82%) 0%,
                      hsl(${photo.hue}, 20%, 68%) 100%)`,
                  }}
                >
                  {/* Decorative furniture silhouettes */}
                  <div className="absolute inset-0 opacity-[0.12]">
                    <div
                      className="absolute bottom-0 left-[10%] w-[35%] h-[30%] rounded-t-md"
                      style={{ background: `hsl(${photo.hue}, 15%, 40%)` }}
                    />
                    <div
                      className="absolute bottom-0 right-[10%] w-[25%] h-[45%] rounded-t-sm"
                      style={{ background: `hsl(${photo.hue}, 15%, 35%)` }}
                    />
                    <div
                      className="absolute top-[20%] right-[15%] w-[18%] h-[18%] rounded-full"
                      style={{ background: `hsl(${photo.hue}, 15%, 50%)` }}
                    />
                  </div>
                  <span className="relative text-[10px] font-medium text-white/70">
                    {photo.label}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute inset-0 ring-2 ring-inset ring-accent bg-accent/10">
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Month tabs ── */}
      <div className="flex justify-center gap-6 py-3 border-t border-neutral-100 bg-white">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => {
              setActiveMonth(month);
              setSelected(new Set());
            }}
            className={`text-xs font-medium transition-colors ${
              activeMonth === month
                ? "text-neutral-900"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}
