import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Browser from "./apps/Browser";
import Portfolio from "./apps/Portfolio";
import Settings from "./apps/Settings";
import FileManager from "./apps/FileManager";
import DesktopIcon from "./os/DesktopIcon";
import WindowManager from "./os/WindowManager";

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [time, setTime] = useState(new Date());
  const [wallpaper, setWallpaper] = useState("mountain");
  const desktopRef = useRef(null);

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Wallpaper options
  const wallpapers = {
    mountain: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
    ocean: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
    forest: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
    desert: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
    space: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
  };

  // Desktop applications with proper spacing
  const apps = [
    {
      id: "browser",
      name: "Browser",
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400">
          <path
            fill="currentColor"
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"
          />
        </svg>
      ),
      component: Browser,
      position: { x: 50, y: 50 },
    },
    {
      id: "portfolio",
      name: "My Portfolio",
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full text-purple-400">
          <path
            fill="currentColor"
            d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21A7,7 0 0,1 14,26H10A7,7 0 0,1 3,19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M10,9A5,5 0 0,0 5,14V17H7V14A3,3 0 0,1 10,11H14A3,3 0 0,1 17,14V17H19V14A5,5 0 0,0 14,9H10Z"
          />
        </svg>
      ),
      component: Portfolio,
      position: { x: 50, y: 170 },
    },
    {
      id: "settings",
      name: "Settings",
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full text-gray-400">
          <path
            fill="currentColor"
            d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
          />
        </svg>
      ),
      component: Settings,
      position: { x: 50, y: 290 },
    },
    {
      id: "files",
      name: "File Manager",
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400">
          <path
            fill="currentColor"
            d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"
          />
        </svg>
      ),
      component: FileManager,
      position: { x: 50, y: 410 },
    },
  ];

  const openApp = (app) => {
    if (!app.component) {
      console.warn(`No component defined for app: ${app.name}`);
      return;
    }

    const existingWindow = openWindows.find((window) => window.id === app.id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        restoreWindow(existingWindow.id);
      } else {
        setActiveWindow(existingWindow.id);
      }
      return;
    }

    const newWindow = {
      id: app.id,
      title: app.name,
      component: app.component,
      isMinimized: false,
      isMaximized: false,
      position: {
        x: Math.min(100 + openWindows.length * 50, window.innerWidth - 800),
        y: Math.min(100 + openWindows.length * 50, window.innerHeight - 600),
      },
      size: { width: 800, height: 600 },
      zIndex: openWindows.length + 1,
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (windowId) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== windowId));
    if (activeWindow === windowId) {
      const remaining = openWindows.filter((window) => window.id !== windowId);
      setActiveWindow(
        remaining.length > 0 ? remaining[remaining.length - 1].id : null
      );
    }
  };

  const minimizeWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId ? { ...window, isMinimized: true } : window
      )
    );
  };

  const maximizeWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? {
              ...window,
              isMaximized: !window.isMaximized,
              position: window.isMaximized
                ? window.originalPosition || { x: 100, y: 100 }
                : { x: 0, y: 0 },
              size: window.isMaximized
                ? window.originalSize || { width: 800, height: 600 }
                : { width: window.innerWidth, height: window.innerHeight },
              originalPosition: window.isMaximized
                ? undefined
                : window.position,
              originalSize: window.isMaximized ? undefined : window.size,
            }
          : window
      )
    );
  };

  const restoreWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId ? { ...window, isMinimized: false } : window
      )
    );
    setActiveWindow(windowId);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div
      ref={desktopRef}
      className="w-screen h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: wallpapers[wallpaper],
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            onSingleClick={() => openApp(app)}
            position={app.position}
          />
        ))}
      </div>

      {/* Window Manager */}
      <WindowManager
        windows={openWindows}
        activeWindow={activeWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onActivate={setActiveWindow}
        setWindows={setOpenWindows}
        wallpaper={wallpaper}
        setWallpaper={setWallpaper}
        wallpapers={wallpapers}
      />

      {/* Enhanced Status Bar in top-right corner */}
      <div className="fixed top-4 right-4 z-[9999] bg-black/70 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/20 shadow-lg">
        <div className="flex items-center space-x-4 text-white text-sm">
          <div className="text-right">
            <div className="font-medium text-white drop-shadow-md">
              {formatTime(time)}
            </div>
            <div className="text-xs text-gray-200 drop-shadow-md">
              {formatDate(time)}
            </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="fixed bottom-4 left-4 z-[9999] bg-black/70 backdrop-blur-xl rounded-xl px-6 py-3 border border-white/20 shadow-lg">
        <div className="text-white">
          <div className="font-semibold text-lg text-white drop-shadow-md">
            Welcome to Kanishk's Desktop
          </div>
          <div className="text-sm text-gray-200 drop-shadow-md">
            Double-click icons to open applications
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
