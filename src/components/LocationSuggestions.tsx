import React from "react";

interface LocationSuggestionsProps {
  suggestions: string[];
  onSelect: (municipality: string) => void;
}

const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <div className="absolute bottom-full left-0 w-full mb-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-bottom-2">
      <div className="p-2 bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        Sugestões de Município
      </div>
      {suggestions.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onSelect(m)}
          className="w-full text-left px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/50 last:border-0 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">
            location_city
          </span>
          {m}
        </button>
      ))}
    </div>
  );
};

export default LocationSuggestions;
