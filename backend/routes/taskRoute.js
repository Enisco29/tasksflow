import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskbyId,
  updateTask,
} from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter
  .route("/gp")
  .get(authMiddleware, getTask)
  .post(authMiddleware, createTask);

taskRouter
  .route("/:id/gp")
  .get(authMiddleware, getTaskbyId)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default taskRouter;
