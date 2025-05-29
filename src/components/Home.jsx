import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import First3dmodel from "../3D-assets/First3dmodel";
import Phoneview from "./Phoneview";
import Computerview from "./Computerview";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Initial check on component mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div className="w-[99vw] md:w-[98.7vw] bg-black text-white h-fit">
      <div className="bg-black w-full overflow-x-hidden text-white h-fit">
        <span className="navbar-container fixed z-50 flex left-1/2 -translate-x-1/2">
          <Navbar />
        </span>
        <span className="model-3d-container fixed top-0 right-0 z-[9998] max-sm:hidden">
          <First3dmodel />
        </span>
      </div>
      <div
        className={`flex w-full h-fit min-h-screen flex-col justify-center items-center mb-10 ${
          isFullscreen && !isSmallScreen ? "mt-0" : "mt-[10vh] max-md:mt-[22vh]"
        }`}
      >
        {isSmallScreen ? <Phoneview /> : <Computerview />}
      </div>
    </div>
  );
};

export default Home;
