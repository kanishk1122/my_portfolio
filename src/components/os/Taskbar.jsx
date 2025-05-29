import React from "react";
import { motion } from "framer-motion";

const Taskbar = ({
  openWindows,
  activeWindow,
  time,
  onWindowClick,
  onAppLaunch,
  apps,
}) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const handleStartClick = () => {
    // Start menu functionality can be added here
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/50 flex items-center px-2 z-[9999]">
      {/* Start Button */}
      <motion.button
        className="h-8 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium mr-2"
        onClick={handleStartClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start
      </motion.button>

      {/* Quick Launch */}
      <div className="flex items-center space-x-1 mr-2">
        {apps.slice(0, 2).map((app) => (
          <motion.button
            key={app.id}
            className="w-8 h-8 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded p-1"
            onClick={() => onAppLaunch(app)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={app.name}
          >
            {app.icon}
          </motion.button>
        ))}
      </div>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center space-x-1">
        {openWindows.map((window) => (
          <motion.button
            key={window.id}
            className={`h-8 px-3 rounded text-sm truncate max-w-40 ${
              activeWindow === window.id
                ? "bg-gray-700 text-white"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            } ${window.isMinimized ? "opacity-60" : ""}`}
            onClick={() => onWindowClick(window.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {window.title}
          </motion.button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-3 text-gray-300">
        <div className="text-xs text-center">
          <div>{formatTime(time)}</div>
          <div className="text-[10px] opacity-80">{formatDate(time)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
