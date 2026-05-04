import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary";
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
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
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