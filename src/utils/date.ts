export const formatDateFriendly = (
  date: string | Date,
  withTime: boolean = false,
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  if (withTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  const formattedDate = dateObj.toLocaleDateString("pt-BR", options);

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};