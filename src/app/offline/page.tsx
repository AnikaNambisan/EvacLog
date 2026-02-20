"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Cloud-off icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-6"
      >
        <path d="M2 2l20 20" />
        <path d="M5.782 5.782A7 7 0 0 0 4 10a5 5 0 0 0 1.92 9.606" />
        <path d="M16 16H6" />
        <path d="M20.945 15.127A5 5 0 0 0 17 10a7 7 0 0 0-11.218-2.782" />
      </svg>

      <h1 className="mb-3 text-2xl font-bold text-gray-900">
        You are offline
      </h1>

      <p className="mb-8 max-w-md text-gray-500">
        It looks like you&apos;ve lost your internet connection. Some features
        may be unavailable until you&apos;re back online.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-[#2B6777] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#235563]"
      >
        Try Again
      </button>
    </div>
  );
}
