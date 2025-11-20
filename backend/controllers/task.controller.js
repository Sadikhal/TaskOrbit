import Task from "../models/task.model.js";
import { createError } from "../lib/createError.js";


// Create a new task
export const createTask = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, description, status } = req.body;

    // Validate  title
    if (!title) {
      return next(createError(400, "Task title is required"));
    }

    // Validate allowed status
    const validStatuses = ["pending", "in-progress", "completed"];
    if (status && !validStatuses.includes(status)) {
      return next(createError(400, "Invalid task status"));
    }
   // create the task
    const task = new Task({
      userId,
      title,
      description,
      status,
    });

    const savedTask = await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (err) {
    next(err);
  }
};


//get tasks
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.userId;
   // searching, pagiantion, filtering and sorting
    let {
      search = "",
      status = "",
      sort = "newest",
      page = 1,
      limit = 2,
    } = req.query;

    //pagination handling
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
   
    // searching and filtering handling
    const query = {
      userId,
      ...(status ? { status } : {}),
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Task.countDocuments(query);

    // sorting handling
    const sortOptions = { createdAt: sort === "oldest" ? 1 : -1 };

    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
      total,
      page,
      perPage: limit,
    });
  } catch (err) {
    next(err);
  }
};



// Fetch a single task
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    //validate the task
    if (!task) return next(createError(404, "Task not found"));

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};



// Update a task
export const updateTask = async (req, res, next) => {
  try {
    const { status, title } = req.body;

    // Validate title
    if (!title) {
      return next(createError(400, "Task title cannot be empty"));
    }
    // Validate status
    const validStatuses = ["pending", "in-progress", "completed"];
    if (status && !validStatuses.includes(status)) {
      return next(createError(400, "Invalid task status"));
    }
    //update the task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedTask) return next(createError(404, "Task not found"));
    
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};



// Delete a task
export const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    //validate the task
    if (!deleted) return next(createError(404, "Task not found"));

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
