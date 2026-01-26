export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${month}.${day}.${year}`;
};

export const formatDateLong = (date: string): string => {
  // Extract just the date part (YYYY-MM-DD) to avoid timezone issues
  const dateOnly = date.split("T")[0];

  // Create date object treating it as local time
  const dateObj = new Date(`${dateOnly}T00:00:00`);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

export const formatDateToMMDDYY = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());
  return `${month}${day}${year}`;
};
