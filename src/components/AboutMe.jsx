import React from 'react'
import TextTransition, { presets } from "react-text-transition";


const AboutMe = ({
    countdown,
    skillsComponents,
    housewithfishvideo,
    mypic,
    firstwindowhovervalue,
    clicked,
    minisizebuttonhovereffecttext,
    getmousexitrofminizebutton,
    updateClickedOne,
    getmouseenteronfirstwindow,
    getmouseexitfromfirstwindow}) => {
  return (
    clicked?.one ? (
        <div className="w-full max-md:min-h-[250vh] px-6 relative sm:px-24 min-h-[100vh] h-fit flex flex-col justify-start  items-center">
          <button
            onMouseEnter={getmouseneterofminizebutton}
            onMouseLeave={getmousexitrofminizebutton}
            onClick={() => {
              getmousexitrofminizebutton(), updateClickedOne();
            }}
            className="bg-white w-[50px]  hover:h-[60px] hover:w-[60px] text-black  font-semibold duration-200 h-[50px] absolute left-[0%] px-1 py-1 rounded-full flex justify-center items-center "
          >
            {minisizebuttonhovereffecttext}
          </button>
          <div className=" flex  w-full justify-center relative flex-col items-center ">
            <div className="flex justify-start min-h-[5vh] h-fit mt-4 items-center gap-4">
              <p className="text-5xl font-semibold font-['Aquire']">Hi</p>
              <picture>
                <source
                  className="w-fit"
                  srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp"
                  type="image/webp"
                />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
                  alt="👋"
                  width="32"
                  height="32"
                />
              </picture>
            </div>
            <div className="min-h-fit p-3 md:text-xl  lg:text-3xl 2xl:text-3xl w-full h-fit sm:w-[70%] font-['Aquire'] text-center">
              My name is <span className="font-bold ">Kanishk Soni</span>. I
              live in Jaipur and I am 18 years old. I have been coding for{" "}
              <span className="font-semibold">{countdown} days</span>. I have
              completed many projects, but some top projects are mentioned
              here. You can visit my GitHub to view all my projects. I hope
              you like my portfolio.
            </div>
          </div>
          <div className="flex mt-3 justify-center relative items-center w-[98vw] overflow-hidden    bg-transparent h-[30vh]  overflow-x-hidden">
            <Animation />
          </div>

          <div>
            <div className=" md:mt-[] w-[95.5w] mt-3 py-4  rounded-2xl flex relative justify- items-start bg-[#141414]  md:">
              <video
                muted
                autoPlay
                loop
                src={housewithfishvideo}
                className="w-[30vw] object-cover h-[25vw]"
              ></video>
              <div className="text-7xl w-full z-20 top-[17%] h-fit flex justify-center items-center absolute  ">
                <h1
                  style={{ textShadow: "0px 0px 3px #ffffff" }}
                  className="font-['monument']"
                >
                  MY know tech
                </h1>
              </div>
              <div className="flex flex-wrap gap-3 z-20 pt-[10%] bg-transparent w-[97vw] h-[75%] justify-center items-center px-[10vw]">
                {skillsComponents}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onMouseEnter={() => getmouseenteronfirstwindow()}
          onMouseLeave={() => getmouseexitfromfirstwindow()}
          className="duration-300 w-full h-full flex cursor-pointer justify-start p-3 gap-4 items-start bg-transparent backdrop-blur-xl rounded-xl"
        >
          <div className="rounded-2xl  overflow-hidden w-[25%] h-full">
            <img
              src={mypic}
              className="w-full duration-200 h-full object-cover"
              alt=""
            />
          </div>
          <div className="w-[60%] h-full flex justify-start items-center flex-col">
            <h1 className="font-bold font-['monument'] bg-clip-text  text-3xl text-transparent bg-gradient-to-l from-red-500 to-purple-700">
              I&apos;m Kanishk
            </h1>
            <p className="md:text-[13px] lg:text-[1vw] text-center">
              <TextTransition springConfig={presets.wobbly}>
                {firstwindowhovervalue}
              </TextTransition>
            </p>
          </div>
        </div>
      )
  )
}

export default AboutMe