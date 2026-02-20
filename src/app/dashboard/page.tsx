"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EmergencyChecklist from "@/components/EmergencyChecklist";
import OnboardingModal from "@/components/OnboardingModal";
import { ChecklistItemSkeleton } from "@/components/Skeleton";

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Onboarding modal */}
      {showOnboarding && (
        <OnboardingModal onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Dashboard header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage your home inventory and emergency plans.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/inventory"
                className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 hover:text-accent bg-neutral-100 hover:bg-accent/5 rounded-full px-3 py-1.5 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Inventory
              </Link>
              <button
                onClick={() => setShowOnboarding(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 hover:text-accent bg-neutral-100 hover:bg-accent/5 rounded-full px-3 py-1.5 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Setup guide
              </button>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-100 rounded-full px-3 py-1.5">
                <svg
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
                Bank-level encryption
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-6">
            {/* Skeleton header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="skeleton h-3 w-28 mb-2" />
                <div className="skeleton h-8 w-56" />
              </div>
              <div className="skeleton h-11 w-44 rounded-lg" />
            </div>
            {/* Skeleton progress bar */}
            <div className="bg-neutral-50 rounded-xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-2.5">
                <div className="skeleton h-4 w-40" />
                <div className="skeleton h-4 w-10" />
              </div>
              <div className="skeleton h-3 w-full rounded-full" />
              <div className="flex gap-3 mt-4">
                <div className="skeleton h-7 w-36 rounded-full" />
                <div className="skeleton h-7 w-32 rounded-full" />
              </div>
            </div>
            {/* Skeleton checklist items */}
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <ChecklistItemSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up" style={{ animationDuration: "0.4s" }}>
            <EmergencyChecklist />
          </div>
        )}
      </div>
    </div>
  );
}
