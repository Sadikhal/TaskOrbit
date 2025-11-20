import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../api/taskApi";

// Fetch tasks search/filter/sort/pagination
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params = {}, thunkAPI) => {
    try {
      const res = await fetchTasksRequest(params);
      return res.data; // { tasks, total, page, perPage }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);
// creation of tasks
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (payload, thunkAPI) => {
    try {
      const res = await createTaskRequest(payload);
      return res.data.task || res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create task"
      );
    }
  }
);

// updation of tasks
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateTaskRequest(id, data);
      return res.data.task || res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update task"
      );
    }
  }
);

// deletion of tasks
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await deleteTaskRequest(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  perPage: 5,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTaskError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.tasks || [];
        state.total = action.payload.total || 0;
        state.perPage = action.payload.perPage || 5;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.list.findIndex((t) => t._id === updated._id);
        if (idx !== -1) state.list[idx] = updated;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((t) => t._id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;
