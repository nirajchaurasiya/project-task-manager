const formatDueDate = (string) => {
  const date = new Date(string);

  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();

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
  const monthName = monthNames[monthIndex];

  //   console.log("Day:", day);
  //   console.log("Month:", monthName);
  return `${monthName} ${day}`;
};

export { formatDueDate };
