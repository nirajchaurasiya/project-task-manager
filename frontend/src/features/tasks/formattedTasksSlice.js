import { createSlice } from "@reduxjs/toolkit";

export const formattedTasksSlice = createSlice({
  name: "formattedTasks",
  initialState: {
    formattedTasks: null,
  },
  reducers: {
    saveFormattedTasks: (state, action) => {
      state.formattedTasks = action.payload;
    },
    updateCheckListInStore: (state, action) => {
      const updatedTask = action.payload;
      const taskId = updatedTask._id;

      switch (updatedTask.state) {
        case "backlog":
          // Update backlog tasks
          state.formattedTasks.backlog = state.formattedTasks.backlog.map(
            (task) =>
              task._id === taskId
                ? { ...task, checklist: updatedTask.checklist }
                : task
          );
          break;
        case "todo":
          // Update todo tasks
          state.formattedTasks.todo = state.formattedTasks.todo.map((task) =>
            task._id === taskId
              ? { ...task, checklist: updatedTask.checklist }
              : task
          );
          break;
        case "inprogress":
          // Update inprogress tasks
          state.formattedTasks.inprogress = state.formattedTasks.inprogress.map(
            (task) =>
              task._id === taskId
                ? { ...task, checklist: updatedTask.checklist }
                : task
          );
          break;
        case "done":
          // Update done tasks
          state.formattedTasks.done = state.formattedTasks.done.map((task) =>
            task._id === taskId
              ? { ...task, checklist: updatedTask.checklist }
              : task
          );
          break;
        default:
          break;
      }
    },
    updateTaskState: (state, action) => {
      const updatedTask = action.payload;
      const taskId = updatedTask._id;

      // Remove the task from its previous state
      Object.keys(state.formattedTasks).forEach((key) => {
        state.formattedTasks[key] = state.formattedTasks[key].filter(
          (task) => task._id !== taskId
        );
      });

      // Add the task to its new state
      state.formattedTasks[updatedTask.state].push({
        ...updatedTask,
        state: updatedTask.state,
      });
    },
    addSingleTask: (state, action) => {
      const newTask = action.payload;
      state.formattedTasks[newTask.state].push(newTask);
    },

    addSingleTask: (state, action) => {
      // Logic to add a single task to the appropriate state array
      const newTask = action.payload;
      switch (newTask.state) {
        case "backlog":
          state.formattedTasks.backlog.push(newTask);
          break;
        case "todo":
          state.formattedTasks.todo.push(newTask);
          break;
        case "inprogress":
          state.formattedTasks.inprogress.push(newTask);
          break;
        case "done":
          state.formattedTasks.done.push(newTask);
          break;
        default:
          break;
      }
    },
  },
});

export const {
  saveFormattedTasks,
  addSingleTask,
  updateCheckListInStore,
  updateTaskState,
} = formattedTasksSlice.actions;

export default formattedTasksSlice.reducer;
