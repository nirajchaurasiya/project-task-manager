import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTask = asyncHandler(async (req, res, next) => {
   try {
      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized user");
      }

      const user = await User.findById(userId);

      if (!user) {
         throw new ApiError(404, "User couldn't be found");
      }

      const { title, priority, checkList, dueDate, assignedTo } = req?.body;

      if (!title || !priority || checkList.length < 1) {
         throw new ApiError(400, "All fields are mandatory");
      }

      const task = await Task.create({
         title,
         priority,
         checkList,
         dueDate: dueDate ? dueDate : "",
         assignedTo: assignedTo ? assignedTo : "",
         owner: userId,
      });

      await task.create();

      const createdTask = await Task.findById(task._id);

      if (!createdTask) {
         throw new ApiError(
            500,
            "Something went wrong while creating the task"
         );
      }

      return res
         .status(200)
         .json(new ApiResponse(200, createdTask, "Task created"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const deleteTask = asyncHandler(async (req, res, next) => {
   try {
      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized request");
      }

      const user = await User.findById(userId);

      if (!user) {
         throw new ApiError(401, "Unauthorized request");
      }

      const taskId = req?.params?.taskId;

      if (!taskId) {
         throw new ApiError(400, "Task ID is mandatory");
      }

      const task = await Task.findById(taskId);

      if (!task) {
         throw new ApiError(404, "Task doesn't exists");
      }

      await Task.findByIdAndDelete(taskId);

      const ctask = await Task.findById(taskId);

      if (ctask) {
         throw new ApiError(
            405,
            "Something went wrong while deleting the task"
         );
      }

      return res
         .status(200)
         .json(new ApiResponse(200, { taskId }, "Task deleted"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const updateTask = asyncHandler(async (req, res, next) => {
   try {
      const {
         title,
         priority,
         dueDate,
         checkList,
         assignedTo,
         state,
         isCompleted,
      } = req?.body;

      const taskId = req?.params?.taskId;

      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized request");
      }

      const task = await Task.findById(taskId);

      if (!task) {
         throw new ApiError(400, "Task doesn't exists");
      }

      if (title) {
         task.title = title;
      }

      if (priority) {
         task.priority = priority;
      }

      if (dueDate) {
         task.dueDate = dueDate;
      }

      if (checkList.length > 0) {
         task.checkList = checkList;
      }

      if (assignedTo) {
         task.assignedTo = assignedTo;
      }

      if (state) {
         task.state = state;
      }

      if (isCompleted) {
         task.isCompleted = isCompleted;
      }

      await task.save();

      const updatedTask = await Task.findById(taskId);

      return res
         .status(200)
         .json(new ApiResponse(200, updatedTask, "Task updated"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

export { createTask, deleteTask, updateTask };
