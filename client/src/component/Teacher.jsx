import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/Teacher.module.css";
import { Camera } from "react-camera-pro";

const Teacher = () => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);

  const userInfo = {
    fullname: "ศิวกร",
    department: "แผนกเทคโนโลยีสารสนเทศ",
  };
  // แยกส่วนแสดงข้อมูลผู้ใช้

  const handleTakePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo);
      setIsUsingCamera(false);
    }
  };

  return (
    <div style={style.container}>
      <div style={style.content}>
        <div style={style.question}>
          {isUsingCamera ? (
            <div style={style.cameraContainer}>
              <Camera
                ref={camera}
                numberOfCamerasCallback={setNumberOfCameras}
                facingMode="user"
                aspectRatio={1}
                errorMessages={{
                  noCameraAccessible: "ไม่สามารถเข้าถึงกล้องได้",
                  permissionDenied: "กรุณาอนุญาตการใช้งานกล้อง",
                  switchCamera: "ไม่สามารถสลับกล้องได้",
                  canvas: "Canvas ไม่สามารถใช้งานได้",
                }}
              />
            </div>
          ) : image ? (
            <img
              src={image}
              alt={userInfo?.fullname || "Profile"}
              style={style.questionImg}
            />
          ) : (
            <img
              src="/assets/default-profile.png"
              alt={userInfo?.fullname || "Profile"}
              style={style.questionImg}
              onError={(e) => {
                e.target.src = "/assets/default-profile.png";
              }}
            />
          )}
        </div>

        <div style={style.buttonContainer}>
          {!isUsingCamera ? (
            <button style={style.button} onClick={() => setIsUsingCamera(true)}>
              เปิดกล้อง
            </button>
          ) : (
            <>
              <button style={style.button} onClick={handleTakePhoto}>
                ถ่ายรูป
              </button>
              {numberOfCameras > 1 && (
                <button
                  style={style.button}
                  onClick={() => {
                    if (camera.current) {
                      camera.current.switchCamera();
                    }
                  }}
                >
                  สลับกล้อง
                </button>
              )}
              <button
                style={style.button}
                onClick={() => setIsUsingCamera(false)}
              >
                ยกเลิก
              </button>
            </>
          )}
        </div>

        <h2 style={{ color: "#16FF0A" }}>{userInfo.fullname}</h2>

        <h3 style={{ color: "#FF0A0E", ...style.contentH3 }}>
          {userInfo.department}
        </h3>
      </div>
    </div>
  );
};

export default Teacher;
