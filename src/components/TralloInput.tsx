import React, { useState, useEffect, useRef, forwardRef } from "react";
import {
  Eye,
  EyeOff,
  ChevronDown,
  Search,
  Mail,
  Lock,
  User,
  Info,
  Package,
  AlertTriangle,
  Check,
  MapPin,
} from "lucide-react";

type ValidationState = "default" | "error" | "valid";

interface TralloInputOption {
  label: string;
  value: string;
}

interface TralloInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
    >,
  ) => void;
  icon?: string;
  showPasswordToggle?: boolean;
  optional?: boolean;
  className?: string;
  validation?: ValidationState;
  multiline?: boolean;
  rows?: number;
  isSelect?: boolean;
  options?: TralloInputOption[];
}

const TralloInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TralloInputProps
>(
  (
    {
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
      isSelect = false,
      options = [],
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (val: string) => {
      if (type === "float") {
        const sanitized = val.replace(",", ".");
        if (sanitized !== "" && !/^\d*\.?\d*$/.test(sanitized)) {
          return;
        }
        setInputValue(sanitized);
        onChange?.(sanitized);
      } else {
        setInputValue(val);
        onChange?.(val);
      }
      setIsOpen(false);
    };

    const isPasswordField = type === "password";
    const currentInputType =
      isPasswordField && showPassword
        ? "text"
        : type === "float"
          ? "text"
          : type;

    const borderStyles: Record<ValidationState, string> = {
      default:
        "border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
      error:
        "border-red-500 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10",
      valid:
        "border-green-500 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10",
    };

    const commonClasses = `
    w-full py-4 rounded-xl 
    bg-card border
    ${borderStyles[validation]}
    transition-all outline-none 
    text-muted-foreground/100 
    ${icon ? "pl-11 pr-4" : "px-8"}
    ${showPasswordToggle || isSelect ? "pr-12" : ""}
    ${multiline ? "resize-none" : ""}
  `;

    const renderIcon = () => {
      if (!icon) return null;
      const iconClass = `absolute left-4 text-muted-foreground transition-colors ${
        isOpen ? "text-primary" : ""
      } ${multiline ? "top-5" : "top-1/2 -translate-y-1/2"}`;

      switch (icon) {
        case "inventory_2":
          return <Package className={iconClass} size={20} />;
        case "report_problem":
          return <AlertTriangle className={iconClass} size={20} />;
        case "search":
          return <Search className={iconClass} size={20} />;
        case "mail":
          return <Mail className={iconClass} size={20} />;
        case "lock":
          return <Lock className={iconClass} size={20} />;
        case "person":
          return <User className={iconClass} size={20} />;
        case "location_on":
          return <MapPin className={iconClass} size={20} />;
        case "percent":
          return <span className={`${iconClass} font-bold text-lg`}>%</span>;
        case "category":
          return <Package className={iconClass} size={20} />;
        default:
          return <Info className={iconClass} size={20} />;
      }
    };

    return (
      <div className={`flex flex-col gap-2 ${className}`} ref={dropdownRef}>
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
          {renderIcon()}

          {isSelect ? (
            <div className="relative">
              <div
                onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}
                className={`${commonClasses} cursor-pointer flex items-center min-h-[58px] selection:bg-transparent`}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <span
                  className={
                    inputValue ? "text-foreground" : "text-muted-foreground/60"
                  }
                >
                  {options.find((opt) => opt.value === inputValue)?.label ||
                    placeholder ||
                    "Selecione uma opção"}
                </span>
              </div>

              <ChevronDown
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform duration-300 pointer-events-none ${
                  isOpen ? "rotate-180 text-primary" : ""
                }`}
                size={20}
              />

              {isOpen && (
                <div className="absolute z-[110] mt-2 w-full bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="max-h-60 overflow-y-auto p-1.5 custom-scrollbar">
                    {options.length > 0 ? (
                      options.map((opt) => (
                        <div
                          key={opt.value}
                          onClick={() => handleChange(opt.value)}
                          className={`
                          flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all cursor-pointer mb-1 last:mb-0
                          ${
                            inputValue === opt.value
                              ? "bg-primary/10 text-primary font-bold"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }
                        `}
                        >
                          {opt.label}
                          {inputValue === opt.value && <Check size={16} />}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-xs text-muted-foreground italic">
                        Nenhuma opção disponível
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : multiline ? (
            <textarea
              ref={ref as React.RefObject<HTMLTextAreaElement>}
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown as any}
              placeholder={placeholder}
              rows={rows}
              className={commonClasses}
            />
          ) : (
            <input
              ref={ref as React.RefObject<HTMLInputElement>}
              type={currentInputType}
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown as any}
              placeholder={placeholder}
              className={commonClasses}
              inputMode={type === "float" ? "decimal" : "text"}
            />
          )}

          {showPasswordToggle && isPasswordField && !multiline && !isSelect && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
      `}</style>
      </div>
    );
  },
);

TralloInput.displayName = "TralloInput";

export default TralloInput;
