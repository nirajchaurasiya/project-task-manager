import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
   changeTaskPhase,
   createTask,
   deleteTask,
   deleteTaskById,
   getAllAnalytics,
   getFormattedTasksThisWeek,
   getTaskWithId,
   updateChecklist,
   updateTask,
   getTasksCreatedThisMonth,
   getTasksCreatedToday,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createTask);

router.route("/delete/:taskId").delete(verifyJWT, deleteTask);

router.route("/update/:taskId").patch(verifyJWT, updateTask);

router.route("/update-checklist/:taskId").patch(verifyJWT, updateChecklist);

router.route("/update-task-state/:taskId").patch(verifyJWT, changeTaskPhase);

// Default is this week

router.route("/get-formatted-tasks").get(verifyJWT, getFormattedTasksThisWeek);

router
   .route("/get-formatted-tasks-this-month")
   .get(verifyJWT, getTasksCreatedThisMonth);

router
   .route("/get-formatted-tasks-this-day")
   .get(verifyJWT, getTasksCreatedToday);

router.route("/get-task/:taskId").get(getTaskWithId);

router.route("/anaytics").get(verifyJWT, getAllAnalytics);

router.route("/delete/:taskId").delete(verifyJWT, deleteTaskById);

export default router;
