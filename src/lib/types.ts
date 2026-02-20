/* ═══════════════════ Core types ═══════════════════ */

export type Priority = "critical" | "high" | "medium" | "low";

export type Category =
  | "Electronics"
  | "Jewelry"
  | "Furniture"
  | "Art & Decor"
  | "Appliances"
  | "Documents"
  | "Medical"
  | "Clothing"
  | "Kitchen"
  | "Sentimental"
  | "Essentials";

export type Room =
  | "Living Room"
  | "Bedroom"
  | "Office"
  | "Kitchen"
  | "Bathroom"
  | "Dining Room"
  | "Garage"
  | "Hallway"
  | "Guest Room"
  | "Basement";

export interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  purchaseDate: Date;
  store: string;
  room?: Room;
  priority?: Priority;
  isInsured: boolean;
  isSentimental: boolean;
  photos?: string[];
  receiptUrl?: string;
}

/* ═══════════════════ Helpers ═══════════════════ */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function totalValue(items: InventoryItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

export function groupByRoom(
  items: InventoryItem[]
): Record<string, InventoryItem[]> {
  return items.reduce(
    (acc, item) => {
      const room = item.room ?? "Unassigned";
      if (!acc[room]) acc[room] = [];
      acc[room].push(item);
      return acc;
    },
    {} as Record<string, InventoryItem[]>
  );
}

export function groupByCategory(
  items: InventoryItem[]
): Record<string, InventoryItem[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, InventoryItem[]>
  );
}
