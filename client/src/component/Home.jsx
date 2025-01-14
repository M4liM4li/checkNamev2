import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/Home.module.css";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      setError(null);
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/listUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // แยกการเซ็ตข้อมูลผู้ใช้และข้อมูลการเช็คชื่อ
        if (data.user) {
          setUserInfo(data.user);
        }
        if (data.attendanceRecords) {
          setAttendanceRecords(data.attendanceRecords);
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(fetchUserData, 3000);
    return () => clearInterval(interval);
  }, [navigate]);

  if (isLoading) {
    return <div className={style.loading}>กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  // แยกส่วนแสดงข้อมูลผู้ใช้
  const UserProfile = () => (
    <>
      <div className={style.question}>
        <img
          src={`/assets/${userInfo?.image}`}
          alt={userInfo?.fullname || "Profile"}
          onError={(e) => {
            e.target.src = "/assets/default-profile.png";
          }}
        />
      </div>
      <h2 className={style.fullname} style={{ color: "#16FF0A" }}>{userInfo?.fullname}</h2>
      <h3 className={style.department}style={{ color: "#FF0A0E" }}>แผนกเทคโนโลยีสารสนเทศ</h3>
    </>
  );

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.sun}></div>
        <div className={style.cloud}>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
        </div>
        <div className={style.cloud}>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
        </div>
        <div className={style.cloud}>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
        </div>
        <div className={style.cloud}>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
          <div className={style.cloud}></div>
        </div>
        {/* แสดงข้อมูลผู้ใช้เสมอถ้ามีข้อมูล */}
        {userInfo && <UserProfile />}

        {/* แสดงข้อมูลการเช็คชื่อเฉพาะเมื่อมีข้อมูล */}
        {attendanceRecords.length > 0 && (
          <div className={style.attendance}>
            <ul>
              {attendanceRecords.map((record) => (
                <li key={record.attendanceId} className={style.record}>
                  <h2
                    className={
                      record.status === "present" ? style.present : style.absent
                    }
                  >
                    {record.status === "present" ? "เข้าแถว" : "ยังไม่เช็คชื่อ"}
                  </h2>
                  <h4>{new Date(record.time).toLocaleString("th-TH")}</h4>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
