import Card from "@/components/Card";

/* ── Sample data ── */

const recentItems = [
  { name: 'MacBook Pro 16"', category: "Electronics", date: "Today", price: "$2,890.00", icon: <LaptopIcon /> },
  { name: "LG Smart TV", category: "Electronics", date: "10/15/2025", price: "$749.99", icon: <TvIcon /> },
  { name: "Cartier Love Bracelet", category: "Jewelry", date: "10/03/2025", price: "$8,050.00", icon: <GemIcon /> },
  { name: "Engagement Ring", category: "Jewelry", date: null, price: "$18,050.00", icon: <GemIcon /> },
  { name: "Keith Haring Bearbrick", category: "Art & Decor", date: "08/25/2025", price: "$799.99", icon: <ArtIcon /> },
];

const calculationItems = [
  { name: 'MacBook Pro 16"', category: "Electronics", date: "10/24/2025", price: "$2,890.00" },
  { name: "LG Smart TV", category: "Electronics", date: "10/25/2025", price: "$749.99" },
  { name: "Cartier Love Bracelet", category: "Jewelry", date: "10/03/2025", price: "$8,050.00" },
];

/* ── Tiny inline icons ── */

function LaptopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function TvIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20" />
      <path d="M12 22L6 9l6-6 6 6z" />
    </svg>
  );
}

function ArtIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <path d="M17.5 10.5c0 1.38-2.24 2.5-5 2.5s-5-1.12-5-2.5" />
      <path d="M3 19.5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14.5" />
      <path d="M3 19.5h18" />
    </svg>
  );
}

/* ── Stat icons for Overview ── */

function SavedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function ItemsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function ShieldSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ── Main component ── */

export default function DashboardPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[280px_1fr_280px] gap-3 sm:gap-4 md:gap-5">
      {/* ─── Left: Overview ─── */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-neutral-900 mb-6">
          Overview
        </h3>

        {/* EvacLog icon */}
        <div className="mb-1 text-neutral-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 2C10 2 7 5 8 9c1 4 4.5 5.5 4.5 5.5S9 12 8 9c-1-3 1.5-5.5 5.5-7z" />
          </svg>
        </div>

        {/* Big value */}
        <p className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
          $53,300
        </p>
        <p className="text-xs text-neutral-500 mt-1">Estimated Value</p>

        {/* Stat row */}
        <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-neutral-100">
          <div className="text-center">
            <div className="flex justify-center mb-1.5 text-neutral-400">
              <SavedIcon />
            </div>
            <p className="text-2xl font-bold text-neutral-900">76</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Items Saved</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1.5 text-neutral-400">
              <ItemsIcon />
            </div>
            <p className="text-2xl font-bold text-neutral-900">127</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Total Items</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1.5 text-neutral-400">
              <ShieldSmallIcon />
            </div>
            <p className="text-2xl font-bold text-neutral-900">96%</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Protected</p>
          </div>
        </div>
      </Card>

      {/* ─── Middle: Recent Items ─── */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">
          Recent Items
        </h3>

        <div className="divide-y divide-neutral-100">
          {recentItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {item.category}
                    {item.date && ` • ${item.date}`}
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-900 whitespace-nowrap ml-4">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
          >
            View all items
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </Card>

      {/* ─── Right: Calculations ─── */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">
          Calculations
        </h3>

        {/* Sub-card */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-neutral-700 mb-3">
            Your Inventory
          </p>

          <div className="divide-y divide-neutral-200">
            {calculationItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {item.category} • {item.date}
                  </p>
                </div>
                <span className="text-sm font-medium text-neutral-900 whitespace-nowrap ml-3">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 pt-3 border-t border-neutral-200 text-right">
            <p className="text-xl sm:text-2xl font-bold text-neutral-900">$53,300</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Total Value</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
