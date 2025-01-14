const prisma = require("../config/prisma");

exports.attendance = async (req, res) => {
  try {
    const { stdcode } = req.body;

    // ตรวจสอบว่า stdcode ถูกส่งมาหรือไม่
    if (!stdcode) {
      return res.status(400).json({ message: "stdcode is required" });
    }

    // ค้นหา User ที่มี stdcode ตรงกัน
    const user = await prisma.user.findFirst({
      where: { stdcode },
    });

    // หากไม่พบ User ที่มี stdcode ตรงกัน
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ตรวจสอบว่ามี attendance สำหรับ user นี้อยู่แล้วหรือไม่
    const check = await prisma.attendance.findFirst({
      where: {
        userID: user.id,
      },
    });

    if (check) {
      return res.status(400).json({ message: "Attendance already exists" });
    }

    // สร้าง Attendance ใหม่ พร้อมกำหนดสถานะเป็น "present" (สามารถปรับให้เป็น "absent" ได้ถ้าจำเป็น)
    await prisma.attendance.create({
      data: {
        userID: user.id,
        status: true, // "true" หมายถึง present
      },
    });

    res.status(201).json({ message: "Attendance registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    // ดึงข้อมูลผู้ใช้
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        stdcode: true,
        fullname: true,
        image: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ดึงข้อมูลการเช็คชื่อ
    const attendance = await prisma.attendance.findMany({
      where: { userID: userId },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    res.json({
      success: true,
      user: user,
      attendanceRecords: attendance.map((record) => ({
        attendanceId: record.id,
        status: record.status ? "present" : "absent",
        time: record.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
