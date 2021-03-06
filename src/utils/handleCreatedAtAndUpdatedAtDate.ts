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

export const isToday = (str: number): string | boolean => {
  const currDate = new Date();
  const inputDate = new Date(str);
  if (currDate.getFullYear() !== inputDate.getFullYear()) {
    return false;
  } else {
    if (currDate.getDate() === inputDate.getDate()) {
      return "Today";
    } else if (currDate.getDate() - inputDate.getDate() === 1) {
      return "1 day ago";
    } else if (currDate.getDate() - inputDate.getDate() === 2) {
      return "2 days ago";
    } else {
      return false;
    }
  }
};
