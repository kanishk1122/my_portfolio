import React from "react";
import { motion } from "framer-motion";
import WindowTitleBar from "./WindowTitleBar";

const WindowManager = ({
  windows,
  activeWindow,
  onClose,
  onMinimize,
  onMaximize,
  onActivate,
  setWindows,
  wallpaper,
  setWallpaper,
  wallpapers,
}) => {
  const handleDrag = (windowId, newPosition) => {
    setWindows((prev) =>
      prev.map((window) => {
        if (window.id === windowId) {
          // Constrain window position to screen bounds
          const constrainedX = Math.max(
            0,
            Math.min(newPosition.x, window.innerWidth - window.size.width)
          );
          const constrainedY = Math.max(
            0,
            Math.min(newPosition.y, window.innerHeight - window.size.height)
          );

          return {
            ...window,
            position: {
              x: constrainedX,
              y: constrainedY,
            },
          };
        }
        return window;
      })
    );
  };

  return (
    <>
      {windows
        .filter((window) => !window.isMinimized)
        .map((window) => {
          const WindowComponent = window.component;

          return (
            <motion.div
              key={window.id}
              className={`absolute bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 ${
                activeWindow === window.id ? "z-50" : "z-40"
              }`}
              style={{
                left: window.isMaximized ? 0 : Math.max(0, window.position.x),
                top: window.isMaximized ? 0 : Math.max(0, window.position.y),
                width: window.isMaximized
                  ? "100vw"
                  : Math.min(window.size.width, window.innerWidth),
                height: window.isMaximized
                  ? "100vh"
                  : Math.min(window.size.height, window.innerHeight),
              }}
              drag={!window.isMaximized}
              dragHandleClass="window-title-bar"
              dragConstraints={{
                left: 0,
                top: 0,
                right: window.innerWidth - window.size.width,
                bottom: window.innerHeight - window.size.height,
              }}
              onDrag={(e, info) => {
                if (!window.isMaximized) {
                  handleDrag(window.id, {
                    x: window.position.x + info.delta.x,
                    y: window.position.y + info.delta.y,
                  });
                }
              }}
              onClick={() => onActivate(window.id)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <WindowTitleBar
                title={window.title}
                isMaximized={window.isMaximized}
                onClose={() => onClose(window.id)}
                onMinimize={() => onMinimize(window.id)}
                onMaximize={() => onMaximize(window.id)}
              />

              <div
                className="w-full h-full bg-white overflow-hidden"
                style={{ height: "calc(100% - 32px)" }}
              >
                {WindowComponent && (
                  <WindowComponent
                    wallpaper={wallpaper}
                    setWallpaper={setWallpaper}
                    wallpapers={wallpapers}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

export default WindowManager;
