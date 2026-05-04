interface SpikeMarkProps {
  className?: string;
}

export function SpikeMark({ className = "" }: SpikeMarkProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}