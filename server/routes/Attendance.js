const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { listUsers } = require("../controllers/Attendance");
const attendanceController = require("../controllers/Attendance");

router.post("/attendance", attendanceController.attendance); 
router.get("/listUsers", authenticate, listUsers);

module.exports = router;
