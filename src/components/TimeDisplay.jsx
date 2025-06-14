import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateCurrentDateTime = () => {
      const now = new Date();
      const options = { weekday: "long" };
      const day = now.toLocaleDateString(undefined, options).slice(0, 3);
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString().split(":").join(".");
      setCurrentDateTime({ day, date, time });
    };

    updateCurrentDateTime();
    const intervalId = setInterval(updateCurrentDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="currentDateTime">
      <div className="text-6xl font-bold">{currentDateTime.day}</div>
      <div className="text-6xl font-bold">{currentDateTime.time} min</div>
    </div>
  );
};

export default TimeDisplay;
