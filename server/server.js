const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const attendanceRouter = require("./routes/attendanceRouter");

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

app.use("/api", authRouter);
app.use("/api", attendanceRouter);

app.listen(5000, () => console.log("server running port 5000x"));
