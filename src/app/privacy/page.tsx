import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

/* ═══════════════════ Data ═══════════════════ */

const principles = [
  {
    icon: <DeviceIcon />,
    title: "Local-First Architecture",
    description:
      "Your inventory data lives on your device by default. We never require cloud storage — your photos, receipts, and item details stay under your control unless you explicitly enable cloud backup.",
  },
  {
    icon: <LockIcon />,
    title: "End-to-End Encryption",
    description:
      "When you choose to sync or back up, all data is encrypted with AES-256 before it leaves your device. Only you hold the decryption key — not even EvacLog engineers can read your data.",
  },
  {
    icon: <EyeOffIcon />,
    title: "Minimal Data Collection",
    description:
      "We collect only what's necessary to run the service: an anonymous account identifier and basic usage analytics. We never sell data, serve ads, or share information with third parties.",
  },
  {
    icon: <CardShieldIcon />,
    title: "Bank-Level Card Security",
    description:
      "Card connections are handled through Plaid, a SOC 2 Type II certified provider. We never see, store, or have access to your full card number, CVV, or banking credentials.",
  },
  {
    icon: <PhotoShieldIcon />,
    title: "On-Device Photo Analysis",
    description:
      "AI photo recognition runs entirely on your device using Apple's Core ML framework. Your photos are never uploaded to our servers — all item detection happens locally.",
  },
  {
    icon: <TrashIcon />,
    title: "Your Data, Your Choice",
    description:
      "Export your full inventory at any time in standard formats. Delete your account and all associated data instantly — no retention periods, no hidden copies, no questions asked.",
  },
];

const faqs = [
  {
    q: "What data does EvacLog collect?",
    a: "We collect an anonymous account identifier, app usage analytics (screens visited, feature usage), and crash reports. We do not collect your inventory data, photos, or financial information on our servers.",
  },
  {
    q: "How is my card information protected?",
    a: "Card connections are established through Plaid, which is SOC 2 Type II certified and used by thousands of financial apps. EvacLog only receives transaction metadata (merchant name, amount, date) — never your card number or credentials.",
  },
  {
    q: "Are my photos uploaded to the cloud?",
    a: "No. Photo analysis happens entirely on your device using on-device machine learning. Photos never leave your phone unless you explicitly choose to back them up with cloud sync enabled.",
  },
  {
    q: "Can EvacLog employees see my inventory?",
    a: "No. All synced data is end-to-end encrypted with a key only you possess. Our servers store encrypted blobs that are meaningless without your key. Even with a court order, we cannot decrypt your data.",
  },
  {
    q: "What happens if I delete my account?",
    a: "All server-side data is permanently deleted within 24 hours. Local data on your device remains until you uninstall the app. We provide a full data export before deletion.",
  },
  {
    q: "Is EvacLog GDPR / CCPA compliant?",
    a: "Yes. We comply with GDPR, CCPA, and other applicable privacy regulations. You can request a copy of your data, correct inaccuracies, or delete everything at any time from Settings.",
  },
  {
    q: "Does EvacLog share data with insurance companies?",
    a: "Never without your explicit action. You control when and how to share your inventory — for example, by exporting a PDF report and sending it yourself. We have no integrations that share data automatically.",
  },
];

const techDetails = [
  { label: "Encryption at rest", value: "AES-256-GCM" },
  { label: "Encryption in transit", value: "TLS 1.3" },
  { label: "Key derivation", value: "PBKDF2 with 600,000 iterations" },
  { label: "Card provider", value: "Plaid (SOC 2 Type II)" },
  { label: "Photo processing", value: "On-device (Core ML)" },
  { label: "Cloud infrastructure", value: "AWS (SOC 2, ISO 27001)" },
  { label: "Data residency", value: "United States" },
  { label: "Penetration testing", value: "Annual third-party audit" },
];

/* ═══════════════════ Page ═══════════════════ */

export default function Privacy() {
  return (
    <div className="animate-page-enter">
      {/* ── Hero ── */}
      <section className="bg-neutral-50 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full ring-1 ring-green-200 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Privacy-first by design
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            Your data stays yours.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            EvacLog is built on a local-first architecture. Your inventory,
            photos, and financial connections never leave your device unless
            you choose otherwise.
          </p>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center">
              How We Protect Your Data
            </h2>
            <p className="mt-3 text-neutral-600 text-center text-base sm:text-lg max-w-2xl mx-auto">
              Six core principles that guide every technical decision we make.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="bg-neutral-50 rounded-xl p-5 sm:p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                    {p.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Details ── */}
      <section className="py-16 sm:py-24 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center">
              Encryption &amp; Infrastructure
            </h2>
            <p className="mt-3 text-neutral-600 text-center text-base sm:text-lg">
              The technical details behind our security.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mt-10 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-neutral-100">
                {techDetails.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center justify-between px-5 sm:px-6 py-4"
                  >
                    <span className="text-sm text-neutral-600">{d.label}</span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-neutral-600 text-center text-base sm:text-lg">
              Common questions about privacy and data handling.
            </p>
          </ScrollReveal>

          <div className="mt-10 space-y-0 divide-y divide-neutral-200">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 60}>
                <div className="py-6 first:pt-0 last:pb-0">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Policy Link + CTA ── */}
      <section className="py-16 sm:py-24 bg-neutral-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Want the full legal details?
            </h2>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              Our complete privacy policy covers data processing, retention
              schedules, sub-processors, and your rights under GDPR, CCPA, and
              other regulations.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-medium px-5 py-3 rounded-lg hover:bg-accent-dark transition-colors min-h-[44px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Read Full Privacy Policy
              </a>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center justify-center gap-2 bg-white text-neutral-700 text-sm font-medium px-5 py-3 rounded-lg border border-neutral-200 hover:border-accent/30 hover:text-accent transition-colors min-h-[44px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Manage Privacy Settings
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════ Inline SVG Icons ═══════════════════ */

function DeviceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function CardShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function PhotoShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
