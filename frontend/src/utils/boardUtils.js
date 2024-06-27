const monthNames = [
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
export const boardDate = () => {
  const date = new Date();

  const day = date.getDate();

  const month = date.getMonth();

  const monthName = monthNames[month];

  const year = date.getFullYear();

  return `${day} ${monthName}, ${year}`;
};
