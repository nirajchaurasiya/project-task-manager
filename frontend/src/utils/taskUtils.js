// const formatDueDate = (dueDate) => {
//   const date = new Date(dueDate);
//   return date.toLocaleDateString();
// };

const isDueDateMissed = (dueDate) => {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);
  return currentDate > dueDateObj;
};

export { isDueDateMissed };
