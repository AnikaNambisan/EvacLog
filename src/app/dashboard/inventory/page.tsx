"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useInventory,
  type SortField,
  type SortDirection,
} from "@/lib/inventory-store";
import { formatCurrency, formatDate } from "@/lib/types";

/* ═══════════════════ Constants ═══════════════════ */

const SORT_OPTIONS: { label: string; field: SortField; direction: SortDirection }[] = [
  { label: "Price: High → Low", field: "price", direction: "desc" },
  { label: "Price: Low → High", field: "price", direction: "asc" },
  { label: "Date: Newest", field: "date", direction: "desc" },
  { label: "Date: Oldest", field: "date", direction: "asc" },
  { label: "Name: A → Z", field: "name", direction: "asc" },
  { label: "Name: Z → A", field: "name", direction: "desc" },
  { label: "Priority: Highest", field: "priority", direction: "asc" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Electronics: "bg-blue-50 text-blue-700 ring-blue-200",
  Jewelry: "bg-purple-50 text-purple-700 ring-purple-200",
  Furniture: "bg-amber-50 text-amber-700 ring-amber-200",
  "Art & Decor": "bg-pink-50 text-pink-700 ring-pink-200",
  Appliances: "bg-slate-50 text-slate-700 ring-slate-200",
  Documents: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  Medical: "bg-red-50 text-red-700 ring-red-200",
  Clothing: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Kitchen: "bg-orange-50 text-orange-700 ring-orange-200",
  Sentimental: "bg-rose-50 text-rose-700 ring-rose-200",
  Essentials: "bg-green-50 text-green-700 ring-green-200",
};

/* ═══════════════════ Page ═══════════════════ */

export default function InventoryPage() {
  const {
    items,
    filters,
    sortField,
    sortDirection,
    filteredItems,
    categories,
    rooms,
    setFilters,
    resetFilters,
    setSort,
    presets,
    savePreset,
    deletePreset,
    loadPreset,
  } = useInventory();

  const [showFilters, setShowFilters] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [showPresetInput, setShowPresetInput] = useState(false);

  /* ── Price range hints ── */
  const priceRange = useMemo(() => {
    if (items.length === 0) return { min: 0, max: 0 };
    const prices = items.map((i) => i.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [items]);

  /* ── Active filter count ── */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count++;
    if (filters.room !== "all") count++;
    if (filters.priority !== "all") count++;
    if (filters.priceMin != null) count++;
    if (filters.priceMax != null) count++;
    if (filters.dateFrom != null) count++;
    if (filters.dateTo != null) count++;
    if (filters.insuredOnly) count++;
    if (filters.uninsuredOnly) count++;
    if (filters.sentimentalOnly) count++;
    return count;
  }, [filters]);

  /* ── Active filter chips ── */
  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];

    if (filters.search) {
      chips.push({
        key: "search",
        label: `"${filters.search}"`,
        onRemove: () => setFilters({ search: "" }),
      });
    }
    filters.categories.forEach((cat) => {
      chips.push({
        key: `cat-${cat}`,
        label: cat,
        onRemove: () =>
          setFilters({
            categories: filters.categories.filter((c) => c !== cat),
          }),
      });
    });
    if (filters.room !== "all") {
      chips.push({
        key: "room",
        label: filters.room,
        onRemove: () => setFilters({ room: "all" }),
      });
    }
    if (filters.priority !== "all") {
      chips.push({
        key: "priority",
        label: `Priority: ${filters.priority}`,
        onRemove: () => setFilters({ priority: "all" }),
      });
    }
    if (filters.priceMin != null || filters.priceMax != null) {
      const min = filters.priceMin != null ? formatCurrency(filters.priceMin) : "any";
      const max = filters.priceMax != null ? formatCurrency(filters.priceMax) : "any";
      chips.push({
        key: "price",
        label: `Price: ${min} – ${max}`,
        onRemove: () => setFilters({ priceMin: null, priceMax: null }),
      });
    }
    if (filters.dateFrom != null || filters.dateTo != null) {
      const from = filters.dateFrom ? formatDate(filters.dateFrom) : "any";
      const to = filters.dateTo ? formatDate(filters.dateTo) : "any";
      chips.push({
        key: "date",
        label: `Date: ${from} – ${to}`,
        onRemove: () => setFilters({ dateFrom: null, dateTo: null }),
      });
    }
    if (filters.insuredOnly) {
      chips.push({
        key: "insured",
        label: "Insured only",
        onRemove: () => setFilters({ insuredOnly: false }),
      });
    }
    if (filters.uninsuredOnly) {
      chips.push({
        key: "uninsured",
        label: "Uninsured only",
        onRemove: () => setFilters({ uninsuredOnly: false }),
      });
    }
    if (filters.sentimentalOnly) {
      chips.push({
        key: "sentimental",
        label: "Sentimental only",
        onRemove: () => setFilters({ sentimentalOnly: false }),
      });
    }
    return chips;
  }, [filters, setFilters]);

  /* ── Sort change handler ── */
  const handleSortChange = (value: string) => {
    const opt = SORT_OPTIONS[parseInt(value)];
    if (opt) setSort(opt.field, opt.direction);
  };

  const currentSortIndex = SORT_OPTIONS.findIndex(
    (o) => o.field === sortField && o.direction === sortDirection
  );

  /* ── Save preset handler ── */
  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    savePreset(presetName.trim());
    setPresetName("");
    setShowPresetInput(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-neutral-400 hover:text-accent transition-colors p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Back to dashboard"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Inventory
              </h1>
              <p className="mt-0.5 text-sm text-neutral-500">
                {items.length} items · {formatCurrency(items.reduce((s, i) => s + i.price, 0))} total value
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ═══════════════════ Search Bar ═══════════════════ */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder="Search by name, category, room, or store…"
            className="w-full pl-11 pr-10 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent min-h-[44px]"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({ search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* ═══════════════════ Filter Toggle + Sort ═══════════════════ */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border transition-colors min-h-[44px] ${
              showFilters || activeFilterCount > 0
                ? "border-accent bg-accent/5 text-accent"
                : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={currentSortIndex >= 0 ? currentSortIndex : 0}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 pl-3 pr-8 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent cursor-pointer"
            >
              {SORT_OPTIONS.map((opt, i) => (
                <option key={i} value={i}>
                  {opt.label}
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
        </div>

        {/* ═══════════════════ Filter Panel ═══════════════════ */}
        {showFilters && (
          <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 space-y-6 animate-fade-in-up" style={{ animationDuration: "0.2s" }}>
            {/* Category multi-select */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-neutral-900">Categories</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilters({ categories: [...categories] })}
                    className="text-xs text-accent hover:text-accent-dark font-medium"
                  >
                    All
                  </button>
                  <span className="text-neutral-300">·</span>
                  <button
                    onClick={() => setFilters({ categories: [] })}
                    className="text-xs text-accent hover:text-accent-dark font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const active = filters.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        const next = active
                          ? filters.categories.filter((c) => c !== cat)
                          : [...filters.categories, cat];
                        setFilters({ categories: next });
                      }}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors min-h-[32px] ${
                        active
                          ? "border-accent bg-accent text-white"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Room + Priority dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-1.5">Room</label>
                <div className="relative">
                  <select
                    value={filters.room}
                    onChange={(e) => setFilters({ room: e.target.value })}
                    className="appearance-none w-full bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 pl-3 pr-8 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent cursor-pointer"
                  >
                    <option value="all">All Rooms</option>
                    {rooms.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-1.5">Priority</label>
                <div className="relative">
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ priority: e.target.value })}
                    className="appearance-none w-full bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 pl-3 pr-8 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent cursor-pointer"
                  >
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>
            </div>

            {/* Price range */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-1.5">
                Price range
                <span className="ml-2 text-xs font-normal text-neutral-400">
                  {formatCurrency(priceRange.min)} – {formatCurrency(priceRange.max)}
                </span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin ?? ""}
                  onChange={(e) =>
                    setFilters({ priceMin: e.target.value ? Number(e.target.value) : null })
                  }
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax ?? ""}
                  onChange={(e) =>
                    setFilters({ priceMax: e.target.value ? Number(e.target.value) : null })
                  }
                  className="input-field"
                />
              </div>
            </div>

            {/* Date range */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-1.5">Purchase date range</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={filters.dateFrom ? toDateString(filters.dateFrom) : ""}
                  onChange={(e) =>
                    setFilters({ dateFrom: e.target.value ? new Date(e.target.value + "T00:00:00") : null })
                  }
                  className="input-field"
                />
                <input
                  type="date"
                  value={filters.dateTo ? toDateString(filters.dateTo) : ""}
                  onChange={(e) =>
                    setFilters({ dateTo: e.target.value ? new Date(e.target.value + "T23:59:59") : null })
                  }
                  className="input-field"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <Toggle
                label="Only uninsured"
                description="Show only items that are not insured"
                checked={filters.uninsuredOnly}
                onChange={(val) => setFilters({ uninsuredOnly: val, ...(val ? { insuredOnly: false } : {}) })}
              />
              <Toggle
                label="Only sentimental"
                description="Show only items with sentimental value"
                checked={filters.sentimentalOnly}
                onChange={(val) => setFilters({ sentimentalOnly: val })}
              />
            </div>
          </div>
        )}

        {/* ═══════════════════ Active Filter Chips ═══════════════════ */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-accent/10 text-accent rounded-full pl-3 pr-1.5 py-1.5"
              >
                {chip.label}
                <button
                  onClick={chip.onRemove}
                  className="w-5 h-5 rounded-full hover:bg-accent/20 flex items-center justify-center transition-colors"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs font-medium text-accent hover:text-accent-dark transition-colors px-2 py-1"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ═══════════════════ Saved Presets ═══════════════════ */}
        {(presets.length > 0 || activeFilterCount > 0) && (
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((preset) => (
              <span
                key={preset.id}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-neutral-200 rounded-full pl-3 pr-1.5 py-1.5 hover:border-accent/30 transition-colors"
              >
                <button
                  onClick={() => loadPreset(preset)}
                  className="hover:text-accent transition-colors"
                >
                  {preset.name}
                </button>
                <button
                  onClick={() => deletePreset(preset.id)}
                  className="w-5 h-5 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors text-neutral-400 hover:text-neutral-600"
                  aria-label={`Delete preset ${preset.name}`}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}
            {activeFilterCount > 0 && !showPresetInput && (
              <button
                onClick={() => setShowPresetInput(true)}
                className="text-xs font-medium text-neutral-500 hover:text-accent border border-dashed border-neutral-300 hover:border-accent rounded-full px-3 py-1.5 transition-colors"
              >
                Save filters
              </button>
            )}
            {showPresetInput && (
              <span className="inline-flex items-center gap-1.5">
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSavePreset()}
                  placeholder="Preset name…"
                  className="text-xs border border-neutral-200 rounded-full px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  autoFocus
                />
                <button
                  onClick={handleSavePreset}
                  className="text-xs font-medium text-accent hover:text-accent-dark"
                >
                  Save
                </button>
                <button
                  onClick={() => { setShowPresetInput(false); setPresetName(""); }}
                  className="text-xs text-neutral-400 hover:text-neutral-600"
                >
                  Cancel
                </button>
              </span>
            )}
          </div>
        )}

        {/* ═══════════════════ Results Count ═══════════════════ */}
        <p className="text-sm text-neutral-500">
          Showing {filteredItems.length} of {items.length} items
        </p>

        {/* ═══════════════════ Item Cards ═══════════════════ */}
        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const catColor = CATEGORY_COLORS[item.category] ?? "bg-neutral-50 text-neutral-700 ring-neutral-200";
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-neutral-900">
                          {item.name}
                        </h3>
                        <span className={`inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full ring-1 ${catColor}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-neutral-500">
                        {item.room && (
                          <span className="inline-flex items-center gap-1">
                            <svg className="shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            {item.room}
                          </span>
                        )}
                        <span>{formatDate(item.purchaseDate)}</span>
                        <span>{item.store}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-sm font-bold text-neutral-900">
                        {formatCurrency(item.price)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            item.isInsured
                              ? "bg-green-50 text-green-700"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {item.isInsured ? (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          ) : (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          )}
                          {item.isInsured ? "Insured" : "Uninsured"}
                        </span>
                        {item.isSentimental && (
                          <span className="text-rose-500" title="Sentimental value">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-sm text-neutral-500 mb-3">No items match the current filters.</p>
            <button
              onClick={resetFilters}
              className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════ Sub-components ═══════════════════ */

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 min-w-[44px] min-h-[44px] ${
          checked ? "bg-accent" : "bg-neutral-200"
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[26px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </div>
  );
}

function ChevronDown() {
  return (
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
  );
}

/* ═══════════════════ Helpers ═══════════════════ */

function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
