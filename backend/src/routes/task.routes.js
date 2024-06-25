import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
   createTask,
   deleteTask,
   getFormattedTasksThisWeek,
   updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createTask);

router.route("/delete/:taskId").delete(verifyJWT, deleteTask);

router.route("/update/:taskId").patch(verifyJWT, updateTask);

router.route("/get-formatted-tasks").get(verifyJWT, getFormattedTasksThisWeek);

export default router;
