"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useToast } from "@/components/Toast";

/* ═══════════════════ Types ═══════════════════ */

type Priority = "critical" | "high" | "medium" | "low";

interface ChecklistItem {
  id: string;
  name: string;
  location: string;
  room: string;
  category: string;
  priority: Priority;
  estimatedValue: number;
  grabbed: boolean;
}

/* ═══════════════════ Data ═══════════════════ */

const PRIORITY_ORDER: Record<Priority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

const PRIORITY_STYLES: Record<
  Priority,
  { badge: string; dot: string; label: string }
> = {
  critical: {
    badge: "bg-red-50 text-red-700 ring-1 ring-red-200",
    dot: "bg-red-500",
    label: "Critical",
  },
  high: {
    badge: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    dot: "bg-orange-500",
    label: "High",
  },
  medium: {
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500",
    label: "Medium",
  },
  low: {
    badge: "bg-neutral-50 text-neutral-600 ring-1 ring-neutral-200",
    dot: "bg-neutral-400",
    label: "Low",
  },
};

const initialItems: ChecklistItem[] = [
  {
    id: "1",
    name: "Important Documents",
    location: "Bedroom Safe",
    room: "Bedroom",
    category: "Documents",
    priority: "critical",
    estimatedValue: 0,
    grabbed: false,
  },
  {
    id: "2",
    name: "Passports & IDs",
    location: "Bedroom Safe — Top Drawer",
    room: "Bedroom",
    category: "Documents",
    priority: "critical",
    estimatedValue: 0,
    grabbed: false,
  },
  {
    id: "3",
    name: "MacBook Pro 16\"",
    location: "Office Desk",
    room: "Office",
    category: "Electronics",
    priority: "high",
    estimatedValue: 2890,
    grabbed: false,
  },
  {
    id: "4",
    name: "External Hard Drive",
    location: "Office Desk — Right Drawer",
    room: "Office",
    category: "Electronics",
    priority: "high",
    estimatedValue: 189,
    grabbed: false,
  },
  {
    id: "5",
    name: "Engagement Ring",
    location: "Closet Safe",
    room: "Bedroom",
    category: "Jewelry",
    priority: "high",
    estimatedValue: 18050,
    grabbed: false,
  },
  {
    id: "6",
    name: "Family Photos",
    location: "Living Room — Dining Table",
    room: "Living Room",
    category: "Sentimental",
    priority: "medium",
    estimatedValue: 0,
    grabbed: true,
  },
  {
    id: "7",
    name: "Cartier Love Bracelet",
    location: "Jewelry Box — Master Bath",
    room: "Bathroom",
    category: "Jewelry",
    priority: "medium",
    estimatedValue: 8050,
    grabbed: true,
  },
  {
    id: "8",
    name: "Prescription Medications",
    location: "Medicine Cabinet",
    room: "Bathroom",
    category: "Medical",
    priority: "critical",
    estimatedValue: 0,
    grabbed: false,
  },
  {
    id: "9",
    name: "Pet Carrier & Supplies",
    location: "Hallway Closet",
    room: "Hallway",
    category: "Essentials",
    priority: "high",
    estimatedValue: 120,
    grabbed: false,
  },
  {
    id: "10",
    name: "Camera Equipment",
    location: "Office Shelf",
    room: "Office",
    category: "Electronics",
    priority: "medium",
    estimatedValue: 3200,
    grabbed: false,
  },
  {
    id: "11",
    name: "Emergency Cash",
    location: "Kitchen Drawer",
    room: "Kitchen",
    category: "Essentials",
    priority: "high",
    estimatedValue: 500,
    grabbed: true,
  },
  {
    id: "12",
    name: "Winter Coats",
    location: "Front Closet",
    room: "Hallway",
    category: "Clothing",
    priority: "low",
    estimatedValue: 450,
    grabbed: false,
  },
];

/* ═══════════════════ Helpers ═══════════════════ */

