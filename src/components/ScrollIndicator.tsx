interface ScrollIndicatorProps {
  label: string;
  targetId?: string;
}

export default function ScrollIndicator({
  label,
  targetId,
}: ScrollIndicatorProps) {
  const inner = (
    <div className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors">
      <span className="text-xs font-medium tracking-wide">{label}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-gentle-bounce"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );

  if (targetId) {
    return (
      <a href={`#${targetId}`} className="block mt-12 text-center">
        {inner}
      </a>
    );
  }

  return <div className="mt-12 text-center">{inner}</div>;
}
