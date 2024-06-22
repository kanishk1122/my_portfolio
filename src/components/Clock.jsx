import React, { useState, useEffect } from 'react';
import TextTransition, { presets } from 'react-text-transition';


const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [pausestopwatch, setpausestopwatch] = useState(true)

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time ,pausestopwatch]);

  const startStopwatch = () => {
    setIsActive(true);
    setpausestopwatch(()=>false);

  };

  const stopStopwatch = () => {
    setIsActive(false);
    setpausestopwatch(()=>false);
  };

  const resetStopwatch = () => {
    setIsActive(false);
    setTime(0);
    setpausestopwatch(()=>true);
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  formatTime(time).AddE


  return (
    <div className='w-full h-full min-h-full gap-[20vh]  flex max-md:h-[50vh] justify-center items-center flex-col '>
      <div className='text-[10vw] w-fit text-transparent bg-gradient-to-t font-semibold from-[rgba(187,187,187,0.88)] to-[rgb(255,255,255)] bg-clip-text '>
        <h1>{formatTime(time)}</h1>
      
      </div>
      <div className='flex justify-center items-start *:max-md:text-xl gap-3 *:bg-zinc-800 *:px-2 *:py-1 *:rounded-full *:text-3xl *:text-center'>
        <button onClick={startStopwatch} disabled={isActive}>{pausestopwatch?'start':'resume'}</button>
        <button  onClick={stopStopwatch} disabled={!isActive}>stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
