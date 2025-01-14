const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}));

// โหลด routes ด้วย try-catch
try {
    readdirSync("./routes").map((item) => {
        if(item.endsWith('.js')) {  // เช็คว่าเป็นไฟล์ .js
            const route = require("./routes/" + item);
            app.use("/api", route);
        }
    });
} catch (error) {
    console.error('Error loading routes:', error);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
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