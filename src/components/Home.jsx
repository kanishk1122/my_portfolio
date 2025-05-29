import React, { useEffect, useState } from "react";
import Desktop from "./Desktop";
import Phoneview from "./Phoneview";

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {isSmallScreen ? <Phoneview /> : <Desktop />}
    </div>
  );
};

export default Home;
