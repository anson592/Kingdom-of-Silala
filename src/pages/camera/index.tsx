import React, { useState, useEffect } from "react";
import { Button, MessagePlugin } from "tdesign-react";
import { useCamera } from "@/hooks";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";

const CameraPage = () => {
  const [cameraRef, startCamera, stopCamera, takePhoto] = useCamera();
  const [photo, setPhoto] = useState("");
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if ([0, 1].includes(step)) {
      return;
    }
    startCamera();
    return () => {
      stopCamera();
    };
  }, [step]);

  if (step === 0) {
    setTimeout(() => {
      setStep(1);
    }, 3000);
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col items-center">
        <div
          className="text-3xl mt-[20%]"
          style={{
            lineHeight: 1.8,
          }}
        >
          欢迎来到西拉拉国,你现在陷入沉睡,进入梦中......
        </div>
      </div>
    );
  }

  const handleTakePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }
    const data = await takePhoto();
    setPhoto(data);
    stopCamera();
    setTimeout(() => {
      navigate("/problem", {
        state: {
          photo,
        },
      });
    }, 1500);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <div>
        {!photo ? (
          <div
            className={`w-[200px] h-[320px] ${styles.preview}`}
            ref={cameraRef}
          />
        ) : (
          <div className={`w-[200px] h-[320px] ${styles.preview}`}>
            <img src={photo} />
          </div>
        )}
      </div>
      <div className="py-[2rem]">
        <button className="text-3xl w-[200px]" onClick={handleTakePhoto}>
          拍 照
        </button>
      </div>
      <span className="text-3xl">请点击按钮获取准考证照片</span>
    </div>
  );
};

export default CameraPage;
