import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js';
import healthRoute from "./routes/health.route.js";
import { connect } from './lib/db.js';

dotenv.config();

const app = express();

// Parse cookies
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// Enable CORS for frontend
app.use(cors({
  origin: [process.env.ORIGIN || 'http://localhost:5173'],
  credentials: true,
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
//only for checking the performance
app.use("/api/health", healthRoute);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}!`);
});
