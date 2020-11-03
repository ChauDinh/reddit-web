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
  const idx = new Date(str).getMonth() - 1;
  return months[idx];
};

export const handleYearFromCreatedAt = (str: number): number => {
  return new Date(str).getFullYear();
};
