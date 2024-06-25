import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   priority: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true,
   },
   dueDate: {
      type: Date,
      default: "",
   },
   checkList: [
      {
         title: {
            type: String,
            required: true,
         },
         isCompleted: {
            type: Boolean,
            default: false,
         },
      },
   ],
   assignedTo: {
      type: String,
      default: "",
   },
   state: {
      type: String,
      enum: ["backlog", "todo", "inprogress", "done"],
      default: "todo",
      required: true,
   },
   isCompleted: {
      type: Boolean,
      default: false,
      required: true,
   },
   owner: {
      type: mongoose.Types.ObjectId(),
      ref: "User",
      required: true,
   },
});

export const Task = mongoose.model("Task", taskSchema);
