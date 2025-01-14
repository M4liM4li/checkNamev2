import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import style from "../style/Teacher.module.css";

// Separate CameraCircle component
const CameraCircle = ({ userInfo }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="question relative w-48 h-48 rounded-full flex items-center justify-center text-6xl font-bold border-4 border-black overflow-hidden">
      {isStreaming ? (
        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
      ) : (
        <button
          onClick={startCamera}
          className="flex flex-col items-center justify-center w-full h-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Camera size={48} />
          <span className="text-sm mt-2">เปิดกล้อง</span>
        </button>
      )}
    </div>
  );
};

// Main Teacher component
const Teacher = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!userInfo) {
    return (
      <div className="container">
        <div className="content">
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <CameraCircle userInfo={userInfo} />
        <h2>
          {userInfo.firstname} {userInfo.lastname}
        </h2>
        <h3>แผนกเทคโนโลยีสารสนเทศ</h3>
      </div>
    </div>
  );
};

export default Teacher;
