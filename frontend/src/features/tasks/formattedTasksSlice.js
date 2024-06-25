import { createSlice } from "@reduxjs/toolkit";
// { inprogress: [], todo: [], backlog: [], done: [] }
export const formattedTasksSlice = createSlice({
  name: "formattedTasks",
  initialState: {
    formattedTasks: null,
  },
  reducers: {
    saveFormattedTasks: (state, action) => {
      state.formattedTasks = action.payload;
    },

    addSingleTask: (state, action) => {
      switch (action.payload.state) {
        case "backlog":
          state.formattedTasks.backlog.push(action.payload);
          break;
        case "todo":
          state.formattedTasks.todo.push(action.payload);
          break;
        case "inprogress":
          state.formattedTasks.inprogress.push(action.payload);
          break;
        case "done":
          state.formattedTasks.done.push(action.payload);
          break;
        default:
          break;
      }
    },
  },
});

export const { saveFormattedTasks, addSingleTask } =
  formattedTasksSlice.actions;

export default formattedTasksSlice.reducer;
