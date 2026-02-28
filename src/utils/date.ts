export const formatDateFriendly = (
  date: string | Date,
  onlyTime: boolean = false,
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (onlyTime) {
    return dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
