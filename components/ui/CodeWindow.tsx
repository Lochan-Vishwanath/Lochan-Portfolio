interface CodeWindowProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeWindow({ children, className = "" }: CodeWindowProps) {
  return (
    <div
      className={`bg-surface-dark rounded-xl overflow-hidden ${className}`}
    >
      {/* Traffic light dots */}
      <div className="flex items-center gap-xs px-md py-sm bg-surface-dark-elevated">
        <div className="w-xs h-xs rounded-full bg-[#ff5f57]" />
        <div className="w-xs h-xs rounded-full bg-[#ffbd2e]" />
        <div className="w-xs h-xs rounded-full bg-[#28ca41]" />
      </div>
      {/* Content */}
      <div className="p-lg bg-surface-dark-soft font-mono text-sm text-on-dark">
        {children}
      </div>
    </div>
  );
}