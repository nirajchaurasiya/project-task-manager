import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
   changeTaskPhase,
   createTask,
   deleteTask,
   getFormattedTasksThisWeek,
   getTaskWithId,
   updateChecklist,
   updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createTask);

router.route("/delete/:taskId").delete(verifyJWT, deleteTask);

router.route("/update/:taskId").patch(verifyJWT, updateTask);

router.route("/update-checklist/:taskId").patch(verifyJWT, updateChecklist);

router.route("/update-task-state/:taskId").patch(verifyJWT, changeTaskPhase);

router.route("/get-formatted-tasks").get(verifyJWT, getFormattedTasksThisWeek);

router.route("/get-task/:taskId").get(getTaskWithId);

export default router;
