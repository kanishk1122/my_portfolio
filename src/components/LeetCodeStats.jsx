import React, { useEffect, useRef, useState, Suspense } from "react";
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
  Cpu,
  Github,
  Linkedin,
  Code2,
  Trophy,
  Activity
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

// --- LEETCODE STATS COMPONENT ---
const LeetCodeStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = "kanishk1122"; // Your GitHub username

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const GITHUB_RAW_URL = `https://raw.githubusercontent.com/${username}/leetcode/refs/heads/main/stats.json`;
        const res = await fetch(GITHUB_RAW_URL);
        if (!res.ok) throw new Error("GitHub statistics not found");
        const rawData = await res.json();

        const lcStats = rawData.leetcode || {};
        const stats = {
          totalSolved: rawData.solved || lcStats.solved || (lcStats.easy + lcStats.medium + lcStats.hard) || 0,
          easySolved: lcStats.easy || 0,
          mediumSolved: lcStats.medium || 0,
          hardSolved: lcStats.hard || 0,
        };

        // Topic Mapping Logic from your API
        const problemKeys = Object.keys(lcStats.shas || {});
        const topics = { "Arrays": 0, "Strings": 0, "Math": 0, "Trees": 0, "Matrix": 0, "Searching": 0, "Sorting": 0, "DP": 0 };
        
        problemKeys.forEach(slug => {
          const s = slug.toLowerCase();
          if (s.includes('dp') || s.includes('coin') || s.includes('stock')) topics["DP"]++;
          else if (s.includes('tree') || s.includes('bst')) topics["Trees"]++;
          else if (s.includes('matrix') || s.includes('grid')) topics["Matrix"]++;
          else if (s.includes('search') || s.includes('find')) topics["Searching"]++;
          else if (s.includes('sort') || s.includes('merge')) topics["Sorting"]++;
          else if (s.includes('string') || s.includes('word')) topics["Strings"]++;
          else if (s.includes('math') || s.includes('bit')) topics["Math"]++;
          else topics["Arrays"]++;
        });

        const topicData = Object.entries(topics)
          .map(([name, value]) => ({ name, value }))
          .filter(t => t.value > 0);

        setData({ stats, topicData });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return (
    <div className="w-full h-64 flex flex-col items-center justify-center font-mono text-green-500/50">
      <Activity className="animate-spin mb-2" />
      <span>SYNCING_LEETCODE_NODE...</span>
    </div>
  );

  if (error) return (
    <div className="w-full p-4 border border-red-500/20 bg-red-500/5 rounded-xl font-mono text-xs text-red-400">
      [!] ERROR: DATA_LINK_FAILURE: {error}
    </div>
  );

  const difficultyData = [
    { name: 'Easy', value: data.stats.easySolved, color: '#22c55e' },
    { name: 'Medium', value: data.stats.mediumSolved, color: '#eab308' },
    { name: 'Hard', value: data.stats.hardSolved, color: '#ef4444' },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Solved Progress Terminal */}
      <div className="bg-black/40 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-20"><Trophy size={40} /></div>
        <h3 className="text-xs font-mono text-green-500 mb-6 tracking-[0.3em] uppercase italic">Difficulty_Distribution</h3>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={difficultyData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {difficultyData.map(d => (
            <div key={d.name} className="text-center">
              <div className="text-lg font-black" style={{ color: d.color }}>{d.value}</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase">{d.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Strength Bar Chart */}
      <div className="bg-black/40 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-20"><Code2 size={40} /></div>
        <h3 className="text-xs font-mono text-green-500 mb-6 tracking-[0.3em] uppercase italic">Topic_Proficiency</h3>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topicData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }} 
                width={70}
              />
              <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ display: 'none' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#22c55e" fillOpacity={0.6 + (index * 0.05)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-[10px] font-mono text-zinc-500 text-center uppercase tracking-widest">
          Total Solved: <span className="text-white">{data.stats.totalSolved}</span>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStats;