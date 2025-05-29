import React, { useState } from "react";
import { motion } from "framer-motion";

const DesktopIcon = ({ app, onSingleClick, position }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Single click to open
    setIsSelected(true);
    onSingleClick();

    // Reset selection after a short delay
    setTimeout(() => {
      setIsSelected(false);
    }, 200);
  };

  return (
    <motion.div
      className={`absolute flex flex-col items-center cursor-pointer p-3 rounded-lg transition-all duration-200 ${
        isSelected
          ? "bg-white/30 backdrop-blur-md shadow-lg border border-white/20"
          : "hover:bg-white/20 backdrop-blur-sm"
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: "100px",
        height: "100px",
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-12 h-12 text-white mb-2 drop-shadow-2xl filter pointer-events-none">
        {app.icon}
      </div>
      <span className="text-xs text-white text-center max-w-20 truncate font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10 pointer-events-none">
        {app.name}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;
