interface BadgeProps {
  variant?: "default" | "coral" | "cream";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-pill px-sm py-xs font-mono text-xs border";

  const variantClasses = {
    default: "border-hairline bg-transparent text-muted",
    coral: "bg-primary text-on-primary border-transparent",
    cream: "bg-surface-card border-hairline text-ink",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}