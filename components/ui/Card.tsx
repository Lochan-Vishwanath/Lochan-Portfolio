interface CardProps {
  variant?: "surface" | "callout-coral" | "feature";
  children: React.ReactNode;
  className?: string;
}

export function Card({
  variant = "surface",
  children,
  className = "",
}: CardProps) {
  const baseClasses = "rounded-xl p-lg";

  const variantClasses = {
    surface: "bg-surface-card border border-hairline",
    "callout-coral": "bg-primary text-on-primary",
    feature: "bg-surface-card border border-hairline",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}