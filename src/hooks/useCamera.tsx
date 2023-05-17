import { useRef, useCallback } from "react";
export const useCamera = () => {
  const cameraRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(() => {
    if (cameraRef.current) {
      const video = document.createElement("video");
      video.setAttribute("autoplay", "true");
      video.setAttribute("muted", "true");
      video.setAttribute("playsinline", "true");
      video.setAttribute("width", "100%");
      video.setAttribute("height", "100%");
      cameraRef.current.appendChild(video);
      videoRef.current = video;
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", "100%");
      canvas.setAttribute("height", "100%");
      canvasRef.current = canvas;
    }
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
        },
      })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (cameraRef.current) {
      cameraRef.current!.removeChild(videoRef.current as Node);
      videoRef.current = null;
    }
  }, []);

  const takePhoto = useCallback(() => {
    return new Promise<Blob>((resolve, reject) => {
      if (canvasRef.current && videoRef.current) {
        const context = canvasRef.current.getContext("2d");
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context?.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
        canvasRef.current.toBlob(
          (blob) => {
            resolve(blob as Blob);
          },
          "image/jpeg",
          1
        );
        return;
      }
      reject("error");
    });
  }, []);

  return [cameraRef, startCamera, stopCamera, takePhoto] as const;
};
