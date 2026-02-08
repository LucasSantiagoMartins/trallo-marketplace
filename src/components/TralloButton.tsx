import React from "react";

interface TralloButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "social";
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const TralloButton: React.FC<TralloButtonProps> = ({
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseStyles = "h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "btn-gradient text-primary-foreground shadow-lg shadow-primary/25",
    secondary: "bg-card text-foreground border border-border hover:bg-muted",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary/10",
    social: "bg-card border border-border hover:bg-muted text-foreground text-sm font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : 'px-6'}
        ${className}
      `}
    >
      {icon && iconPosition === "left" && (
        <span className="material-symbols-outlined">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined">{icon}</span>
      )}
    </button>
  );
};

export default TralloButton;
