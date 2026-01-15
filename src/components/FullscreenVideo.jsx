import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const FullscreenVideo = ({ src, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enter real fullscreen
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }

    const handleExit = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };

    document.addEventListener("fullscreenchange", handleExit);
    return () =>
      document.removeEventListener("fullscreenchange", handleExit);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-black z-[999999] flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay
        playsInline
        className="w-full h-full object-contain bg-black"
      />

      <button
        onClick={() => {
          document.exitFullscreen?.();
          onClose();
        }}
        className="absolute top-6 right-6 text-white bg-black/60 px-4 py-2 rounded"
      >
        ✕
      </button>
    </div>,
    document.body
  );
};

export default FullscreenVideo;
