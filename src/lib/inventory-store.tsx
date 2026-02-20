"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { InventoryItem, Priority } from "./types";
import { mockInventory } from "./mock-data";

/* ═══════════════════ localStorage persistence ═══════════════════ */

const STORAGE_KEY = "evaclog-inventory";

function serializeState(state: InventoryState): string {
  return JSON.stringify(state, (_, value) => {
    if (value instanceof Date) return { __date: value.toISOString() };
    return value;
  });
}

function deserializeState(json: string): InventoryState | null {
  try {
    return JSON.parse(json, (_, value) => {
      if (value && typeof value === "object" && typeof value.__date === "string") {
        return new Date(value.__date);
      }
      return value;
    });
  } catch {
    return null;
  }
}

/* ═══════════════════ Sort / Filter types ═══════════════════ */

export type SortField = "name" | "price" | "date" | "priority" | "category";
export type SortDirection = "asc" | "desc";

export interface Filters {
  search: string;
  categories: string[];  // multi-select (empty = all)
  room: string;          // "all" or a Room value
  priority: string;      // "all" or a Priority value
  priceMin: number | null;
  priceMax: number | null;
  dateFrom: Date | null;
  dateTo: Date | null;
  insuredOnly: boolean;
  uninsuredOnly: boolean;
  sentimentalOnly: boolean;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: Filters;
  sortField: SortField;
  sortDirection: SortDirection;
}

export interface ChecklistEntry {
  itemId: string;
  grabbed: boolean;
}

/* ═══════════════════ State shape ═══════════════════ */

interface InventoryState {
  items: InventoryItem[];
  filters: Filters;
  sortField: SortField;
  sortDirection: SortDirection;
  checklist: ChecklistEntry[];
  presets: FilterPreset[];
}

export const DEFAULT_FILTERS: Filters = {
  search: "",
  categories: [],
  room: "all",
  priority: "all",
  priceMin: null,
  priceMax: null,
  dateFrom: null,
  dateTo: null,
  insuredOnly: false,
  uninsuredOnly: false,
  sentimentalOnly: false,
};

const initialState: InventoryState = {
  items: mockInventory,
  filters: DEFAULT_FILTERS,
  sortField: "date",
  sortDirection: "desc",
  checklist: mockInventory
    .filter((i) => i.priority === "critical" || i.priority === "high")
    .map((i) => ({ itemId: i.id, grabbed: false })),
  presets: [],
};

/* ═══════════════════ Actions ═══════════════════ */

type Action =
  | { type: "ADD_ITEM"; item: InventoryItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_ITEM"; id: string; updates: Partial<InventoryItem> }
  | { type: "SET_FILTERS"; filters: Partial<Filters> }
  | { type: "RESET_FILTERS" }
  | { type: "SET_SORT"; field: SortField; direction: SortDirection }
  | { type: "TOGGLE_GRABBED"; itemId: string }
  | { type: "RESET_CHECKLIST" }
  | { type: "SAVE_PRESET"; preset: FilterPreset }
  | { type: "DELETE_PRESET"; id: string }
  | { type: "LOAD_PRESET"; preset: FilterPreset };

function reducer(state: InventoryState, action: Action): InventoryState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [action.item, ...state.items] };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
        checklist: state.checklist.filter((c) => c.itemId !== action.id),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, ...action.updates } : i
        ),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.filters },
      };

    case "RESET_FILTERS":
      return { ...state, filters: DEFAULT_FILTERS };

    case "SET_SORT":
      return {
        ...state,
        sortField: action.field,
        sortDirection: action.direction,
      };

    case "TOGGLE_GRABBED":
      return {
        ...state,
        checklist: state.checklist.map((c) =>
          c.itemId === action.itemId ? { ...c, grabbed: !c.grabbed } : c
        ),
      };

    case "RESET_CHECKLIST":
      return {
        ...state,
        checklist: state.checklist.map((c) => ({ ...c, grabbed: false })),
      };

    case "SAVE_PRESET":
      return {
        ...state,
        presets: [...state.presets, action.preset],
      };

    case "DELETE_PRESET":
      return {
        ...state,
        presets: state.presets.filter((p) => p.id !== action.id),
      };

    case "LOAD_PRESET":
      return {
        ...state,
        filters: action.preset.filters,
        sortField: action.preset.sortField,
        sortDirection: action.preset.sortDirection,
      };

    default:
      return state;
  }
}

/* ═══════════════════ Sorting helpers ═══════════════════ */

const PRIORITY_RANK: Record<Priority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

