import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
   cors({
      origin: "*",
      // OR
      // origin: process.env.CORS_ORIGIN
      // secure:true
   })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
// http://localhost:8000/api/v1/users

export { app };
