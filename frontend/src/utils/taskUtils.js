// const formatDueDate = (dueDate) => {
//   const date = new Date(dueDate);
//   return date.toLocaleDateString();
// };

// const isDueDateMissed = (dueDate) => {
//   const currentDate = new Date();
//   const dueDateObj = new Date(dueDate);
//   return currentDate > dueDateObj;
// };

const isDueDateMissed = (dueDate) => {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);
  
  // Set dueDateObj to the end of the day
  dueDateObj.setHours(23, 59, 59, 999); // Set to 23:59:59.999 local time
  
  // Compare dates
  return currentDate.getTime() > dueDateObj.getTime();
};

export { isDueDateMissed };