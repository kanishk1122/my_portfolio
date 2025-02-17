import  { useState, useEffect, useRef } from "react";
// import mymemoji from "../public/images/1718656650065j77dnhl1-removebg-preview.png";
import { Link } from "react-router-dom";
const Navbar = ({clicked ,updateClickedfive ,setclicked}) => {
  const [showmwnu, setshowmwnu] = useState(false);
  const [showsocial,setshowsocial ] = useState(false)
  const timeoutRef = useRef(null);




  const menudisplayfunction = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setshowmwnu(true);
  };


  

  const socialhandle =[
    {
      platform : "instagram",
      id: 'https://www.instagram.com/kanishk____soni/',
      image : 'https://i.imgur.com/CkyG9A4.png'
    },
    {
      platform : "github",
      id: 'https://github.com/kanishk1122',
      image : 'https://i.imgur.com/WhiHneB.png'
    },
    {
      platform : "Linkedin",
      id: 'https://www.linkedin.com/in/kanishk-soni-8047a2272/',
      image : 'https://i.imgur.com/onpE3Dq.png'
    }
  ]

  const resetwebpage=()=>{
    const resetClicked = clicked.map(item => {
      const key = Object.keys(item)[0];
      return { [key]: false };
    });
    setclicked(resetClicked);

      
  }

  const startHideMenuTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setshowmwnu(false);
    }, 3000); // 3 seconds delay
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const controlshowsocailpanel =()=>{
    setshowsocial(()=>!showsocial)
  }


  return (
    <div className="w-full h-[10vh] pt-12 relative flex gap-6 justify-center items-center">
      {/* <div className="w-[50px] relative h-[50px] flex justify-center items-center rounded-full drop-shadow-xl bg-zinc-800">
        <img src={mymemoji} className="w-[75%] h-[75%] object-cover" alt="" />
      </div> */}
      <div className="px-6 py-3 gap-7 drop-shadow-xl bg-zinc-800/30 hover:bg-zinc-800/50 backdrop-blur-xl w-fit h-fit rounded-full flex justify-center items-center transition-all duration-300">
        <Link 
          onClick={()=>resetwebpage()}
          to='/'
          className="relative group"
        >
          <h1 className="text-xl font-semibold transition-all duration-300 hover:scale-110">Home</h1>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
        </Link>
        <img src='https://lh3.google.com/u/0/d/1WakUNA7heGXBTcVx7SBgMaG-ejyJWD4d=w740-h609-iv1' className="w-[10px] h-[10px]" />
        <div>
          <div
            onMouseEnter={menudisplayfunction}
            onMouseLeave={startHideMenuTimeout}
            onClick={startHideMenuTimeout}
            className="w-fit h-fit rounded-full cursor-pointer px-3 py-3 hover:bg-zinc-700/50 transition-all duration-300"
          >
            <svg
              fill="#ffffff"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 297 297"
              className="cursor-pointer transform transition-transform duration-300 hover:rotate-180"
            >
              <g>
                <g>
                  <g>
                    <path d="M280.214,39.211H16.786C7.531,39.211,0,46.742,0,55.997v24.335c0,9.256,7.531,16.787,16.786,16.787h263.428     c9.255,0,16.786-7.531,16.786-16.787V55.997C297,46.742,289.469,39.211,280.214,39.211z" />
                    <path d="M280.214,119.546H16.786C7.531,119.546,0,127.077,0,136.332v24.336c0,9.255,7.531,16.786,16.786,16.786h263.428     c9.255,0,16.786-7.531,16.786-16.786v-24.336C297,127.077,289.469,119.546,280.214,119.546z" />
                    <path d="M280.214,199.881H16.786C7.531,199.881,0,207.411,0,216.668v24.335c0,9.255,7.531,16.786,16.786,16.786h263.428     c9.255,0,16.786-7.531,16.786-16.786v-24.335C297,207.411,289.469,199.881,280.214,199.881z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>

          <div
            onMouseEnter={menudisplayfunction}
            onMouseLeave={()=>setshowmwnu(false)}
            
            className={`flex flex-col justify-center items-center bg-zinc-800/90 backdrop-blur-xl left-[5vw] top-[13vh] rounded-2xl absolute transition-all duration-500 ${
              showmwnu 
                ? "max-h-40 max-w-[150px] p-2 border-white/20 border-2 opacity-100 translate-y-0" 
                : "max-h-0 p-0 max-w-0 overflow-hidden opacity-0 -translate-y-4"
            }`}
          >
            <div className="w-full text-center">
              <button 
                onClick={updateClickedfive}
                className="w-full py-2 hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
              >
                <pre className="font-['Roboto']">Contact me</pre>
              </button>
            </div>
            <hr className="border-zinc-600 border w-full rounded-full my-2" />
            <div className="w-full text-center">
              <button
                onClick={()=>controlshowsocailpanel()}
                className="w-full py-2 hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
              >
                Social
              </button>
            </div>
          </div>
        </div>
      </div>
     
      <div
        onClick={()=>controlshowsocailpanel()}
        className={`fixed w-screen h-screen transition-all duration-500 ${
          showsocial 
            ? 'bg-[rgba(0,0,0,0.7)] backdrop-blur-[8px] opacity-100' 
            : 'opacity-0 pointer-events-none'
        } top-0 -left-[40vw] flex justify-center items-center`}
      >
        <div className={`w-1/2 max-w-[400px] px-3 py-2 rounded-2xl bg-zinc-900/90 h-[50vh] flex flex-col gap-4 justify-center items-center transition-all duration-500 transform ${
          showsocial ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          {socialhandle.map((item,index)=>(
            <a 
              target="_blank"  
              href={item.id} 
              key={index} 
              className="w-full hover:bg-zinc-800/50 rounded-xl p-4 flex justify-evenly items-center transition-all duration-300 transform hover:scale-105"
            >
              <img src={item.image} className="w-[50px] h-[50px] object-contain" alt="" />
              <p className="text-xl font-semibold">{item.platform}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
