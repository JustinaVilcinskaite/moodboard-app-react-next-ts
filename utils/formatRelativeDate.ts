export const formatRelativeDate = (date: string | Date): string => {
  const targetDate = new Date(date);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (targetDate.getTime() - now.getTime()) / 1000,
  );

  if (Math.abs(diffInSeconds) < 60) {
    return "just now";
  }

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const minutes = Math.round(diffInSeconds / 60);
  if (Math.abs(minutes) < 60) {
    return rtf.format(minutes, "minute");
  }

  const hours = Math.round(diffInSeconds / 3600);
  if (Math.abs(hours) < 24) {
    return rtf.format(hours, "hour");
  }

  const days = Math.round(diffInSeconds / 86400);
  if (Math.abs(days) < 7) {
    return rtf.format(days, "day");
  }

  const weeks = Math.round(diffInSeconds / 604800);
  if (Math.abs(weeks) < 4) {
    return rtf.format(weeks, "week");
  }

  const months = Math.round(diffInSeconds / 2629800);
  if (Math.abs(months) < 12) {
    return rtf.format(months, "month");
  }

  const years = Math.round(diffInSeconds / 31557600);
  return rtf.format(years, "year");
};

// export const formatDate = (date: string | Date): string => {
//   return new Date(date).toLocaleDateString();
// };
