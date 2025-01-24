import React, { useState, useEffect } from "react";
import style from "../style/StudentList.module.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://check-namev2-serverx.vercel.app/api/lisstname");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch studentsx:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h4>รายชื่อ</h4>
        <ul>
          {students.map((student) => (
            <li key={student.id} className={style.li}>
              <span className={style.name}>
                {student.id} {student.name}
              </span>
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
