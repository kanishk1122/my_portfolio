import { useEffect,  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// --- INTERNALIZED ABOUT ME COMPONENT (NO PROPS) ---
const AboutMe = () => {
  const [countdown, setCountdown] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const skills = [
    "Express.js", "React", "Next.js", "GSAP", "mySQL", "PostgreSQL", 
    "Javascript", "Java", "C++", "DSA", "Python", "Tailwind", 
    "TypeScript", "MongoDB", "AWS", "FLASK", "KAFKA"
  ];

  const hoverValues = [
    "Building Digital Ecosystems",
    "Full Stack Architect",
    "Creative Developer",
    "Problem Solver"
  ];

  useEffect(() => {
    // Calculate days since start (Aug 27, 2023)
    const startDate = new Date("2023-08-27");
    const now = new Date();
    const diff = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));
    setCountdown(diff);

    // Text rotation interval
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % hoverValues.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 md:px-12 text-white">
      {/* Introduction Header */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <p className="text-5xl font-bold font-mono tracking-tighter">Hi</p>
          <motion.img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
            alt="👋"
            width="48"
            height="48"
            animate={{ rotate: [0, 20, 0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
        
        <div className="max-w-2xl text-center font-mono text-lg md:text-xl leading-relaxed">
          My name is <span className="text-green-500 font-bold">Kanishk Soni</span>. I
          live in Jaipur and I am 18 years old. I have been coding for{" "}
          <span className="bg-green-500/20 text-green-400 px-2 rounded border border-green-500/30">
            {countdown} days
          </span>. I have completed many projects, and I hope you like my portfolio.
        </div>
      </div>

      
      {/* Skills Section */}
      <div className="w-full bg-zinc-900/50 rounded-3xl border border-white/10 p-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30"></div>
        
        <div className="relative z-20 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter uppercase italic opacity-20 select-none">
            Tech Stack
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Floating Status Bar inside the window */}
      <div className="mt-8 flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
         <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Currently:</span>
         <AnimatePresence mode="wait">
            <motion.span
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold"
            >
              {hoverValues[textIndex]}
            </motion.span>
         </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutMe;