export const handleDateFromCreatedAtAndUpdatedAt = (str: number): string => {
  return new Date(str).toLocaleString();
};
