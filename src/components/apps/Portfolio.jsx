import React from "react";
import Computerview from "../Computerview";

const Portfolio = () => {
  return (
    <div className="h-full w-full bg-zinc-900 text-white overflow-auto">
      <div className="p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white">My Portfolio</h1>
          <p className="text-gray-300">Welcome to my portfolio showcase</p>
        </div>
        <Computerview />
      </div>
    </div>
  );
};

export default Portfolio;
