import React from "react";
import Computerview from "../Computerview";

const Portfolio = () => {
  return (
    <div className="h-full w-full bg-zinc-900 text-white overflow-auto flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <Computerview />
      </div>
    </div>
  );
};

export default Portfolio;
