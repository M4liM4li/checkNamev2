const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Import routes
const attendanceRoutes = require('./routes/Attendance');
const authRoutes = require('./routes/auth');

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}));

// ใช้ routes
app.use('/api', attendanceRoutes);
app.use('/api', authRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

app.listen(5000, () => console.log("server running port 5000"));