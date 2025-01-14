const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const attendanceRoutes = require("./routes/Attendance");
const authRoutes = require("./routes/auth");

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*", // For testing, change to specific origin in production
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoutes); // Namespace for auth routes
app.use("/attendance", attendanceRoutes); // Namespace for attendance routes

// Error handling middleware (placed after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler (must be at the bottom)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
