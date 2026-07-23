import React, { useState, useRef, useEffect, forwardRef } from "react";
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
  Calendar,
} from "lucide-react";

type ValidationState = "default" | "error" | "valid";

interface DoerInputOption {
  label: string;
  value: string;
}

interface DoerInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
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
  options?: DoerInputOption[];
  readOnly?: boolean;
}

const DoerInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  DoerInputProps
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
      onClick,
      onKeyDown,
      icon,
      showPasswordToggle = false,
      optional = false,
      className = "",
      validation = "default",
      multiline = false,
      rows = 3,
      isSelect = false,
      options = [],
      readOnly = false,
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (type === "date" && value && value.includes("-")) {
        const parts = value.split("-");
        if (parts.length === 3) {
          const [year, month, day] = parts;
          setDisplayValue(`${day}/${month}/${year}`);
        }
      } else {
        setDisplayValue(value || "");
      }
    }, [value, type]);

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
      if (readOnly) return;

      if (type === "date") {
        const clean = val.replace(/\D/g, "");
        const x = clean.match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        if (!x) return;

        const formattedDisplay = !x[2]
          ? x[1]
          : x[1] + "/" + x[2] + (x[3] ? "/" + x[3] : "");

        setDisplayValue(formattedDisplay);

        if (clean.length === 8) {
          const day = clean.substring(0, 2);
          const month = clean.substring(2, 4);
          const year = clean.substring(4, 8);
          const isoDate = `${year}-${month}-${day}`;
          onChange?.(isoDate);
        } else {
          onChange?.(formattedDisplay);
        }
        return;
      }

      if (type === "number" || type === "decimal") {
        const onlyNums = val.replace(/\D/g, "");
        setDisplayValue(onlyNums);
        onChange?.(onlyNums);
        return;
      }

      if (type === "float") {
        const sanitized = val.replace(",", ".");
        if (sanitized !== "" && !/^\d*\.?\d*$/.test(sanitized)) return;
        setDisplayValue(sanitized);
        onChange?.(sanitized);
      } else {
        setDisplayValue(val);
        onChange?.(val);
      }
      setIsOpen(false);
    };

    const isPasswordField = type === "password";
    const currentInputType =
      isPasswordField && showPassword
        ? "text"
        : type === "float" || type === "date"
          ? "text"
          : type;

    const borderStyles: Record<ValidationState, string> = {
      default:
        "border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
      error:
        "border-destructive focus-within:border-destructive focus-within:ring-4 focus-within:ring-destructive/10",
      valid:
        "border-success focus-within:border-success focus-within:ring-4 focus-within:ring-success/10",
    };

    const commonClasses = `
      w-full py-4 rounded-xl 
      bg-background border
      ${borderStyles[validation]}
      transition-all outline-none 
      text-foreground
      ${icon || type === "date" ? "pl-11 pr-4" : "px-8"}
      ${showPasswordToggle || isSelect ? "pr-12" : ""}
      ${multiline ? "resize-none" : ""}
      ${readOnly ? "cursor-pointer select-none" : ""}
    `;

    const renderIcon = () => {
      const iconClass = `absolute left-4 text-muted-foreground transition-colors ${
        isOpen ? "text-primary" : ""
      } ${multiline ? "top-5" : "top-1/2 -translate-y-1/2"}`;

      if (type === "date" && !icon) {
        return <Calendar className={iconClass} size={20} />;
      }

      if (!icon) return null;

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
        default:
          return <Info className={iconClass} size={20} />;
      }
    };

    return (
      <div
        className={`flex flex-col gap-2 ${className}`}
        ref={dropdownRef}
        onClick={onClick}
      >
        {label && (
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs text-foreground uppercase tracking-tight">
              {label}
            </label>
            {optional && (
              <span className="text-[10px] text-muted-foreground italic">
                Opcional
              </span>
            )}
          </div>
        )}

        <div className="relative flex items-center">
          {renderIcon()}

          {isSelect ? (
            <div className="relative w-full">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${commonClasses} cursor-pointer flex items-center min-h-[58px] selection:bg-transparent`}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <span
                  className={
                    displayValue
                      ? "text-foreground"
                      : "text-muted-foreground/60"
                  }
                >
                  {options.find((opt) => opt.value === value)?.label ||
                    placeholder ||
                    "Selecione uma opção"}
                </span>
              </div>
              <ChevronDown
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform duration-300 pointer-events-none ${isOpen ? "rotate-180 text-primary" : ""}`}
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
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all cursor-pointer mb-1 last:mb-0 ${value === opt.value ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                        >
                          {opt.label}
                          {value === opt.value && <Check size={16} />}
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
              value={displayValue}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown as any}
              placeholder={placeholder}
              rows={rows}
              readOnly={readOnly}
              className={commonClasses}
            />
          ) : (
            <input
              ref={ref as React.RefObject<HTMLInputElement>}
              type={currentInputType}
              value={displayValue}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown as any}
              placeholder={type === "date" ? "DD/MM/AAAA" : placeholder}
              readOnly={readOnly}
              className={commonClasses}
              inputMode={
                type === "float"
                  ? "decimal"
                  : type === "date"
                    ? "numeric"
                    : "text"
              }
              maxLength={type === "date" ? 10 : undefined}
            />
          )}

          {showPasswordToggle && isPasswordField && !multiline && !isSelect && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 h-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
    );
  },  
);

DoerInput.displayName = "DoerInput";
export default DoerInput; 