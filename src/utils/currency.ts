export const formatPrice = (price: number, includeSymbol: boolean = true) => {
  return new Intl.NumberFormat("pt-AO", {
    style: includeSymbol ? "currency" : "decimal",
    currency: "AOA",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
};
