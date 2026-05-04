interface ChatBubbleProps {
  variant: "user" | "assistant";
  children: React.ReactNode;
  className?: string;
}

export function ChatBubble({
  variant,
  children,
  className = "",
}: ChatBubbleProps) {
  const baseClasses = "font-sans text-sm";

  if (variant === "user") {
    return (
      <div
        className={`${baseClasses} bg-primary text-on-primary rounded-lg rounded-br-sm px-lg py-md max-w-[60%] ml-auto ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} bg-surface-card text-ink rounded-lg rounded-bl-sm px-xl py-xl max-w-[85%] ${className}`}
    >
      {children}
    </div>
  );
}