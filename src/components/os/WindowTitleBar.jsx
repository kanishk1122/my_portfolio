import React from "react";
import { motion } from "framer-motion";

const WindowTitleBar = ({
  title,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <div className="window-title-bar h-8 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-between px-3 cursor-move border-b border-gray-600">
      <span className="text-white text-sm font-medium truncate">{title}</span>

      <div className="flex items-center space-x-2">
        <motion.button
          className="w-3 h-3 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center border border-yellow-600"
          onClick={onMinimize}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="Minimize"
        >
          <span className="text-yellow-900 text-xs font-bold leading-none">
            −
          </span>
        </motion.button>

        <motion.button
          className="w-3 h-3 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center border border-green-600"
          onClick={onMaximize}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          <span className="text-green-900 text-xs font-bold leading-none">
            {isMaximized ? "◱" : "□"}
          </span>
        </motion.button>

        <motion.button
          className="w-3 h-3 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center border border-red-600"
          onClick={onClose}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="Close"
        >
          <span className="text-red-900 text-xs font-bold leading-none">×</span>
        </motion.button>
      </div>
    </div>
  );
};

export default WindowTitleBar;
