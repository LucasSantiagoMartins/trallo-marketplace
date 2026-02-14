import React from "react";

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  const formatValue = (val: string) => {
    const raw = val.replace(/\D/g, "");
    if (!raw) return "";
    if (raw.startsWith("0")) return "";
    return raw.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    onChange(raw);
  };

  return (
    <section className="flex flex-col gap-2 w-full max-w-md mx-auto">
      <label className="text-xs font-bold text-muted-foreground uppercase ml-1">
        Preço de Venda
      </label>
      <div className="relative w-full py-6 rounded-2xl bg-card border border-border focus-within:border-primary transition-all flex items-center">
        <input
          type="text"
          inputMode="numeric"
          value={formatValue(value)}
          onChange={handleChange}
          placeholder="0.00"
          className="text-3xl font-bold bg-transparent border-none text-center w-full outline-none pl-16 pr-20"
        />
        <span className="absolute right-6 font-bold text-muted-foreground pointer-events-none select-none">
          AOA
        </span>
      </div>
    </section>
  );
};

export default PriceInput;
