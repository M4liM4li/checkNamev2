import React from "react";
import style from "../style/StudentList.module.css";

const StudentList = () => {
  const students = [
    { id: 1, name: "ศิวกร กนกสิงห์", status: "เข้าแถวแล้ว", time: "09:30" },
    { id: 2, name: "กานต์ สารินทร์", status: "ยังไม่เข้าแถว", time: null },
    { id: 3, name: "นภัสสร นพคุณ", status: "ยังไม่เข้าแถว", time: null },
    { id: 4, name: "ภูริ ทองคำ", status: "ยังไม่เข้าแถว", time: null },
  ];

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h4>รายชื่อ</h4>
        <ul>
          {students.map((student) => (
            <li key={student.id} className={style.li}>
              <span className={style.name}>{student.id} {student.name}</span>
              <span className={style.status}>
                {student.status}
                {student.time && ` ${student.time}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentList;
