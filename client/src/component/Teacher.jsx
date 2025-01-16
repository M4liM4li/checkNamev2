import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import style from "../style/Teacher.module.css";

const Teacher = () => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [detectedName, setDetectedName] = useState("");

  const userInfo = {
    fullname: "ศิวกร",
    department: "แผนกเทคโนโลยีสารสนเทศ",
  };

  const handleTakePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo);
      setIsUsingCamera(false);

      // ส่งรูปภาพไปยัง server สำหรับประมวลผล
      sendImageToServer(photo);
    }
  };

  const sendImageToServer = async (photo) => {
    try {
      const formData = new FormData();

      const response = await fetch(photo);
      const blob = await response.blob();
      formData.append("image", blob, "photo.jpg");

      const res = await fetch(
        "https://stable-airedale-powerful.ngrok-free.app/compare-face",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      console.log(result);

      // ตั้งชื่อที่หาเจอใน Popup
      if (result && result.name) {
        setDetectedName(result.name);
        setPopupVisible(true); // แสดง Popup
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งรูปภาพ:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.question}>
          {isUsingCamera ? (
            <div className={style.cameraContainer}>
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
              className={style.questionImg}
            />
          ) : (
            <img
              alt={userInfo?.fullname || "Profile"}
              className={style.questionImg}
              onError={(e) => {
                e.target.src = "/assets/default-profile.png";
              }}
            />
          )}
        </div>
        <h2 className={style.fullname}>{userInfo.fullname}</h2>
        <h3 className={style.department}>{userInfo.department}</h3>

        <div className={style.buttonContainer}>
          {!isUsingCamera ? (
            <button
              className={style.button}
              onClick={() => setIsUsingCamera(true)}
            >
              เปิดกล้อง
            </button>
          ) : (
            <>
              <button className={style.button} onClick={handleTakePhoto}>
                ถ่ายรูป
              </button>
              {numberOfCameras > 1 && (
                <button
                  className={style.button}
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
                className={style.button}
                onClick={() => setIsUsingCamera(false)}
              >
                ยกเลิก
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {popupVisible && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <h2>พบชื่อในระบบ</h2>
            <p>ชื่อ: {detectedName}</p>
            <button
              className={style.button}
              onClick={() => setPopupVisible(false)}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
