const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const handleDateFromCreatedAtAndUpdatedAt = (str: number): string => {
  return new Date(str).toLocaleString();
};

export const handleMonthFromCreatedAt = (str: number): string => {
  const idx = new Date(str).getMonth();
  return months[idx];
};

export const handleYearFromCreatedAt = (str: number): number => {
  return new Date(str).getFullYear();
};

export const handleDateFromCreatedAt = (str: number): number => {
  return new Date(str).getDate();
};
