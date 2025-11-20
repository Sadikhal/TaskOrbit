import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middlware/verifyToken.js";

const router = express.Router();

// Create a task 
router.post("/", verifyToken, createTask);

// Get all tasks 
router.get("/", verifyToken, getTasks);

// Get single task
router.get("/:id", verifyToken, getTask);

// Update task
router.put("/:id", verifyToken, updateTask);

// Delete task
router.delete("/:id", verifyToken, deleteTask);

export default router;
