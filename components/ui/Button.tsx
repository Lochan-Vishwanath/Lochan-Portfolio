import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
  download,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-pill px-lg py-md font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-primary text-on-primary hover:bg-primary-active active:bg-primary-active",
    secondary:
      "border border-hairline bg-canvas text-ink hover:bg-surface-card active:bg-surface-card",
    tertiary:
      "text-primary hover:text-primary-active underline underline-offset-4 decoration-primary/30 hover:decoration-primary bg-transparent border border-secondary",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//");
    if (isExternal) {
      return (
        <a href={href} className={classes} download={download}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} download={download}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}