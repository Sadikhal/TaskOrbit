// Centralized API calls for tasks.


import api from "../../lib/apiRequest";

//get tasks
export const fetchTasksRequest = (params = {}) => {
  return api.get("/tasks", { params });
};

//create tasks
export const createTaskRequest = (payload) => {
  return api.post("/tasks", payload);
};

// upating tasks
export const updateTaskRequest = (id, payload) => {
  return api.put(`/tasks/${id}`, payload);
};

// deleting tasks 
export const deleteTaskRequest = (id) => {
  return api.delete(`/tasks/${id}`);
};
