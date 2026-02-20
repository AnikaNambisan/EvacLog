/**
 * Content that renders inside a PhoneMockup to show the EvacLog
 * mobile dashboard — matching the left iPhone in wireframe slide 11.
 */
export default function MobileDashboardScreen() {
  return (
    <div className="px-5 pb-6 text-left">
      {/* ── EvacLog bird icon ── */}
      <div className="pt-2 pb-3 text-neutral-400">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 4c-4 0-8 3.5-7 9 .6 3.3 3 5.2 5 6.2-2-1.5-4.5-3.8-5-6.2C12 8 15 4.5 20 4z"
            fill="currentColor"
          />
          <path
            d="M22 6c-3 0-5.5 2.5-5 6.5.4 2.5 2 4 3.5 4.8-1.4-1-3-2.8-3.5-4.8C16.5 9 18.5 6 22 6z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* ── Estimated value ── */}
      <p className="text-[32px] font-bold text-neutral-900 leading-none tracking-tight">
        $53,300
      </p>
      <p className="text-[11px] text-neutral-500 mt-1">Estimated Value</p>

      {/* ── Stats row ── */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <StatBox icon={<SavedIcon />} value="76" label="Items Saved" />
        <StatBox icon={<ItemsIcon />} value="127" label="Total Items" />
        <StatBox icon={<ShieldIcon />} value="96%" label="Protected" />
      </div>

      {/* ── Divider ── */}
      <hr className="my-5 border-neutral-100" />

      {/* ── Quick Actions ── */}
      <p className="text-xs font-semibold text-neutral-900 mb-3">
        Quick Actions
      </p>
      <div className="space-y-2">
        <ActionRow icon={<CameraIcon />} label="Add Item From Photos" />
        <ActionRow icon={<DrawerIcon />} label="Add Items Manually" />
        <ActionRow icon={<EyeIcon />} label="View Items" />
      </div>

      {/* ── Divider ── */}
      <hr className="my-5 border-neutral-100" />

      {/* ── Recently Added ── */}
      <p className="text-xs font-semibold text-neutral-900 mb-3">
        Recently Added
      </p>
      <div className="space-y-0 divide-y divide-neutral-100">
        <RecentItem
          name='MacBook Pro 16"'
          category="Electronics"
          date="Today"
          price="$2,890.00"
        />
        <RecentItem
          name="LG Smart TV"
          category="Electronics"
          date="10/10/2025"
          price="$749.99"
        />
        <RecentItem
          name="Cartier Love Bracelet"
          category="Jewelry"
          date="10/03/2025"
          price="$8,050.00"
        />
      </div>
    </div>
  );
}

/* ═══════════ Sub-components ═══════════ */

function StatBox({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-neutral-50 rounded-lg py-3 px-2 text-center">
      <div className="flex justify-center mb-1 text-neutral-400">{icon}</div>
      <p className="text-lg font-bold text-neutral-900 leading-tight">
        {value}
      </p>
      <p className="text-[10px] text-neutral-500 mt-0.5">{label}</p>
    </div>
  );
}

function ActionRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer">
      <div className="text-neutral-500">{icon}</div>
      <span className="text-xs font-medium text-neutral-700">{label}</span>
      <svg
        className="ml-auto text-neutral-300"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}

function RecentItem({
  name,
  category,
  date,
  price,
}: {
  name: string;
  category: string;
  date: string;
  price: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="min-w-0">
        <p className="text-xs font-medium text-neutral-900 truncate">{name}</p>
        <p className="text-[11px] text-neutral-500">
          {category} &middot; {date}
        </p>
      </div>
      <span className="text-xs font-medium text-neutral-900 whitespace-nowrap ml-3">
        {price}
      </span>
    </div>
  );
}

/* ═══════════ Icons ═══════════ */

function SavedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function ItemsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function DrawerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="2" y1="13" x2="22" y2="13" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
