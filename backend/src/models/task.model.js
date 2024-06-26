import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema(
   {
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
         type: String,
         default: "",
      },
      checklist: [
         {
            title: {
               type: String,
               required: true,
            },
            isChecked: {
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
         type: mongoose.Schema.ObjectId,
         ref: "User",
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export const Task = mongoose.model("Task", taskSchema);
