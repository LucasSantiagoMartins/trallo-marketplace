import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import TralloInput from "./TralloInput";
import ConfirmAction from "./ConfirmAction";
import LocationSuggestions from "./LocationSuggestions";

const LUANDA_MUNICIPALITIES = [
  "Belas",
  "Cacuaco",
  "Cazenga",
  "Icolo e Bengo",
  "Luanda",
  "Quiçama",
  "Kilamba Kiaxi",
  "Talatona",
  "Viana",
];

interface LocationPickerProps {
  address: string;
  onAddressChange: (value: string) => void;
  onCoordsChange: (coords: { lat: number; lng: number }) => void;
  role: "buyer" | "seller";
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  address,
  onAddressChange,
  onCoordsChange,
  role,
}) => {
  const [hasLocation, setHasLocation] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocalização não suportada");
      return;
    }
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onCoordsChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setHasLocation(true);
        setGettingLocation(false);
        toast.success("Localização determinada com sucesso");
      },
      (error) => {
        setGettingLocation(false);
        if (error.code === error.PERMISSION_DENIED) setIsModalOpen(true);
        else toast.error("Erro ao obter localização");
      },
      { timeout: 10000 },
    );
  };

  const handleInputChange = (value: string) => {
    onAddressChange(value);

    const parts = value.split(",");
    const query = parts[0].trim();

    if (query.length > 1 && parts.length === 1) {
      const filtered = LUANDA_MUNICIPALITIES.filter((m) =>
        m.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (municipality: string) => {
    onAddressChange(`${municipality}, `);
    setShowSuggestions(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = `${municipality}, `.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 10);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {!hasLocation ? (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Localização{" "}
            {role === "seller" && (
              <span className="text-[14px] text-muted-foreground font-normal italic">
                (Opcional)
              </span>
            )}
          </label>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={gettingLocation}
            className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 transition-all"
          >
            <span className="material-symbols-outlined">
              location_searching
            </span>
            <span className="text-sm font-bold">
              {gettingLocation
                ? "Obtendo..."
                : role === "seller"
                  ? "Definir localização (Opcional)"
                  : "Definir minha localização"}
            </span>
          </button>
        </div>
      ) : (
        <div className="space-y-1 relative">
          {showSuggestions && (
            <LocationSuggestions
              suggestions={suggestions}
              onSelect={selectSuggestion}
            />
          )}

          <TralloInput
            ref={inputRef as any}
            label={`Endereço ${role === "seller" ? "(Opcional)" : ""}`}
            placeholder="Município, Bairro..."
            icon="location_on"
            value={address}
            onChange={handleInputChange}
            optional={role === "seller"}
            onFocus={() => {
              if (address.length > 1 && !address.includes(",")) {
                setShowSuggestions(true);
              }
            }}
          />
        </div>
      )}

      <ConfirmAction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          handleGetLocation();
        }}
        title="Ativar Localização"
        description="Para garantir a entrega precisa dos seus produtos, precisamos da sua localização atual via GPS."
        confirmText="Tentar Novamente"
        cancelText="Entendi"
        icon="location_off"
        variant="primary"
      />
    </div>
  );
};

export default LocationPicker;
