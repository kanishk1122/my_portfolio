import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Phoneview from "./Phoneview";
import Computerview from "./Computerview";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // 1. FIX: Use h-screen and overflow-hidden to prevent browser scrolling
    // 2. FIX: Use w-screen to ensure full width without accidental horizontal scroll
    <div className="w-screen h-fit bg-black text-white overflow-hidden cursor-none relative">
      


      {/* Main Content Layer */}
      {/* 3. FIX: Removed mt-[10vh] and mb-10. The OS needs the full container. */}
      <div className="w-full h-fit flex justify-center items-center">
        {isSmallScreen ? <Phoneview /> : <Computerview />}
      </div>
    </div>
  );
};

export default Home;