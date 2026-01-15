import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Maximize2, 
  Minimize2, 
  User, 
  Briefcase, 
  Clock as ClockIcon, 
  Mail, 
  Globe, 
  Terminal,
  Cpu
} from "lucide-react";

// --- EXTERNAL COMPONENT IMPORTS ---
// Assuming these exist in your local project directory
const AboutUs = lazy(() => import("./AboutMe")); 
const Projects = lazy(() => import("./Projects"));
const Contact = lazy(() => import("./Contact"));
const Clock = lazy(() => import("./Clock"));
const LeetCodeStats = lazy(() => import("./LeetCodeStats"));

// --- DYNAMIC BACKGROUND COMPONENT ---
const BG = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let animationFrameId;
    let width, height, cx, cy;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const stars = [];
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2,
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cx = width / 2;
      cy = height / 2;
    };

    const handleMouseMove = (e) => {
      targetMouse.x = (e.clientX - cx) / (cx * 0.5);
      targetMouse.y = (e.clientY - cy) / (cy * 0.5);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const render = () => {
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.z -= 0.005;
        if (star.z <= 0) star.z = 2;
        
        const px = cx + (star.x - mouse.x * 50) / star.z;
        const py = cy + (star.y - mouse.y * 50) / star.z;

        if (px > 0 && px < width && py > 0 && py < height) {
          const size = (1 - star.z / 2) * 3;
          ctx.fillStyle = `rgba(255, 255, 255, ${1 - star.z / 2})`;
          ctx.fillRect(px, py, size, size);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />;
};

// --- IMPROVED WINDOW FRAME ---
const WindowFrame = ({ title, children, onClose, active }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        zIndex: active ? 100 : 10,
        width: isMaximized ? "100vw" : "clamp(360px, 85vw, 1000px)",
        height: isMaximized ? "calc(100vh - 80px)" : "650px",
        top: isMaximized ? 0 : "8%",
        left: isMaximized ? 0 : "auto",
        right: isMaximized ? 0 : "auto",
        margin: isMaximized ? 0 : "auto"
      }}
      exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
      className={`absolute inset-x-0 mx-auto flex flex-col bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden ${isMaximized ? "rounded-none" : "rounded-2xl"}`}
    >
      {/* Header / Title Bar */}
      <div 
        className="h-14 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between px-5 select-none cursor-grab active:cursor-grabbing"
        onDoubleClick={() => setIsMaximized(!isMaximized)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Cpu size={16} className="text-green-500" />
          </div>
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest">{title}</span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 transition-colors"
          >
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 relative custom-scrollbar">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full font-mono text-green-500 animate-pulse tracking-widest">
            LOADING_RESOURCES...
          </div>
        }>
          {children}
        </Suspense>
        {/* Subtle Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-20" />
      </div>
    </motion.div>
  );
};

// --- REUSABLE DESKTOP ICON ---
const DesktopIcon = ({ label, icon: Icon, onClick, active }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-3 w-24 md:w-28 group transition-all`}
  >
    <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 ${
      active 
        ? "bg-green-500/20 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
        : "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20"
    }`}>
      <Icon size={32} className={active ? "text-green-400" : "text-white/70 group-hover:text-white"} />
    </div>
    <span className={`text-[10px] font-mono uppercase tracking-widest py-1 px-3 rounded-full border transition-all ${
      active ? "bg-green-500 text-black border-green-500" : "bg-black/50 text-zinc-400 border-white/5"
    }`}>
      {label}
    </span>
  </motion.button>
);

const App = () => {
  // Switched to useState to avoid Router context errors in standard environments
  const [activeSection, setActiveSection] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const handleOpen = (section) => setActiveSection(section);
  const handleClose = () => setActiveSection(null);

  const apps = [
    { id: "about", label: "Identity", icon: User },
    { id: "projects", label: "Work", icon: Briefcase },
    { id: "clock", label: "Time", icon: ClockIcon },
    { id: "contact", label: "Uplink", icon: Mail },
    { id: "links", label: "Net", icon: Globe },
    { id: "leetcode", label: "LeetCode", icon: Terminal },
  ];

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col text-white font-sans selection:bg-green-500/40">
      <BG />

      {/* Main Desktop Grid */}
      <main className="flex-1 p-8 md:p-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-start content-start relative z-10">
        {apps.map((app) => (
          <DesktopIcon 
            key={app.id} 
            {...app} 
            active={activeSection === app.id}
            onClick={() => handleOpen(app.id)} 
          />
        ))}
      </main>

      {/* Active Window Layer */}
      <AnimatePresence>
        {activeSection === "about" && (
          <WindowFrame title="SYSTEM // USER_PROFILE" onClose={handleClose} active>
             {/* Using your imported AboutUs component */}
             <AboutUs />
          </WindowFrame>
        )}

        {activeSection === "projects" && (
          <WindowFrame title="REPOS // DEPLOYED_WORK" onClose={handleClose} active>
             {/* Using your imported Projects component */}
             <Projects />
          </WindowFrame>
        )}

        {activeSection === "clock" && (
          <WindowFrame title="CHRONOS // ENGINE" onClose={handleClose} active>
             <div className="h-full flex flex-col items-center justify-center gap-4">
                <Clock />
                <p className="font-mono text-green-500/50 uppercase text-[10px] tracking-[0.4em]">Local System Sync Active</p>
             </div>
          </WindowFrame>
        )}

        {activeSection === "contact" && (
          <WindowFrame title="COMMS // SECURE_LINE" onClose={handleClose} active>
             <Contact />
          </WindowFrame>
        )}

        {activeSection === "links" && (
           <WindowFrame title="NETWORK // EXTERNAL" onClose={handleClose} active>
              <div className="grid gap-4 max-w-sm mx-auto pt-10">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 flex items-center justify-between group transition-all hover:border-green-500/50">
                  <span className="font-mono uppercase tracking-widest group-hover:text-green-400">GitHub Repository</span>
                  <Globe size={16} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 flex items-center justify-between group transition-all hover:border-green-500/50">
                  <span className="font-mono uppercase tracking-widest group-hover:text-green-400">LinkedIn Network</span>
                  <Globe size={16} />
                </a>
              </div>
           </WindowFrame>
        )}
        {activeSection === "leetcode" && (
          <WindowFrame title="LEETCODE // STATS_ANALYZER" onClose={handleClose} active>
             <LeetCodeStats />
          </WindowFrame>
        )}
      </AnimatePresence>

      {/* --- NEW INTERACTIVE DOCK --- */}
      <footer className="h-20 flex items-center justify-center px-6 relative z-[200]">
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <button onClick={() => handleClose()} className="p-3 hover:bg-white/5 rounded-xl transition-colors">
            <Terminal size={20} className="text-green-500" />
          </button>
          
          <div className="w-[1px] h-6 bg-white/10 mx-2" />

          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleOpen(app.id)}
              className={`p-3 rounded-xl transition-all relative group ${
                activeSection === app.id ? "bg-green-500/20 text-green-400" : "hover:bg-white/5 text-zinc-400"
              }`}
            >
              <app.icon size={20} />
              {activeSection === app.id && (
                <motion.div 
                  layoutId="dock-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"
                />
              )}
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[10px] uppercase font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {app.label}
              </span>
            </button>
          ))}

          <div className="w-[1px] h-6 bg-white/10 mx-2" />
          
          <div className="px-3 flex flex-col items-end min-w-[80px]">
             <span className="text-[9px] font-mono text-zinc-500 leading-none uppercase">Synced</span>
             <span className="text-xs font-mono font-bold leading-none mt-1 tracking-tighter">{currentTime}</span>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;