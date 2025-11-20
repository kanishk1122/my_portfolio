import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const DraggableComponent = ({
  id,
  children,
  isOpened,
  onDragStart,
  onDragEnd,
  dragControls,
  onClick,
  className,
  ...props
}) => {
  const componentRef = useRef(null);

  // Track other components for collision detection
  useEffect(() => {
    const handleCollisions = () => {
      // This could be used to implement more advanced collision detection
      // and component reorganization logic
    };

    window.addEventListener("mousemove", handleCollisions);
    return () => window.removeEventListener("mousemove", handleCollisions);
  }, []);

  return (
    <motion.div
      ref={componentRef}
      id={id}
      drag={!isOpened}
      dragControls={dragControls}
      onDragStart={() => onDragStart(id)}
      onDragEnd={(event, info) => onDragEnd(id, info)}
      onClick={onClick}
      dragMomentum={false}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default DraggableComponent;
