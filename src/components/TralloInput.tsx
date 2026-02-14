import React, { useState, useEffect } from "react";

type ValidationState = "default" | "error" | "valid";

interface TralloInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  icon?: string;
  showPasswordToggle?: boolean;
  optional?: boolean;
  className?: string;
  validation?: ValidationState;
  multiline?: boolean;
  rows?: number;
}

const TralloInput: React.FC<TralloInputProps> = ({
  label,
  type = "text",
  placeholder,
  value = "",
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  icon,
  showPasswordToggle = false,
  optional = false,
  className = "",
  validation = "default",
  multiline = false,
  rows = 4,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const isPasswordField = type === "password";
  const currentInputType = isPasswordField && showPassword ? "text" : type;

  const borderStyles: Record<ValidationState, string> = {
    default:
      "border-border focus:border-primary focus:ring-4 focus:ring-primary/10",
    error:
      "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10",
    valid:
      "border-green-500 focus:border-green-500 focus:ring-4 focus:ring-green-500/10",
  };

  const commonClasses = `
    w-full py-4 rounded-xl 
    bg-card border
    ${borderStyles[validation]}
    transition-all outline-none 
    text-muted-foreground/100 placeholder:text-muted-foreground/60
    ${icon ? "pl-11 pr-4" : "px-4"}
    ${showPasswordToggle ? "pr-12" : ""}
    ${multiline ? "resize-none" : ""}
  `;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center ml-1">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-tight">
            {label}
          </label>
          {optional && (
            <span className="text-[10px] text-muted-foreground italic">
              Opcional
            </span>
          )}
        </div>
      )}
      <div className="relative">
        {icon && (
          <span
            className={`absolute left-4 material-symbols-outlined text-muted-foreground text-lg ${multiline ? "top-5" : "top-1/2 -translate-y-1/2"}`}
          >
            {icon}
          </span>
        )}

        {multiline ? (
          <textarea
            value={inputValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            rows={rows}
            className={commonClasses}
          />
        ) : (
          <input
            type={currentInputType}
            value={inputValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={commonClasses}
          />
        )}

        {showPasswordToggle && isPasswordField && !multiline && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TralloInput;
