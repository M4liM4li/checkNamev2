const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const connection = require("./config/db"); // นำเข้าการเชื่อมต่อฐานข้อมูล
const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/Attendance");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*", // หรือ URL ของแอป React ของคุณ
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// Session configuration
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// ใช้งาน Routes

app.use(authRoutes);
app.use(authRoutes);
// Logout route
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการออกจากระบบ",
      });
    }
    res.status(200).json({
      success: true,
      message: "ออกจากระบบสำเร็จ",
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "เกิดข้อผิดพลาดในระบบ",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
