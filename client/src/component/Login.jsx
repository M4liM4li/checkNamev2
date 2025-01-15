import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://check-namev2-serverx.vercel.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      // ตรวจสอบสถานะของการตอบกลับ
      if (!response.ok) {
        setError(data.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
        return;
      }

      // เมื่อเข้าสู่ระบบสำเร็จ
      if (data.success) {
        // บันทึกข้อมูลผู้ใช้และ Token
        localStorage.setItem("user", JSON.stringify(data.user)); // เก็บข้อมูลผู้ใช้
        localStorage.setItem("token", data.token); // เก็บ Token

        if (data.user.role === "teacher") {
          navigate("/Teacher");
        } else {
          navigate("/Home");
        }
      } else {
        setError(data.message || "ข้อมูลไม่ถูกต้อง"); // แสดงข้อความผิดพลาด
      }
    } catch (err) {
      console.log(err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ"); // ข้อความข้อผิดพลาดเมื่อเกิดข้อผิดพลาดในการเชื่อมต่อ
    }
  };

  return (
    <div className={style.container}>
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
      <div className={style.content}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.input}>
            <input
              type="text"
              className={style.inputf}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className={style.label}>Username</span>
          </div>
          <div className={style.input}>
            <input
              type="password"
              className={style.inputf}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={style.label}>Password</span>
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
