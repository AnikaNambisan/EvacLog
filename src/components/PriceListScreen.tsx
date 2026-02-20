/**
 * Price List screen content for inside a PhoneMockup.
 * Matches the right iPhone in wireframe slide 11.
 */

const items = [
  { name: "LG 65\" Smart TV", price: "$1,749.99" },
  { name: "Dyson Smart Lamp", price: "$549.00" },
  { name: "IKEA Leather Couch", price: "$1,899.00" },
  { name: "Blue Eames Ottoman", price: "$1,495.00" },
  { name: "Sony Soundbar", price: "$649.99" },
  { name: "Apple TV 4K", price: "$179.00" },
  { name: "Wool Area Rug", price: "$420.00" },
  { name: "Ceramic Table Lamp", price: "$189.00" },
  { name: "Walnut Coffee Table", price: "$875.00" },
  { name: "Throw Pillow Set", price: "$344.02" },
];

export default function PriceListScreen() {
  return (
    <div className="flex flex-col h-full">
      {/* ── Nav bar ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100">
        <button className="text-neutral-400 -ml-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-neutral-900 flex-1 text-center pr-4">
          Price List
        </span>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero room image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsl(25, 30%, 65%) 0%, hsl(30, 25%, 50%) 50%, hsl(20, 20%, 40%) 100%)",
            }}
          >
            {/* Decorative room silhouettes */}
            <div className="absolute inset-0 opacity-20">
              {/* TV / screen */}
              <div className="absolute top-[15%] left-[8%] w-[40%] h-[40%] rounded-sm bg-neutral-900" />
              {/* Cabinet */}
              <div className="absolute bottom-0 left-[5%] w-[50%] h-[25%] rounded-t-sm bg-neutral-800" />
              {/* Lamp */}
              <div className="absolute top-[10%] right-[15%] w-[3%] h-[50%] bg-neutral-700" />
              <div className="absolute top-[8%] right-[10%] w-[12%] h-[12%] rounded-full bg-amber-300/60" />
              {/* Sofa */}
              <div className="absolute bottom-[10%] right-[5%] w-[35%] h-[30%] rounded-t-lg bg-neutral-700" />
              {/* Person silhouettes */}
              <div className="absolute bottom-[25%] right-[15%] w-[10%] h-[35%] rounded-t-full bg-neutral-600" />
              <div className="absolute bottom-[25%] right-[28%] w-[10%] h-[30%] rounded-t-full bg-neutral-600" />
            </div>
            {/* Warm light overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        {/* Total value */}
        <div className="px-5 pt-4 pb-1">
          <p className="text-[28px] font-bold text-neutral-900 leading-none tracking-tight">
            $9,350
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">
            Total Value From Photo
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 px-5 pt-3 pb-4">
          <button className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export List
          </button>
          <button className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>

        {/* Divider */}
        <hr className="border-neutral-100 mx-5" />

        {/* Item list */}
        <div className="px-5 divide-y divide-neutral-100">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-3"
            >
              <span className="text-xs font-medium text-neutral-900 truncate mr-3">
                {item.name}
              </span>
              <span className="text-xs font-medium text-neutral-900 whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
