import { useState, useEffect } from "react";
import { useCamera } from "@/hooks";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import wall from "@/assets/images/wall.png";
import { Typed, ZZZ, Button } from "@/components";

const CameraPage = () => {
  const [cameraRef, startCamera, stopCamera, takePhoto] = useCamera();
  const [photo, setPhoto] = useState("");
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if ([1].includes(step)) {
      return;
    }
    startCamera();
    return () => {
      stopCamera();
    };
  }, [step]);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }
    const data = await takePhoto();
    const url = URL.createObjectURL(data);
    setPhoto(url);
    stopCamera();
    setTimeout(() => {
      setStep(1);
    }, 1500);
    setTimeout(() => {
      navigate("/problem", {
        state: {
          photo: data,
        },
      });
    }, 5000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "Enter" || key === " ") {
        handleTakePhoto();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleTakePhoto]);

  if (step === 0) {
    return (
      <div
        className="w-[100vw] h-[100vh] flex flex-col items-center justify-center absolute top-0 left-0 bg-black z-10"
        key={step}
      >
        <div>
          {!photo ? (
            <div
              className={`w-[224px] h-[320px] ${styles.preview}`}
              ref={cameraRef}
            />
          ) : (
            <div className={`w-[224px] h-[320px] ${styles.preview}`}>
              <img src={photo} />
            </div>
          )}
        </div>
        <div className="py-[2rem]">
          <Button className="text-2xl w-[224px]" onClick={handleTakePhoto}>
            拍 照
          </Button>
        </div>
        <span className="text-3xl">请点击按钮获取参赛证照片</span>
      </div>
    );
  }

  const wallEle = (
    <img
      src={wall}
      className="absolute bottom-0 left-0 w-[100vw] z-10 pointer-events-none"
    />
  );

  return (
    <div
      className="w-[100vw] h-[100vh] flex flex-col items-center relative"
      key={step}
    >
      <div
        className="text-3xl mt-[25%]"
        style={{
          lineHeight: 1.8,
        }}
      >
        <Typed changeSize={(s) => s - 4}>
          欢迎来到西拉拉国,你将陷入沉睡,进入梦中......
        </Typed>
      </div>
      <ZZZ className="text-5xl absolute right-[28vh] top-[12vh]" />
      {wallEle}
    </div>
  );
};

export default CameraPage;
