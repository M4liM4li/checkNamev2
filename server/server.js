const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");

// middleware
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

// Dynamically load all route files in the routes directory
readdirSync("./routes").forEach((item) => {
  if (item.endsWith(".js")) { // Check if the file is a .js file
    const route = require(`./routes/${item}`);
    app.use("/api", route);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
    details: err.message, // ส่งข้อความเพิ่มเติมจากข้อผิดพลาด
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));

