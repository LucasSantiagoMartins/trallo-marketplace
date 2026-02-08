import React, { useState } from "react";

interface TralloInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: string;
  showPasswordToggle?: boolean;
  optional?: boolean;
  className?: string;
}

const TralloInput: React.FC<TralloInputProps> = ({
  label,
  type = "text",
  placeholder,
  value = "",
  onChange,
  icon,
  showPasswordToggle = false,
  optional = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center ml-1">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-tight">
            {label}
          </label>
          {optional && (
            <span className="text-[10px] text-muted-foreground italic">Opcional</span>
          )}
        </div>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-muted-foreground text-lg">
            {icon}
          </span>
        )}
        <input
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full py-4 rounded-xl 
            bg-card border border-border
            focus:border-primary focus:ring-4 focus:ring-primary/10 
            transition-all outline-none 
            text-foreground placeholder:text-muted-foreground
            ${icon ? 'pl-11 pr-4' : 'px-4'}
            ${showPasswordToggle ? 'pr-12' : ''}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TralloInput;