function formatCurrency(n: number): string {
  if (n === 0) return "—";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

/* ═══════════════════ Component ═══════════════════ */

export default function EmergencyChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [filterRoom, setFilterRoom] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const printRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  // Unique rooms & categories for filters
  const rooms = useMemo(
    () => Array.from(new Set(items.map((i) => i.room))).sort(),
    [items]
  );
  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items]
  );

  // Filtered + sorted items
  const filtered = useMemo(() => {
    return items
      .filter((i) => filterRoom === "all" || i.room === filterRoom)
      .filter(
        (i) => filterCategory === "all" || i.category === filterCategory
      )
      .sort((a, b) => {
        // Grabbed items sink to bottom
        if (a.grabbed !== b.grabbed) return a.grabbed ? 1 : -1;
        // Then sort by priority
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      });
  }, [items, filterRoom, filterCategory]);

  // Stats
  const totalCount = items.length;
  const grabbedCount = items.filter((i) => i.grabbed).length;
  const progressPct = (grabbedCount / totalCount) * 100;
  const totalValue = items
    .filter((i) => i.grabbed)
    .reduce((s, i) => s + i.estimatedValue, 0);
  const criticalRemaining = items.filter(
    (i) => i.priority === "critical" && !i.grabbed
  ).length;

  const toggle = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, grabbed: !item.grabbed } : item
      );
      // Toast when all items are secured
      const allGrabbed = next.every((i) => i.grabbed);
      if (allGrabbed) {
        setTimeout(() => addToast("success", "All items secured! Ready to export."), 100);
      }
      return next;
    });
  }, [addToast]);

  // PDF export via print
  const handleExport = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const grabbed = items.filter((i) => i.grabbed);
    const notGrabbed = items.filter((i) => !i.grabbed);
    const now = new Date().toLocaleString();

    printWindow.document.write(`<!DOCTYPE html>
<html><head><title>EvacLog — Emergency Insurance Report</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111827; padding: 40px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  .subtitle { color: #6b7280; font-size: 13px; margin-bottom: 24px; }
  .stat-row { display: flex; gap: 32px; margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
  .stat { text-align: center; }
  .stat-value { font-size: 24px; font-weight: 700; }
  .stat-label { font-size: 11px; color: #6b7280; margin-top: 2px; }
  h2 { font-size: 15px; font-weight: 600; margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; font-weight: 600; padding: 8px 12px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  td { padding: 8px 12px; border-bottom: 1px solid #f3f4f6; }
  .priority-critical { color: #b91c1c; font-weight: 600; }
  .priority-high { color: #c2410c; font-weight: 600; }
  .priority-medium { color: #b45309; }
  .priority-low { color: #6b7280; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; }
  @media print { body { padding: 20px; } }
</style></head><body>
<h1>EvacLog — Emergency Insurance Report</h1>
<p class="subtitle">Generated ${now}</p>
<div class="stat-row">
  <div class="stat"><div class="stat-value">${grabbedCount}/${totalCount}</div><div class="stat-label">Items Secured</div></div>
  <div class="stat"><div class="stat-value">${formatCurrency(totalValue)}</div><div class="stat-label">Secured Value</div></div>
  <div class="stat"><div class="stat-value">${criticalRemaining}</div><div class="stat-label">Critical Remaining</div></div>
</div>
<h2>Secured Items (${grabbed.length})</h2>
<table><thead><tr><th>Item</th><th>Location</th><th>Priority</th><th>Est. Value</th></tr></thead><tbody>
${grabbed
  .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  .map(
    (i) =>
      `<tr><td>${i.name}</td><td>${i.location}</td><td class="priority-${i.priority}">${PRIORITY_STYLES[i.priority].label}</td><td>${formatCurrency(i.estimatedValue)}</td></tr>`
  )
  .join("")}
</tbody></table>
<h2>Not Yet Secured (${notGrabbed.length})</h2>
<table><thead><tr><th>Item</th><th>Location</th><th>Priority</th><th>Est. Value</th></tr></thead><tbody>
${notGrabbed
  .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  .map(
    (i) =>
      `<tr><td>${i.name}</td><td>${i.location}</td><td class="priority-${i.priority}">${PRIORITY_STYLES[i.priority].label}</td><td>${formatCurrency(i.estimatedValue)}</td></tr>`
  )
  .join("")}
</tbody></table>
<div class="footer">
  <p>This report was generated by EvacLog for insurance documentation purposes.</p>
  <p>Total inventory value (all items): ${formatCurrency(items.reduce((s, i) => s + i.estimatedValue, 0))}</p>
</div>
</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    addToast("success", "Insurance report generated");
  }, [items, grabbedCount, totalCount, totalValue, criticalRemaining, addToast]);

  return (
    <div ref={printRef}>
      {/* ── Header bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
              Emergency Active
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Emergency Checklist
          </h2>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-accent text-white text-xs sm:text-sm font-medium px-3 sm:px-5 py-3 rounded-lg hover:bg-accent-dark transition-colors shrink-0 min-h-[44px]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Export for Insurance
        </button>
      </div>

      {/* ── Progress + Stats ── */}
      <div className="bg-neutral-50 rounded-xl p-5 sm:p-6 mb-6">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-semibold text-neutral-900">
            {grabbedCount} of {totalCount} items secured
          </span>
          <span className="text-sm font-bold text-accent">
            {Math.round(progressPct)}%
          </span>
        </div>
        <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPct}%`,
              background:
                progressPct === 100
                  ? "#22c55e"
                  : progressPct > 50
                    ? "#2B6777"
                    : "#ef4444",
            }}
          />
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-3 mt-4">
          {criticalRemaining > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-full px-3 py-1.5 ring-1 ring-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {criticalRemaining} critical remaining
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 bg-white rounded-full px-3 py-1.5 ring-1 ring-neutral-200">
            Secured value: {formatCurrency(totalValue)}
          </div>
          {progressPct === 100 && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-full px-3 py-1.5 ring-1 ring-green-200">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              All items secured
            </div>
          )}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <label className="sr-only" htmlFor="filter-room">Filter by room</label>
          <select
            id="filter-room"
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="appearance-none bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 pl-3 pr-8 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent cursor-pointer"
          >
            <option value="all">All Rooms</option>
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div className="relative">
          <label className="sr-only" htmlFor="filter-category">Filter by category</label>
          <select
            id="filter-category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 pl-3 pr-8 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {(filterRoom !== "all" || filterCategory !== "all") && (
          <button
            onClick={() => {
              setFilterRoom("all");
              setFilterCategory("all");
            }}
            className="text-xs font-medium text-accent hover:text-accent-dark transition-colors px-3 py-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Checklist items ── */}
      <div className="space-y-2">
        {filtered.map((item) => {
          const ps = PRIORITY_STYLES[item.priority];
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`w-full text-left flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all group min-h-[44px] ${
                item.grabbed
                  ? "bg-neutral-50/80 border-neutral-100"
                  : item.priority === "critical"
                    ? "bg-white border-red-100 hover:border-red-200 hover:shadow-sm"
                    : "bg-white border-neutral-200 hover:border-accent/20 hover:shadow-sm"
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-6 h-6 mt-0.5 rounded-md shrink-0 flex items-center justify-center transition-colors ${
                  item.grabbed
                    ? "bg-accent"
                    : item.priority === "critical"
                      ? "border-2 border-red-300 group-hover:border-red-400"
                      : "border-2 border-neutral-300 group-hover:border-accent"
                }`}
              >
                {item.grabbed && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium transition-colors ${
                        item.grabbed
                          ? "text-neutral-400 line-through"
                          : "text-neutral-900"
                      }`}
                    >
                      {item.name}
                    </p>
                    {/* Location hint */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg
                        className={`shrink-0 ${item.grabbed ? "text-neutral-300" : "text-neutral-400"}`}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span
                        className={`text-xs ${
                          item.grabbed ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Priority badge + value */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        item.grabbed ? "bg-neutral-100 text-neutral-400 ring-0" : ps.badge
                      }`}
                    >
                      {!item.grabbed && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${ps.dot}`}
                        />
                      )}
                      {item.grabbed ? "Grabbed" : ps.label}
                    </span>
                    {item.estimatedValue > 0 && (
                      <span
                        className={`text-xs font-medium ${
                          item.grabbed ? "text-neutral-400" : "text-neutral-600"
                        }`}
                      >
                        {formatCurrency(item.estimatedValue)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-sm">No items match the current filters.</p>
            <button
              onClick={() => {
                setFilterRoom("all");
                setFilterCategory("all");
              }}
              className="text-sm font-medium text-accent hover:text-accent-dark mt-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
