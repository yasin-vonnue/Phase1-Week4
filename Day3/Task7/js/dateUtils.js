const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(date, format) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  switch (format) {
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;

    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;

    case "Month DD, YYYY":
      return `${MONTHS[date.getMonth()]} ${day}, ${year}`;

    case "relative": {
      const now = new Date();
      const difference = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (difference === 0) {
        return "today";
      }

      if (difference === 1) {
        return "1 day ago";
      }

      return `${difference} days ago`;
    }

    default:
      throw new Error("Unsupported format");
  }
}
