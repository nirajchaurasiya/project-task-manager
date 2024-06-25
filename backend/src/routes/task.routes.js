import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
   createTask,
   deleteTask,
   updateTask,
} from "../controllers/task.controller";

const router = Router();

router.route("/create").post(verifyJWT, createTask);

router.route("/delete/:taskId").delete(verifyJWT, deleteTask);

router.route("/update/:taskId").patch(verifyJWT, updateTask);

export default router;
