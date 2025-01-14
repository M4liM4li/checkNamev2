const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const attendanceRouter = require("./routes/Attendance");

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*", // หรือ URL ของแอป React ของคุณ
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use("/api", authRouter);
app.use("/api", attendanceRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
    details: err.message, // สามารถส่งข้อความเพิ่มเติมจากข้อผิดพลาด
  });
});
app.listen(5000, () => console.log("server running port 5000x"));

module.exports = app;
