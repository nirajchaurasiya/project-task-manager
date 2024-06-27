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
          // Move updated task to the end
          state.formattedTasks.backlog.push(
            state.formattedTasks.backlog.splice(
              state.formattedTasks.backlog.findIndex(
                (task) => task._id === taskId
              ),
              1
            )[0]
          );
          break;
        case "todo":
          // Update todo tasks
          state.formattedTasks.todo = state.formattedTasks.todo.map((task) =>
            task._id === taskId
              ? { ...task, checklist: updatedTask.checklist }
              : task
          );
          // Move updated task to the end
          state.formattedTasks.todo.push(
            state.formattedTasks.todo.splice(
              state.formattedTasks.todo.findIndex(
                (task) => task._id === taskId
              ),
              1
            )[0]
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
          // Move updated task to the end
          state.formattedTasks.inprogress.push(
            state.formattedTasks.inprogress.splice(
              state.formattedTasks.inprogress.findIndex(
                (task) => task._id === taskId
              ),
              1
            )[0]
          );
          break;
        case "done":
          // Update done tasks
          state.formattedTasks.done = state.formattedTasks.done.map((task) =>
            task._id === taskId
              ? { ...task, checklist: updatedTask.checklist }
              : task
          );
          // Move updated task to the end
          state.formattedTasks.done.push(
            state.formattedTasks.done.splice(
              state.formattedTasks.done.findIndex(
                (task) => task._id === taskId
              ),
              1
            )[0]
          );
          break;
        default:
          break;
      }
    },

    updateTaskState: (state, action) => {
      const updatedTask = action.payload;
      const taskId = updatedTask._id;

      Object.keys(state.formattedTasks).forEach((key) => {
        state.formattedTasks[key] = state.formattedTasks[key].filter(
          (task) => task._id !== taskId
        );
      });

      state.formattedTasks[updatedTask.state].push({
        ...updatedTask,
        state: updatedTask.state,
      });
    },
    // addSingleTask: (state, action) => {
    //   const newTask = action.payload;
    //   state.formattedTasks[newTask.state].push(newTask);
    // },

    addSingleTask: (state, action) => {
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

    removeSingleTaskById: (state, action) => {
      const taskState = action.payload.state;
      const taskId = action.payload.taskId;

      if (state.formattedTasks[taskState]) {
        state.formattedTasks[taskState] = state.formattedTasks[
          taskState
        ].filter((e) => e._id !== taskId);
      }
    },

    updateSingleTask: (state, action) => {
      const updatedTask = action.payload;
      let existingTaskIndex = null;
      let taskList = null;

      switch (updatedTask.state) {
        case "backlog":
          existingTaskIndex = state.formattedTasks.backlog.findIndex(
            (task) => task._id === updatedTask._id
          );

          if (existingTaskIndex !== -1) {
            state.formattedTasks.backlog[existingTaskIndex] = updatedTask;
            taskList = state.formattedTasks.backlog;
          }
          break;
        case "todo":
          existingTaskIndex = state.formattedTasks.todo.findIndex(
            (task) => task._id === updatedTask._id
          );

          if (existingTaskIndex !== -1) {
            state.formattedTasks.todo[existingTaskIndex] = updatedTask;
            taskList = state.formattedTasks.todo;
          }
          break;
        case "inprogress":
          existingTaskIndex = state.formattedTasks.inprogress.findIndex(
            (task) => task._id === updatedTask._id
          );

          if (existingTaskIndex !== -1) {
            state.formattedTasks.inprogress[existingTaskIndex] = updatedTask;
            taskList = state.formattedTasks.inprogress;
          }
          break;
        case "done":
          existingTaskIndex = state.formattedTasks.done.findIndex(
            (task) => task._id === updatedTask._id
          );

          if (existingTaskIndex !== -1) {
            state.formattedTasks.done[existingTaskIndex] = updatedTask;
            taskList = state.formattedTasks.done;
          }
          break;
        default:
          break;
      }

      if (taskList && existingTaskIndex !== -1) {
        const movedTask = taskList.splice(existingTaskIndex, 1)[0];
        taskList.push(movedTask);
      }
    },
  },
});

export const {
  saveFormattedTasks,
  addSingleTask,
  updateCheckListInStore,
  updateTaskState,
  removeSingleTaskById,
  updateSingleTask,
} = formattedTasksSlice.actions;

export default formattedTasksSlice.reducer;
