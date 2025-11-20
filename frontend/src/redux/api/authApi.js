import api from "../../lib/apiRequest";

// Register
export const registerRequest = (payload) => {
  return api.post("/auth/register", payload);
};

// Login
export const loginRequest = (payload) => {
  return api.post("/auth/login", payload);
};

// Get user 
export const fetchUserRequest = () => {
  return api.get("/auth/user");
};

// Update user
export const updateUserRequest = (payload) => {
  return api.put("/auth/user/update", payload);
};

// Logout
export const logoutRequest = () => {
  return api.post("/auth/logout");
};
