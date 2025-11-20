/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom"; // 1. Import this
import mypic from "../public/images/Untitled-transformed.jpeg"; 
import video from "/videos/workportfilio.mp4"; 
import Animation from "./Animationtest";
import housewithfishvideo from "../assets/original.mp4"; 
import Clock from "./Clock";
import Projects from "./Projects";
import Contact from "./Contact";

const Phoneview = () => {
  const constraintsRef = useRef(null);
  const [currentTime, setCurrentTime] = useState("");
  const [countdown, setCountdown] = useState("");
  
  // 2. Initialize Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  // 3. Define Mappings (ID <-> URL Name)
  const VIEW_MAPPING = {
    about: "one",
    clock: "two",
    projects: "three",
    contact: "five"
  };

  // Reverse mapping helper
  const getQueryFromId = (id) => Object.keys(VIEW_MAPPING).find(key => VIEW_MAPPING[key] === id);

  // 4. Derive activeCard directly from URL (No useState needed for this anymore)
  const currentView = searchParams.get("view");
  const activeCard = VIEW_MAPPING[currentView] || null;

  const [minisizebuttonhovereffecttext, setminisizebuttonhovereffecttext] =
    useState(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6 md:w-8 md:h-8"
        fill="black"
      >
        <path d="M5 11V13H19V11H5Z"></path>
      </svg>
    );

  // 5. Update Handler to set URL instead of state
  const handleCardClick = (cardId) => {
    // If the clicked card is already open, close it (remove query)
    if (activeCard === cardId) {
        setSearchParams({}); 
    } else {
        // Find the friendly name (e.g., "one" -> "about") and set it
        const viewName = getQueryFromId(cardId);
        if (viewName) {
            setSearchParams({ view: viewName });
        }
    }
  };

  // 6. Close handler removes the query param
  const closeCard = (e) => {
    e.stopPropagation();
    setSearchParams({});
  };

  const myskills = [
    "Express.js", "React", "Next.js", "GSAP", "mySQL", "PostgreSQL",
    "Javascript", "Java", "C++", "DSA", "Python", "tailwind", "typescript", "mongodb",
  ];

  const skillsComponents = myskills.map((item, index) => (
    <div
      key={index}
      className="bg-zinc-600/50 font-['Aquire'] p-2 backdrop-blur-sm flex justify-center items-center rounded-xl 
      text-xs md:text-lg font-semibold text-center w-20 h-20 md:w-32 md:h-32 hover:bg-zinc-900/50 duration-300"
    >
      {item}
    </div>
  ));

  useEffect(() => {
    function showTime() {
      const now = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      setCurrentTime(now.toLocaleDateString(undefined, options));
    }

    function showCountdown() {
      const targetDate = new Date("2023-08-27");
      const now = new Date();
      const timeDifference = now - targetDate;
      const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setCountdown(`${daysRemaining}`);
    }

    function update() {
      showTime();
      showCountdown();
    }

    update();
    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function ShowTime() {
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
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setCurrentDateTime({ day, date, time });
      };
      updateCurrentDateTime();
      const intervalId = setInterval(updateCurrentDateTime, 1000);
      return () => clearInterval(intervalId);
    }, []);

    return (
      <div id="currentDateTime" className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl md:text-6xl font-bold text-zinc-300">{currentDateTime.day}</div>
        <div className="text-3xl md:text-5xl font-bold text-zinc-400">{currentDateTime.time}</div>
      </div>
    );
  }

  const getmouseneterofminizebutton = () => {
    setminisizebuttonhovereffecttext("home");
  };
  
  const getmousexitrofminizebutton = () => {
    setminisizebuttonhovereffecttext(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6 md:w-8 md:h-8"
        fill="black"
      >
        <path d="M5 11V13H19V11H5Z"></path>
      </svg>
    );
  };

  // --- RENDER ---

  return (
    <div ref={constraintsRef} className="w-full min-h-screen flex justify-center items-center bg-black p-2 md:p-8">
      
      {/* Main Container */}
      <div className={`
        transition-all duration-500 ease-in-out
        bg-zinc-900 rounded-3xl p-2 md:p-4 relative
        ${activeCard ? "w-full max-w-5xl h-auto" : "w-full max-w-sm md:max-w-4xl h-auto"}
        ${activeCard ? "flex flex-col" : "grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"}
      `}>

        {/* --- CARD 1: PROFILE / ABOUT --- */}
        <div
          onClick={() => handleCardClick("one")}
          className={`
            bg-zinc-800/50 backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer transition-all duration-500
            ${activeCard === "one" ? "w-full order-1" : activeCard ? "hidden" : "col-span-2 row-span-2 h-64 md:h-80"}
          `}
        >
          {activeCard === "one" ? (
            // EXPANDED CONTENT ONE
            <div className="relative w-full min-h-screen bg-zinc-800 p-4 md:p-10 flex flex-col items-center">
              <button
                onMouseEnter={getmouseneterofminizebutton}
                onMouseLeave={getmousexitrofminizebutton}
                onClick={closeCard}
                className="fixed top-4 left-4 z-50 bg-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg"
              >
                {minisizebuttonhovereffecttext}
              </button>

              <div className="mt-12 flex flex-col items-center text-center max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-4xl md:text-6xl font-bold font-['Aquire'] text-white">Hi</p>
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
                    alt="👋"
                    className="w-10 h-10 md:w-16 md:h-16"
                  />
                </div>
                
                <p className="text-lg md:text-2xl text-zinc-300 font-['Aquire'] leading-relaxed px-2">
                  My name is <span className="font-bold text-white">Kanishk Soni</span>. I live in Jaipur, 18 years old. 
                  Coding for <span className="font-semibold text-blue-400">{countdown} days</span>.
                </p>

                {/* Animation Component Placeholder */}
                <div className="w-full h-[35vh] md:h-48 my-6 bg-zinc-900/50 rounded-xl overflow-hidden">
                   <Animation />
                </div>

                {/* Skills Video Section */}
                <div className="relative w-full mt-4 bg-[#141414] rounded-2xl p-4 flex flex-col items-center">
                    <video muted autoPlay loop src={housewithfishvideo} className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full mb-4 border-2 border-zinc-700"></video>
                    <h1 className="text-3xl md:text-5xl font-['monument'] text-white mb-6 text-center" style={{ textShadow: "0px 0px 10px rgba(255,255,255,0.3)" }}>
                        MY TECH
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {skillsComponents}
                    </div>
                </div>
              </div>
            </div>
          ) : (
            // COLLAPSED CARD ONE
            <div className="w-full h-full flex flex-col justify-center items-center p-4 hover:bg-zinc-800 transition-colors">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-zinc-700 mb-4 shadow-xl">
                <img src={mypic} className="w-full h-full object-cover" alt="Profile" />
              </div>
              <h1 className="font-bold font-['monument'] text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
                About Me
              </h1>
            </div>
          )}
        </div>

        {/* --- CARD 2: CLOCK --- */}
        <div
          onClick={() => handleCardClick("two")}
          className={`
            bg-zinc-800/50 backdrop-blur-md rounded-2xl cursor-pointer transition-all duration-500 flex justify-center items-center
            ${activeCard === "two" ? "w-full min-h-[50vh] order-1" : activeCard ? "hidden" : "col-span-1 md:col-span-2 h-32 md:h-80"}
          `}
        >
          {activeCard === "two" ? (
            <div className="relative w-full h-full p-4 flex flex-col items-center justify-center">
               <button onClick={closeCard} className="absolute top-2 left-2 bg-white w-10 h-10 rounded-full flex items-center justify-center z-10">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5 11V13H19V11H5Z"></path></svg>
               </button>
               <Clock />
            </div>
          ) : (
            <ShowTime />
          )}
        </div>

        {/* --- CARD 3: PROJECTS --- */}
        <div
          onClick={() => handleCardClick("three")}
          className={`
            bg-zinc-800/50 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-500
            ${activeCard === "three" ? "w-full min-h-screen order-1" : activeCard ? "hidden" : "col-span-1 md:col-span-2 h-32 md:h-80"}
          `}
        >
          {activeCard === "three" ? (
            <div className="w-full h-full pt-14 relative">
               <button onClick={closeCard} className="absolute top-4 left-4 bg-white w-10 h-10 rounded-full flex items-center justify-center z-50">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5 11V13H19V11H5Z"></path></svg>
               </button>
               <Projects />
            </div>
          ) : (
            <>
              <video src={video} className="w-full h-full object-cover opacity-60" autoPlay muted loop></video>
              <div className="absolute inset-0 flex justify-center items-center bg-black/30">
                <span className="text-lg md:text-4xl font-extrabold text-white tracking-wider">PROJECTS</span>
              </div>
            </>
          )}
        </div>

        {/* --- CARD 4: LINKS --- */}
        <div
          className={`
             bg-zinc-900/80 backdrop-blur-md rounded-2xl p-3 flex flex-wrap gap-2 justify-center items-center transition-all
             ${activeCard ? "hidden" : "col-span-2 md:col-span-2 h-auto min-h-[120px]"}
          `}
        >
            <div className="w-full text-center mb-2">
                <span className="text-2xl font-bold text-white">LINKS</span>
            </div>
            
            <div className="flex justify-center gap-4 w-full">
                {/* LinkedIn */}
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/kanishk-soni-8047a2272/" className="w-10 h-10 md:w-14 md:h-14 text-white hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path>
                    </svg>
                </a>
                {/* Instagram */}
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/kanishk____soni/" className="w-10 h-10 md:w-14 md:h-14 text-white hover:text-pink-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                         <path d="M13.0281 2.00073C14.1535 2.00259 14.7238 2.00855 15.2166 2.02322L15.4107 2.02956C15.6349 2.03753 15.8561 2.04753 16.1228 2.06003C17.1869 2.1092 17.9128 2.27753 18.5503 2.52503C19.2094 2.7792 19.7661 3.12253 20.3219 3.67837C20.8769 4.2342 21.2203 4.79253 21.4753 5.45003C21.7219 6.0867 21.8903 6.81337 21.9403 7.87753C21.9522 8.1442 21.9618 8.3654 21.9697 8.58964L21.976 8.78373C21.9906 9.27647 21.9973 9.84686 21.9994 10.9723L22.0002 11.7179C22.0003 11.809 22.0003 11.903 22.0003 12L22.0002 12.2821L21.9996 13.0278C21.9977 14.1532 21.9918 14.7236 21.9771 15.2163L21.9707 15.4104C21.9628 15.6347 21.9528 15.8559 21.9403 16.1225C21.8911 17.1867 21.7219 17.9125 21.4753 18.55C21.2211 19.2092 20.8769 19.7659 20.3219 20.3217C19.7661 20.8767 19.2069 21.22 18.5503 21.475C17.9128 21.7217 17.1869 21.89 16.1228 21.94C15.8561 21.9519 15.6349 21.9616 15.4107 21.9694L15.2166 21.9757C14.7238 21.9904 14.1535 21.997 13.0281 21.9992L12.2824 22C12.1913 22 12.0973 22 12.0003 22L11.7182 22L10.9725 21.9993C9.8471 21.9975 9.27672 21.9915 8.78397 21.9768L8.58989 21.9705C8.36564 21.9625 8.14444 21.9525 7.87778 21.94C6.81361 21.8909 6.08861 21.7217 5.45028 21.475C4.79194 21.2209 4.23444 20.8767 3.67861 20.3217C3.12278 19.7659 2.78028 19.2067 2.52528 18.55C2.27778 17.9125 2.11028 17.1867 2.06028 16.1225C2.0484 15.8559 2.03871 15.6347 2.03086 15.4104L2.02457 15.2163C2.00994 14.7236 2.00327 14.1532 2.00111 13.0278L2.00098 10.9723C2.00284 9.84686 2.00879 9.27647 2.02346 8.78373L2.02981 8.58964C2.03778 8.3654 2.04778 8.1442 2.06028 7.87773C2.10944 6.81253 2.27778 6.08753 2.52528 5.45003C2.77944 4.7917 3.12278 4.2342 3.67861 3.67837C4.23444 3.12253 4.79278 2.78003 5.45028 2.52503C6.08778 2.27753 6.81278 2.11003 7.87778 2.06003C8.14444 2.04816 8.36564 2.03847 8.58989 2.03062L8.78397 2.02433C9.27672 2.00969 9.8471 2.00302 10.9725 2.00086L13.0281 2.00073ZM12.0003 7.00003C9.23738 7.00003 7.00028 9.23956 7.00028 12C7.00028 14.7629 9.23981 17 12.0003 17C14.7632 17 17.0003 14.7605 17.0003 12C17.0003 9.23713 14.7607 7.00003 12.0003 7.00003ZM12.0003 9.00003C13.6572 9.00003 15.0003 10.3427 15.0003 12C15.0003 13.6569 13.6576 15 12.0003 15C10.3434 15 9.00028 13.6574 9.00028 12C9.00028 10.3431 10.3429 9.00003 12.0003 9.00003ZM17.2503 5.50003C16.561 5.50003 16.0003 6.05994 16.0003 6.74918C16.0003 7.43843 16.5602 7.9992 17.2503 7.9992C17.9395 7.9992 18.5003 7.4393 18.5003 6.74918C18.5003 6.05994 17.9386 5.49917 17.2503 5.50003Z"></path>
                    </svg>
                </a>
                {/* Github */}
                 <a target="_blank" rel="noreferrer" href="https://github.com/kanishk1122" className="w-10 h-10 md:w-14 md:h-14 text-white hover:text-zinc-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                         <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                    </svg>
                </a>
            </div>
        </div>

        {/* --- CARD 5: CONTACT --- */}
        <div
          onClick={() => handleCardClick("five")}
          className={`
            bg-zinc-800/50 backdrop-blur-md rounded-2xl cursor-pointer transition-all duration-500
            ${activeCard === "five" ? "w-full max-h-[90vh] order-1" : activeCard ? "hidden" : "col-span-2 md:col-span-2 h-32 md:h-80 flex justify-center items-center"}
          `}
        >
          {activeCard === "five" ? (
            <div className="w-full h-full p-4 relative pt-14">
               <button onClick={closeCard} className="absolute top-4 left-4 bg-white w-10 h-10 rounded-full flex items-center justify-center z-10">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5 11V13H19V11H5Z"></path></svg>
               </button>
               <Contact />
            </div>
          ) : (
            <h2 className="text-2xl md:text-5xl font-bold text-white">Contact Me</h2>
          )}
        </div>

      </div>
    </div>
  );
};

export default Phoneview;