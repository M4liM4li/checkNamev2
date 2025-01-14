const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { listUsers, attendance } = require("../controllers/Attendance");

router.post("/attendance", authenticate, attendance); // เพิ่ม authenticate middleware
router.get("/listUsers", authenticate, listUsers);

module.exports = router;
