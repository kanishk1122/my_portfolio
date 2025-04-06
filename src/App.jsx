import React from "react";
import Routing from "./utils/Routing";
import ClickSpark from "./utils/Clickeffect.jsx";

const App = () => {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="main w-full h-fit bg-black text-white">
        <Routing />
      </div>
    </ClickSpark>
  );
};

export default App;
