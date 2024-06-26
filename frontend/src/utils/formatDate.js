const formatDueDate = (string) => {
  const date = new Date(string);

  const day = date.getUTCDate(); // Correct method to get the day of the month
  const monthIndex = date.getUTCMonth(); // Get the zero-based month index

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
  const monthName = monthNames[monthIndex]; // Get the month name from the array

  //   console.log("Day:", day);
  //   console.log("Month:", monthName);
  return `${monthName} ${day}`;
};

export { formatDueDate };
