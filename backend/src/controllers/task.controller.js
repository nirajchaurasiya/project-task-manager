import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isDueDateMissed = (dueDate) => {
   const currentDate = new Date();
   const dueDateObj = new Date(dueDate);
   return currentDate > dueDateObj;
};

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

      const { title, priority, checklist, dueDate, assignedTo } = req?.body;
      console.log(title, priority, checklist, dueDate, assignedTo);
      if (!title || !priority || checklist?.length < 1) {
         throw new ApiError(400, "All fields are mandatory");
      }
      console.log(checklist);
      console.log(req?.body);
      const task = await Task.create({
         title,
         priority,
         checklist,
         dueDate: dueDate ? dueDate : "",
         assignedTo: assignedTo ? assignedTo : "",
         owner: userId,
      });

      await task.save();

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
      console.log(error);
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
      const { title, priority, dueDate, checklist, assignedTo } = req?.body;
      console.log(req?.body?.title);
      console.log(req?.body?.taskData);
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

      if (checklist && checklist?.length > 0) {
         task.checklist = checklist;
      }

      if (assignedTo) {
         task.assignedTo = assignedTo;
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

const updateChecklist = asyncHandler(async (req, res, next) => {
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

      const { changedItems } = req.body;

      if (!Array.isArray(changedItems)) {
         throw new ApiError(
            400,
            "Invalid request body: changedItems should be an array"
         );
      }

      const updateObj = {};
      changedItems.forEach(({ itemId, isChecked }) => {
         updateObj[`checklist.$[elem${itemId}].isChecked`] = isChecked;
      });

      const options = {
         arrayFilters: changedItems.map(({ itemId }) => ({
            [`elem${itemId}._id`]: itemId,
         })),
         new: true,
      };

      // Update the task using findByIdAndUpdate
      const updatedTask = await Task.findByIdAndUpdate(
         taskId,
         updateObj,
         options
      );

      if (!updatedTask) {
         throw new ApiError(404, "Task not found or could not be updated");
      }

      const populatedTask = await Task.findById(taskId);

      return res
         .status(200)
         .json(
            new ApiResponse(200, { task: populatedTask }, "Checklist updated")
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const changeTaskPhase = asyncHandler(async (req, res, next) => {
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

      const { state } = req?.body;

      if (!state) {
         throw new ApiError(400, "State is mandatory");
      }

      if (!taskId) {
         throw new ApiError(400, "Task ID is mandatory");
      }

      const task = await Task.findById(taskId);

      if (!task) {
         throw new ApiError(404, "Task doesn't exists");
      }

      await Task.findByIdAndUpdate(
         taskId,
         { $set: { state, isCompleted: false } },
         { new: true }
      );

      if (state === "done" && !isDueDateMissed(task?.dueDate)) {
         await Task.findByIdAndUpdate(
            taskId,
            { $set: { isCompleted: true } },
            { new: true }
         );
      }

      const updatedTask = await Task.findById(taskId);

      return res
         .status(200)
         .json(
            new ApiResponse(200, { task: updatedTask }, "Task state updated")
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const getTasksCreatedToday = async (req, res, next) => {
   try {
      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized access");
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tasks = await Task.aggregate([
         {
            $match: {
               owner: userId,
               createdAt: {
                  $gte: today,
               },
            },
         },
         {
            $addFields: {
               state: {
                  $switch: {
                     branches: [
                        {
                           case: { $eq: ["$state", "inprogress"] },
                           then: "inprogress",
                        },
                        { case: { $eq: ["$state", "todo"] }, then: "todo" },
                        {
                           case: { $eq: ["$state", "backlog"] },
                           then: "backlog",
                        },
                        { case: { $eq: ["$state", "done"] }, then: "done" },
                     ],
                     default: "Unknown",
                  },
               },
            },
         },
         {
            $sort: {
               updatedAt: 1, // Sort by createdAt ascending
            },
         },
         {
            $group: {
               _id: "$state",
               tasks: {
                  $push: {
                     _id: "$_id",
                     title: "$title",
                     checklist: {
                        $map: {
                           input: "$checklist",
                           as: "item",
                           in: {
                              title: "$$item.title",
                              isChecked: "$$item.isChecked",
                              _id: "$$item._id",
                           },
                        },
                     },
                     priority: "$priority",
                     dueDate: "$dueDate",
                     state: "$state",
                  },
               },
            },
         },
         {
            $project: {
               _id: 0,
               state: "$_id",
               tasks: 1,
            },
         },
      ]);

      const formattedTasks = {
         inprogress: [],
         todo: [],
         backlog: [],
         done: [],
      };

      tasks.forEach((task) => {
         switch (task.state) {
            case "inprogress":
               formattedTasks.inprogress = task.tasks;
               break;
            case "todo":
               formattedTasks.todo = task.tasks;
               break;
            case "backlog":
               formattedTasks.backlog = task.tasks;
               break;
            case "done":
               formattedTasks.done = task.tasks;
               break;
            default:
               break;
         }
      });

      console.log(formattedTasks);
      return res
         .status(200)
         .json(
            new ApiResponse(
               200,
               { formattedTasks },
               "Formatted tasks created today retrieved"
            )
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
};

const getFormattedTasksThisWeek = async (req, res) => {
   try {
      const userId = req?.user?._id;
      if (!userId) {
         throw new ApiError(401, "Unatuhorized user");
      }
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date();
      endOfWeek.setHours(23, 59, 59, 999);
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

      const tasks = await Task.aggregate([
         {
            $match: {
               owner: userId,
            },
         },
         {
            $match: {
               updatedAt: {
                  $gte: startOfWeek,
                  $lte: endOfWeek,
               },
            },
         },
         {
            $addFields: {
               status: {
                  $switch: {
                     branches: [
                        {
                           case: { $eq: ["$state", "inprogress"] },
                           then: "inprogress",
                        },
                        { case: { $eq: ["$state", "todo"] }, then: "todo" },
                        {
                           case: { $eq: ["$state", "backlog"] },
                           then: "backlog",
                        },
                        { case: { $eq: ["$state", "done"] }, then: "done" },
                     ],
                     default: "Unknown",
                  },
               },
            },
         },
         {
            $sort: {
               updatedAt: 1, // Sort by createdAt ascending
            },
         },
         {
            $group: {
               _id: "$status",
               tasks: {
                  $push: {
                     _id: "$_id",
                     title: "$title",
                     priority: "$priority",
                     dueDate: "$dueDate",
                     checklist: {
                        $map: {
                           input: "$checklist",
                           as: "item",
                           in: {
                              title: "$$item.title",
                              isChecked: "$$item.isChecked",
                              _id: "$$item._id",
                           },
                        },
                     },
                     assignedTo: "$assignedTo",
                     state: "$state",
                     isCompleted: "$isCompleted",
                     owner: "$owner",
                     createdAt: "$createdAt",
                     updatedAt: "$updatedAt",
                  },
               },
            },
         },
         {
            $project: {
               _id: 0,
               status: "$_id",
               tasks: 1,
            },
         },
      ]);

      const formattedTasks = {
         inprogress: [],
         todo: [],
         backlog: [],
         done: [],
      };

      tasks.forEach((task) => {
         formattedTasks[task.status] = task.tasks;
      });

      console.log(formattedTasks);
      return res
         .status(200)
         .json(
            new ApiResponse(
               200,
               { formattedTasks },
               "Formatted tasks retrieved"
            )
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
};

const getTasksCreatedThisMonth = async (req, res, next) => {
   try {
      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized user");
      }
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);
      endOfMonth.setHours(23, 59, 59, 999);

      const tasks = await Task.aggregate([
         {
            $match: {
               owner: userId,
               createdAt: {
                  $gte: startOfMonth,
                  $lte: endOfMonth,
               },
            },
         },
         {
            $addFields: {
               status: {
                  $switch: {
                     branches: [
                        {
                           case: { $eq: ["$state", "inprogress"] },
                           then: "inprogress",
                        },
                        { case: { $eq: ["$state", "todo"] }, then: "todo" },
                        {
                           case: { $eq: ["$state", "backlog"] },
                           then: "backlog",
                        },
                        { case: { $eq: ["$state", "done"] }, then: "done" },
                     ],
                     default: "Unknown",
                  },
               },
            },
         },
         {
            $sort: {
               updatedAt: 1, // Sort by createdAt ascending
            },
         },
         {
            $group: {
               _id: "$status",
               tasks: {
                  $push: {
                     _id: "$_id",
                     title: "$title",
                     priority: "$priority",
                     dueDate: "$dueDate",
                     checklist: {
                        $map: {
                           input: "$checklist",
                           as: "item",
                           in: {
                              title: "$$item.title",
                              isChecked: "$$item.isChecked",
                              _id: "$$item._id",
                           },
                        },
                     },
                     assignedTo: "$assignedTo",
                     state: "$state",
                     isCompleted: "$isCompleted",
                     owner: "$owner",
                     createdAt: "$createdAt",
                     updatedAt: "$updatedAt",
                  },
               },
            },
         },
         {
            $project: {
               _id: 0,
               status: "$_id",
               tasks: 1,
            },
         },
      ]);

      const formattedTasks = {
         inprogress: [],
         todo: [],
         backlog: [],
         done: [],
      };

      tasks.forEach((task) => {
         formattedTasks[task.status] = task.tasks;
      });

      console.log(formattedTasks);
      return res
         .status(200)
         .json(
            new ApiResponse(
               200,
               { formattedTasks },
               "Formatted tasks created this month retrieved"
            )
         );
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
};

const getTaskWithId = asyncHandler(async (req, res, next) => {
   try {
      const { taskId } = req?.params;

      if (!taskId) {
         throw new ApiError(400, "TaskId is mandatory");
      }

      const task = await Task.findById(taskId);

      if (!task) {
         throw new ApiError(404, "Task couldn't be found");
      }

      return res
         .status(200)
         .json(new ApiResponse(200, { task }, "Task fetched"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const getAllAnalytics = asyncHandler(async (req, res, next) => {
   try {
      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized request");
      }

      const allStates = ["backlog", "todo", "inprogress", "done"];
      const allPriorities = ["low", "moderate", "high"];

      const analytics = await Task.aggregate([
         {
            $match: {
               owner: userId,
            },
         },
         {
            $facet: {
               stateCounts: [
                  { $group: { _id: "$state", count: { $sum: 1 } } },
                  { $project: { _id: 0, state: "$_id", count: 1 } },
               ],
               priorityCounts: [
                  { $group: { _id: "$priority", count: { $sum: 1 } } },
                  { $project: { _id: 0, priority: "$_id", count: 1 } },
               ],
               dueDateCounts: [
                  {
                     $match: {
                        dueDate: { $ne: "" },
                     },
                  },
                  {
                     $count: "count",
                  },
               ],
            },
         },
         {
            $project: {
               stateCounts: {
                  $map: {
                     input: allStates,
                     as: "state",
                     in: {
                        state: "$$state",
                        count: {
                           $ifNull: [
                              {
                                 $arrayElemAt: [
                                    {
                                       $filter: {
                                          input: "$stateCounts",
                                          as: "sc",
                                          cond: {
                                             $eq: ["$$sc.state", "$$state"],
                                          },
                                       },
                                    },
                                    0,
                                 ],
                              },
                              { count: 0 },
                           ],
                        },
                     },
                  },
               },
               priorityCounts: {
                  $map: {
                     input: allPriorities,
                     as: "priority",
                     in: {
                        priority: "$$priority",
                        count: {
                           $ifNull: [
                              {
                                 $arrayElemAt: [
                                    {
                                       $filter: {
                                          input: "$priorityCounts",
                                          as: "pc",
                                          cond: {
                                             $eq: [
                                                "$$pc.priority",
                                                "$$priority",
                                             ],
                                          },
                                       },
                                    },
                                    0,
                                 ],
                              },
                              { count: 0 },
                           ],
                        },
                     },
                  },
               },
               dueDateCounts: {
                  $arrayElemAt: ["$dueDateCounts.count", 0],
               },
            },
         },
      ]);

      // Extracting the numbers only
      const stateCounts = analytics[0].stateCounts.reduce((acc, curr) => {
         acc[curr.state] = curr.count.count;
         return acc;
      }, {});

      const priorityCounts = analytics[0].priorityCounts.reduce((acc, curr) => {
         acc[curr.priority] = curr.count.count;
         return acc;
      }, {});

      const dueDateCounts = analytics[0].dueDateCounts;

      const result = {
         stateCounts,
         priorityCounts,
         dueDateCounts,
      };

      return res
         .status(200)
         .json(new ApiResponse(200, result, "Analytics data fetched"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

const deleteTaskById = asyncHandler(async (req, res, next) => {
   try {
      const userId = req?.user?._id;

      if (!userId) {
         throw new ApiError(401, "Unauthorized user");
      }

      const user = await User.findById(userId);

      if (!user) {
         throw new ApiError(401, "User couldn't be found");
      }

      const { taskId } = req?.params;

      if (!taskId) {
         throw new ApiError(400, "Task ID is mandatory");
      }

      const task = await Task.findById(taskId);

      if (!task) {
         throw new ApiError(404, "Task doesn't exists");
      }

      await Task.findByIdAndDelete(taskId);

      const isTaskDeleted = await Task.findById(taskId);

      if (isTaskDeleted) {
         throw new ApiError(
            405,
            "Something went wrong while deleting the task"
         );
      }

      return res.status(200).json(new ApiResponse(200, [], "Task deleted"));
   } catch (error) {
      if (error instanceof ApiError) {
         return next(error);
      }
      next(new ApiError(500, "Something went wrong"));
   }
});

export {
   createTask,
   deleteTask,
   updateTask,
   updateChecklist,
   changeTaskPhase,
   getTasksCreatedToday,
   getFormattedTasksThisWeek,
   getTasksCreatedThisMonth,
   getTaskWithId,
   getAllAnalytics,
   deleteTaskById,
};
