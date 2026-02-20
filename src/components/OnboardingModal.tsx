"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/components/Toast";

/* ═══════════════════ Types ═══════════════════ */

interface OnboardingModalProps {
  /** Called when the user finishes or dismisses the flow */
  onComplete: () => void;
}

/* ═══════════════════ Component ═══════════════════ */

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [cardConnected, setCardConnected] = useState(false);
  const [photosEnabled, setPhotosEnabled] = useState(false);
  const { addToast } = useToast();

  const next = useCallback(() => {
    setDirection("forward");
    if (step >= 2) {
      onComplete();
      return;
    }
    setStep((s) => s + 1);
  }, [step, onComplete]);

  const back = useCallback(() => {
    setDirection("back");
    setStep((s) => Math.max(0, s - 1));
  }, []);

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        onClick={onComplete}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-neutral-100">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === step
                    ? "bg-accent"
                    : i < step
                      ? "bg-accent/40"
                      : "bg-neutral-200"
                }`}
              />
            ))}
          </div>
          <button
            onClick={onComplete}
            className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors py-1 px-2 min-h-[44px] flex items-center"
          >
            Skip all
          </button>
        </div>

        {/* Content area with slide transition */}
        <div className="relative overflow-hidden">
          <div
            className="transition-all duration-400 ease-out"
            style={{
              transform: `translateX(${direction === "forward" ? "0" : "0"})`,
            }}
          >
            {step === 0 && (
              <StepWelcome onNext={next} />
            )}
            {step === 1 && (
              <StepConnectCard
                onNext={next}
                onBack={back}
                connected={cardConnected}
                onConnect={() => {
                  setCardConnected(true);
                  addToast("success", "Card connected successfully");
                }}
              />
            )}
            {step === 2 && (
              <StepPhotoSync
                onComplete={onComplete}
                onBack={back}
                enabled={photosEnabled}
                onEnable={() => {
                  setPhotosEnabled(true);
                  addToast("success", "Photo sync enabled");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Step 1: Welcome ═══════════════════ */

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="px-6 pt-6 pb-8">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          <polyline points="9 21 9 14 15 14 15 21" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-neutral-900">
        Welcome to EvacLog
      </h2>
      <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
        EvacLog automatically builds a complete inventory of your home — so
        you&apos;re always prepared for insurance claims, emergencies, or
        simply knowing what you own.
      </p>

      {/* Highlights */}
      <div className="mt-6 space-y-3">
        {[
          { icon: <LightningSvg />, text: "Auto-tracks purchases from your card" },
          { icon: <CameraSvg />, text: "AI recognizes items from photos" },
          { icon: <ShieldSvg />, text: "Your data stays private and encrypted" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-accent shrink-0">
              {item.icon}
            </div>
            <span className="text-sm text-neutral-700">{item.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="mt-8 w-full bg-accent text-white font-medium text-sm py-3 rounded-xl hover:bg-accent-dark transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}

/* ═══════════════════ Step 2: Connect Card ═══════════════════ */

function StepConnectCard({
  onNext,
  onBack,
  connected,
  onConnect,
}: {
  onNext: () => void;
  onBack: () => void;
  connected: boolean;
  onConnect: () => void;
}) {
  return (
    <div className="px-6 pt-6 pb-8">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-neutral-900">
        Connect Your Card
      </h2>
      <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
        Link a card to automatically track home-related purchases. We never see
        your full card number or store financial data.
      </p>

      {/* Mock card input */}
      {!connected ? (
        <div className="mt-6">
          <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <div className="w-8 h-5 rounded bg-blue-600" />
                <div className="w-8 h-5 rounded bg-red-500" />
                <div className="w-8 h-5 rounded bg-amber-500" />
              </div>
              <span className="text-xs text-neutral-500">
                Visa, Mastercard, Amex supported
              </span>
            </div>
            <div className="space-y-3">
              <div className="h-10 bg-white rounded-lg border border-neutral-200 flex items-center px-3">
                <span className="text-xs text-neutral-400">
                  •••• •••• •••• ••••
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-white rounded-lg border border-neutral-200 flex items-center px-3">
                  <span className="text-xs text-neutral-400">MM / YY</span>
                </div>
                <div className="h-10 bg-white rounded-lg border border-neutral-200 flex items-center px-3">
                  <span className="text-xs text-neutral-400">CVC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-4 flex items-start gap-2">
            <svg
              className="text-green-600 shrink-0 mt-0.5"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We use bank-level encryption and only track home purchases.
              Powered by Plaid — your credentials are never stored on our
              servers.
            </p>
          </div>
        </div>
      ) : (
        /* Connected state */
        <div className="mt-6 border border-green-200 bg-green-50 rounded-xl p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-sm font-medium text-green-800">
            Card connected successfully
          </p>
          <p className="text-xs text-green-600 mt-1">
            We&apos;ll start tracking home purchases automatically.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 space-y-2">
        {!connected ? (
          <button
            onClick={onConnect}
            className="w-full bg-accent text-white font-medium text-sm py-3 rounded-xl hover:bg-accent-dark transition-colors"
          >
            Connect Card
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full bg-accent text-white font-medium text-sm py-3 rounded-xl hover:bg-accent-dark transition-colors"
          >
            Continue
          </button>
        )}
        {!connected && (
          <button
            onClick={onNext}
            className="w-full text-sm font-medium text-neutral-500 hover:text-neutral-700 py-3 transition-colors min-h-[44px]"
          >
            Skip for now
          </button>
        )}
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        className="mt-3 flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 transition-colors mx-auto py-2 px-3 min-h-[44px]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>
    </div>
  );
}

/* ═══════════════════ Step 3: Photo Sync ═══════════════════ */

function StepPhotoSync({
  onComplete,
  onBack,
  enabled,
  onEnable,
}: {
  onComplete: () => void;
  onBack: () => void;
  enabled: boolean;
  onEnable: () => void;
}) {
  return (
    <div className="px-6 pt-6 pb-8">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-neutral-900">
        Sync with Apple Photos?
      </h2>
      <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
        Our AI can scan your existing photos to identify furniture, electronics,
        and other valuables — building your inventory in minutes instead of
        hours.
      </p>

      {/* How it works mini-section */}
      {!enabled ? (
        <div className="mt-6 space-y-3">
          {[
            {
              icon: <SearchSvg />,
              title: "Scans privately",
              desc: "Analysis happens on-device. Photos never leave your phone.",
            },
            {
              icon: <SparklesSvg />,
              title: "Identifies items",
              desc: "Recognizes furniture, appliances, electronics, art, and more.",
            },
            {
              icon: <ListSvg />,
              title: "Builds your list",
              desc: "Found items are added to your inventory with estimated values.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-accent shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Enabled state */
        <div className="mt-6 border border-green-200 bg-green-50 rounded-xl p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-sm font-medium text-green-800">
            Photo sync enabled
          </p>
          <p className="text-xs text-green-600 mt-1">
            We&apos;ll start scanning in the background.
          </p>
        </div>
      )}

      {/* Trust note */}
      {!enabled && (
        <div className="mt-4 flex items-start gap-2">
          <svg
            className="text-green-600 shrink-0 mt-0.5"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <p className="text-xs text-neutral-500 leading-relaxed">
            100% on-device processing. You can revoke access at any time in
            Settings.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 space-y-2">
        {!enabled ? (
          <>
            <button
              onClick={onEnable}
              className="w-full bg-accent text-white font-medium text-sm py-3 rounded-xl hover:bg-accent-dark transition-colors"
            >
              Enable Photo Sync
            </button>
            <button
              onClick={onComplete}
              className="w-full text-sm font-medium text-neutral-500 hover:text-neutral-700 py-3 transition-colors min-h-[44px]"
            >
              Maybe Later
            </button>
          </>
        ) : (
          <button
            onClick={onComplete}
            className="w-full bg-accent text-white font-medium text-sm py-3 rounded-xl hover:bg-accent-dark transition-colors"
          >
            Go to Dashboard
          </button>
        )}
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        className="mt-3 flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 transition-colors mx-auto py-2 px-3 min-h-[44px]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>
    </div>
  );
}

/* ═══════════════════ Shared SVG icons ═══════════════════ */

function LightningSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function CameraSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function ShieldSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SearchSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SparklesSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

function ListSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