function sortItems(
  items: InventoryItem[],
  field: SortField,
  direction: SortDirection
): InventoryItem[] {
  const sorted = [...items].sort((a, b) => {
    switch (field) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return a.price - b.price;
      case "date":
        return a.purchaseDate.getTime() - b.purchaseDate.getTime();
      case "priority": {
        const pa = PRIORITY_RANK[a.priority ?? "low"];
        const pb = PRIORITY_RANK[b.priority ?? "low"];
        return pa - pb;
      }
      case "category":
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

/* ═══════════════════ Filter helper ═══════════════════ */

function filterItems(
  items: InventoryItem[],
  filters: Filters
): InventoryItem[] {
  return items.filter((item) => {
    if (
      filters.search &&
      !item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.category.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.store.toLowerCase().includes(filters.search.toLowerCase()) &&
      !(item.room ?? "").toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(item.category))
      return false;
    if (filters.room !== "all" && item.room !== filters.room) return false;
    if (
      filters.priority !== "all" &&
      item.priority !== filters.priority
    )
      return false;
    if (filters.priceMin != null && item.price < filters.priceMin) return false;
    if (filters.priceMax != null && item.price > filters.priceMax) return false;
    if (filters.dateFrom != null && item.purchaseDate < filters.dateFrom) return false;
    if (filters.dateTo != null && item.purchaseDate > filters.dateTo) return false;
    if (filters.insuredOnly && !item.isInsured) return false;
    if (filters.uninsuredOnly && item.isInsured) return false;
    if (filters.sentimentalOnly && !item.isSentimental) return false;
    return true;
  });
}

/* ═══════════════════ Context ═══════════════════ */

interface InventoryContextValue {
  /* ── Raw state ── */
  items: InventoryItem[];
  filters: Filters;
  sortField: SortField;
  sortDirection: SortDirection;
  checklist: ChecklistEntry[];

  /* ── Derived / computed ── */
  filteredItems: InventoryItem[];
  recentItems: InventoryItem[];
  totalValue: number;
  totalCount: number;
  insuredCount: number;
  insuredPercentage: number;
  grabbedCount: number;
  checklistTotal: number;
  categories: string[];
  rooms: string[];

  /* ── Presets ── */
  presets: FilterPreset[];

  /* ── Actions ── */
  addItem: (item: Omit<InventoryItem, "id">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  setSort: (field: SortField, direction?: SortDirection) => void;
  toggleGrabbed: (itemId: string) => void;
  resetChecklist: () => void;
  exportInventory: () => void;
  savePreset: (name: string) => void;
  deletePreset: (id: string) => void;
  loadPreset: (preset: FilterPreset) => void;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

/* ═══════════════════ Provider ═══════════════════ */

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (typeof window === "undefined") return initialState;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    return deserializeState(stored) ?? initialState;
  });

  // Persist state to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeState(state));
  }, [state]);

  /* ── Derived values ── */

  const filteredItems = useMemo(
    () =>
      sortItems(
        filterItems(state.items, state.filters),
        state.sortField,
        state.sortDirection
      ),
    [state.items, state.filters, state.sortField, state.sortDirection]
  );

  const recentItems = useMemo(
    () =>
      [...state.items]
        .sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime())
        .slice(0, 5),
    [state.items]
  );

  const totalVal = useMemo(
    () => state.items.reduce((s, i) => s + i.price, 0),
    [state.items]
  );

  const insuredCount = useMemo(
    () => state.items.filter((i) => i.isInsured).length,
    [state.items]
  );

  const categories = useMemo(
    () => Array.from(new Set(state.items.map((i) => i.category))).sort(),
    [state.items]
  );

  const rooms = useMemo(
    () =>
      Array.from(new Set(state.items.map((i) => i.room).filter(Boolean))).sort() as string[],
    [state.items]
  );

  const grabbedCount = useMemo(
    () => state.checklist.filter((c) => c.grabbed).length,
    [state.checklist]
  );

  /* ── Actions ── */

  const addItem = useCallback(
    (item: Omit<InventoryItem, "id">) => {
      const id = `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      dispatch({ type: "ADD_ITEM", item: { ...item, id } as InventoryItem });
    },
    []
  );

  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE_ITEM", id }),
    []
  );

  const updateItem = useCallback(
    (id: string, updates: Partial<InventoryItem>) =>
      dispatch({ type: "UPDATE_ITEM", id, updates }),
    []
  );

  const setFilters = useCallback(
    (filters: Partial<Filters>) =>
      dispatch({ type: "SET_FILTERS", filters }),
    []
  );

  const resetFilters = useCallback(
    () => dispatch({ type: "RESET_FILTERS" }),
    []
  );

  const setSort = useCallback(
    (field: SortField, direction?: SortDirection) => {
      // Toggle direction if clicking the same field
      const dir =
        direction ??
        (state.sortField === field && state.sortDirection === "asc"
          ? "desc"
          : "asc");
      dispatch({ type: "SET_SORT", field, direction: dir });
    },
    [state.sortField, state.sortDirection]
  );

  const toggleGrabbed = useCallback(
    (itemId: string) => dispatch({ type: "TOGGLE_GRABBED", itemId }),
    []
  );

  const resetChecklist = useCallback(
    () => dispatch({ type: "RESET_CHECKLIST" }),
    []
  );

  const savePreset = useCallback(
    (name: string) => {
      const preset: FilterPreset = {
        id: `preset-${Date.now()}`,
        name,
        filters: { ...state.filters },
        sortField: state.sortField,
        sortDirection: state.sortDirection,
      };
      dispatch({ type: "SAVE_PRESET", preset });
    },
    [state.filters, state.sortField, state.sortDirection]
  );

  const deletePreset = useCallback(
    (id: string) => dispatch({ type: "DELETE_PRESET", id }),
    []
  );

  const loadPreset = useCallback(
    (preset: FilterPreset) => dispatch({ type: "LOAD_PRESET", preset }),
    []
  );

  const exportInventory = useCallback(() => {
    const now = new Date().toLocaleString();
    const rows = state.items
      .sort((a, b) => b.price - a.price)
      .map(
        (i) =>
          `<tr>
            <td>${i.name}</td>
            <td>${i.category}</td>
            <td>${i.room ?? "—"}</td>
            <td>$${i.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td>${i.isInsured ? "Yes" : "No"}</td>
            <td>${i.store}</td>
          </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html><head><title>EvacLog Inventory Export</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111827; padding: 40px; max-width: 900px; margin: 0 auto; }
  h1 { font-size: 20px; margin-bottom: 4px; }
  .sub { font-size: 12px; color: #6b7280; margin-bottom: 20px; }
  .stats { display: flex; gap: 24px; margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
  .stat-val { font-size: 22px; font-weight: 700; }
  .stat-lbl { font-size: 11px; color: #6b7280; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 16px; }
  th { text-align: left; font-weight: 600; padding: 8px; background: #f9fafb; border-bottom: 2px solid #e5e7eb; }
  td { padding: 8px; border-bottom: 1px solid #f3f4f6; }
  .footer { margin-top: 32px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 12px; }
  @media print { body { padding: 20px; } }
</style></head><body>
<h1>EvacLog — Full Inventory Export</h1>
<p class="sub">Generated ${now} · ${state.items.length} items</p>
<div class="stats">
  <div><div class="stat-val">$${totalVal.toLocaleString("en-US")}</div><div class="stat-lbl">Total Value</div></div>
  <div><div class="stat-val">${state.items.length}</div><div class="stat-lbl">Items</div></div>
  <div><div class="stat-val">${insuredCount}</div><div class="stat-lbl">Insured</div></div>
  <div><div class="stat-val">${Math.round((insuredCount / state.items.length) * 100)}%</div><div class="stat-lbl">Protected</div></div>
</div>
<table><thead><tr><th>Item</th><th>Category</th><th>Room</th><th>Value</th><th>Insured</th><th>Store</th></tr></thead>
<tbody>${rows}</tbody></table>
<div class="footer">This report was generated by EvacLog for insurance and personal documentation.</div>
</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  }, [state.items, totalVal, insuredCount]);

  /* ── Context value ── */

  const value = useMemo<InventoryContextValue>(
    () => ({
      items: state.items,
      filters: state.filters,
      sortField: state.sortField,
      sortDirection: state.sortDirection,
      checklist: state.checklist,

      filteredItems,
      recentItems,
      totalValue: totalVal,
      totalCount: state.items.length,
      insuredCount,
      insuredPercentage:
        state.items.length > 0
          ? Math.round((insuredCount / state.items.length) * 100)
          : 0,
      grabbedCount,
      checklistTotal: state.checklist.length,
      categories,
      rooms,
      presets: state.presets,

      addItem,
      removeItem,
      updateItem,
      setFilters,
      resetFilters,
      setSort,
      toggleGrabbed,
      resetChecklist,
      exportInventory,
      savePreset,
      deletePreset,
      loadPreset,
    }),
    [
      state,
      filteredItems,
      recentItems,
      totalVal,
      insuredCount,
      grabbedCount,
      categories,
      rooms,
      addItem,
      removeItem,
      updateItem,
      setFilters,
      resetFilters,
      setSort,
      toggleGrabbed,
      resetChecklist,
      exportInventory,
      savePreset,
      deletePreset,
      loadPreset,
    ]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

/* ═══════════════════ Hook ═══════════════════ */

export function useInventory(): InventoryContextValue {
  const ctx = useContext(InventoryContext);
  if (!ctx) {
    throw new Error("useInventory must be used within an <InventoryProvider>");
  }
  return ctx;
}
