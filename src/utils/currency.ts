export const formatPrice = (price: number, includeSymbol: boolean = true) => {
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);

  if (!includeSymbol) {
    return formatted;
  }

  return `${formatted} Kz`;
};
export const formatThousands = (val: string) => {
  const raw = val.replace(/\D/g, "");
  if (!raw) return "";
  const cleanRaw = raw.replace(/^0+/, "");
  if (!cleanRaw) return "";
  return cleanRaw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};