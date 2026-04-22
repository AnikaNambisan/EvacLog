import Button from "@/components/Button";
import Section from "@/components/Section";
import { StepCard, FeatureCard } from "@/components/Card";
import {
  CreditCardIcon,
  InventoryIcon,
  AlertIcon,
  LightningIcon,
  PhotoIcon,
  ChecklistIcon,
  ShieldIcon,
} from "@/components/Icon";
import FloatingCards from "@/components/FloatingCards";
import ScrollIndicator from "@/components/ScrollIndicator";
import DashboardPreview from "@/components/DashboardPreview";
import PhoneMockup from "@/components/PhoneMockup";
import MobileDashboardScreen from "@/components/MobileDashboardScreen";
import PhotoAlbumScreen from "@/components/PhotoAlbumScreen";
import PriceListScreen from "@/components/PriceListScreen";
import AIDetectionDemo from "@/components/AIDetectionDemo";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <Section background="gray" spacing="lg" maxWidth="xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left column — copy */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            {/* Category label */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-accent bg-accent/8 px-3 py-1.5 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Home Inventory for Emergencies
              </span>
            </div>

            <h1 className="mt-5 text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-neutral-900 leading-[1.08] animate-fade-in-up"
                style={{ animationDelay: "0.08s" }}>
              Know what you own.
              <br />
              <span className="text-accent">Protect it all.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-md mx-auto lg:mx-0 animate-fade-in-up"
               style={{ animationDelay: "0.16s" }}>
              EvacLog auto-builds your home inventory from purchases and photos — so you&apos;re ready for insurance claims and emergencies in seconds, not hours.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3 animate-fade-in-up"
                 style={{ animationDelay: "0.24s" }}>
              <Button href="/dashboard" size="lg">
                Start Your Free Inventory
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
              <Button href="#how-it-works" variant="secondary" size="lg">
                See How It Works
              </Button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-neutral-500 animate-fade-in-up"
                 style={{ animationDelay: "0.32s" }}>
              <span className="inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Bank-level encryption
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Privacy-first design
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Free to start
              </span>
            </div>
          </div>

          {/* Right column — floating inventory cards */}
          <FloatingCards />
        </div>

        {/* Value prop banner */}
        <div className="mt-16 bg-accent-gradient rounded-xl px-6 py-5 animate-fade-in-up"
             style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold">76+</span>
              <span className="text-sm opacity-90 leading-tight">Items cataloged<br />automatically</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold">$53K+</span>
              <span className="text-sm opacity-90 leading-tight">Average inventory<br />value protected</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold">30s</span>
              <span className="text-sm opacity-90 leading-tight">To generate a full<br />insurance report</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator label="How It Works" targetId="how-it-works" />
      </Section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <Section
        id="how-it-works"
        background="white"
        spacing="lg"
        maxWidth="lg"
        centered
      >
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            How It Works
          </h2>
          <p className="mt-3 text-neutral-600 text-base sm:text-lg">
            Three simple steps to complete home protection.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          <ScrollReveal delay={0}>
            <StepCard
              step={1}
              icon={<CreditCardIcon size={32} />}
              title="Connect Your Card"
              description="Securely link your credit or debit card with bank-level encryption. We only track home-related features from your card."
            />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <StepCard
              step={2}
              icon={<InventoryIcon size={32} />}
              title="Build Your Inventory"
              description="AI automatically catalogs your purchases and analyzes your photos to create a comprehensive home inventory."
            />
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <StepCard
              step={3}
              icon={<AlertIcon size={32} />}
              title="Be Prepared"
              description="Access instant insurance documentation, evacuation checklist, and priority lists when you need them."
            />
          </ScrollReveal>
        </div>

        <ScrollIndicator label="Core Features" targetId="core-features" />
      </Section>

      {/* ═══════════════════ CORE FEATURES ═══════════════════ */}
      <Section
        id="core-features"
        background="gray"
        spacing="lg"
        maxWidth="lg"
        centered
      >
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Core Features
          </h2>
          <p className="mt-3 text-neutral-600 text-base sm:text-lg">
            Everything you need for complete home protection.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 text-left">
          <ScrollReveal delay={0}>
            <FeatureCard
              icon={<LightningIcon size={28} />}
              title="Automated Inventory"
              description="Smart purchase tracking builds your inventory automatically without any manual input required."
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FeatureCard
              icon={<PhotoIcon size={28} />}
              title="Photo Recognition"
              description="AI analyzes your home photos to identify and catalog items you might have missed."
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <FeatureCard
              icon={<ChecklistIcon size={28} />}
              title="Evacuation Mode"
              description="Instant priority checklists and documentation for emergency situations and insurance claims."
            />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <FeatureCard
              icon={<ShieldIcon size={28} />}
              title="Privacy First"
              description="Your data stays on your device by default. Optional encrypted cloud backup available."
            />
          </ScrollReveal>
        </div>

        <ScrollIndicator
          label="Your Digital Inventory Dashboard"
          targetId="dashboard-preview"
        />
      </Section>

      {/* ═══════════════════ DASHBOARD PREVIEW ═══════════════════ */}
      <Section
        id="dashboard-preview"
        background="white"
        spacing="lg"
        maxWidth="xl"
        centered
      >
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Your Digital Inventory Dashboard
          </h2>
          <p className="mt-3 text-neutral-600 text-base sm:text-lg">
            See everything in one clean, organized view.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-12 text-left">
            <DashboardPreview />
          </div>
        </ScrollReveal>

        <ScrollIndicator label="Mobile Experience" targetId="mobile-preview" />
      </Section>

      {/* ═══════════════════ MOBILE MOCKUP ═══════════════════ */}
      <Section
        id="mobile-preview"
        background="dark"
        spacing="lg"
        maxWidth="lg"
        centered
      >
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Your inventory, in your pocket.
          </h2>
          <p className="mt-3 text-neutral-400 text-base sm:text-lg">
            Access everything from the EvacLog mobile app — designed for speed when it matters most.
          </p>
        </ScrollReveal>

        <div className="mt-12 flex justify-center items-start gap-6 sm:gap-8 lg:gap-10 flex-wrap max-w-full overflow-hidden">
          <ScrollReveal delay={0}>
            <PhoneMockup scale={0.95}>
              <MobileDashboardScreen />
            </PhoneMockup>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <PhoneMockup scale={0.95}>
              <PhotoAlbumScreen />
            </PhoneMockup>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <PhoneMockup scale={0.95}>
              <PriceListScreen />
            </PhoneMockup>
          </ScrollReveal>
        </div>

        <ScrollIndicator label="AI Detection" targetId="ai-detection" />
      </Section>

      {/* ═══════════════════ AI DETECTION DEMO ═══════════════════ */}
      <Section
        id="ai-detection"
        background="white"
        spacing="lg"
        maxWidth="lg"
        centered
      >
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            See AI Detection in Action
          </h2>
          <p className="mt-3 text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto">
            Just snap a photo of any room. Our AI identifies every item, estimates
            values, and adds them to your inventory automatically.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-12 max-w-3xl mx-auto text-left">
            <AIDetectionDemo />
          </div>
        </ScrollReveal>

        <ScrollIndicator label="Emergency Mode" targetId="emergency-mode" />
      </Section>

      {/* ═══════════════════ EMERGENCY MODE ═══════════════════ */}
      <Section
        id="emergency-mode"
        background="white"
        spacing="lg"
        maxWidth="lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* ─── Left: Copy ─── */}
          <ScrollReveal>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                Emergency Mode
              </h2>
              <p className="mt-2 text-lg sm:text-xl font-semibold text-neutral-700">
                When every second counts, know what to grab
              </p>
              <p className="mt-5 text-base text-neutral-600 leading-relaxed">
                Evacuation Mode instantly prioritizes your most valuable and
                essential items, creating actionable checklists for emergency
                situations.
              </p>

              {/* Feature list */}
              <ul className="mt-8 space-y-4">
                {[
                  "Priority item rankings by value and importance",
                  "Location-based grab lists for quick evacuation",
                  "Instant insurance documentation and receipts",
                  "Offline access when you need it most",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span className="text-sm text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* ─── Right: Emergency Checklist Card ─── */}
          <ScrollReveal delay={200}>
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-base font-semibold text-neutral-900">
                Emergency Checklist
              </h3>

              {/* Checklist items */}
              <div className="mt-5 divide-y divide-neutral-100">
                {/* Item 1 – unchecked, Critical */}
                <div className="flex items-start gap-3 py-4 first:pt-0">
                  <div className="w-5 h-5 mt-0.5 rounded border-2 border-neutral-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">
                      Important Documents
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Bedroom Safe — Insurance, IDs, Passports
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-red-600 whitespace-nowrap">
                    Critical
                  </span>
                </div>

                {/* Item 2 – unchecked, High */}
                <div className="flex items-start gap-3 py-4">
                  <div className="w-5 h-5 mt-0.5 rounded border-2 border-neutral-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">
                      MacBook Pro 16&quot;
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Office Desk
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-orange-500 whitespace-nowrap">
                    High
                  </span>
                </div>

                {/* Item 3 – unchecked, Medium */}
                <div className="flex items-start gap-3 py-4">
                  <div className="w-5 h-5 mt-0.5 rounded border-2 border-neutral-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">
                      Engagement Ring
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Closet Safe
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-amber-500 whitespace-nowrap">
                    Medium
                  </span>
                </div>

                {/* Item 4 – checked, Grabbed */}
                <div className="flex items-start gap-3 py-4 last:pb-0">
                  <div className="w-5 h-5 mt-0.5 rounded bg-accent flex items-center justify-center shrink-0">
                    <svg
                      width="12"
                      height="12"
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
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">
                      Family Photos
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Living Room &amp; Dining Table
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-accent whitespace-nowrap">
                    Grabbed
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-5 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-neutral-700">
                    Progress
                  </span>
                  <span className="text-xs text-neutral-500">
                    3 of 12 Items
                  </span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: "25%" }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Sign Up Now CTA */}
        <ScrollReveal>
          <div className="mt-16 text-center">
            <Button href="/dashboard" size="lg">
              Sign Up Now
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
