import { useEffect, useRef, useState } from "react";

interface UseCameraOptions {
  onFrame?: (video: HTMLVideoElement) => void;
  frameInterval?: number;
}

export const useSlamCamera = ({ onFrame, frameInterval = 100 }: UseCameraOptions = {}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [element, setElement] = useState<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = document.createElement("video");
    video.setAttribute("playsinline", "true"); // 👈 required for iOS
    video.style.display = "none";
    // video.style.position = "absolute";
    // video.style.top = "0";
    // video.style.left = "0";
    document.body.appendChild(video);
    videoRef.current = video;

    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      video.srcObject = stream;
      setElement(video);
      video.onloadedmetadata = () => video.play();
    };

    setupCamera();

    return () => {
      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
      document.body.removeChild(video); // 👈 clean up from DOM on unmount
      videoRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!onFrame) return;

    const interval = setInterval(() => {
      if (videoRef.current) onFrame(videoRef.current);
    }, frameInterval);

    return () => clearInterval(interval);
  }, [onFrame, frameInterval]);

  return { videoRef,video: element };
};