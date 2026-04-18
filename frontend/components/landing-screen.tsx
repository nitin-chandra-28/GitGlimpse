"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, GitBranch, Box, Lightbulb, Zap, ArrowRight, Search, Cpu, Code2, Rocket, GraduationCap, Briefcase, LayoutTemplate, Database, Server, FileText, Layers, CheckCircle, AlertTriangle, Target, Cloud, Hexagon, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface LandingScreenProps {
  onAnalyze: (idea: string) => void
}

export function LandingScreen({ onAnalyze }: LandingScreenProps) {
  const [idea, setIdea] = useState("")

  const handleSubmit = () => {
    if (idea.trim()) {
      onAnalyze(idea.trim())
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#0A0D14] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Subtle holographic grid and blueprint background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black_60%,transparent_100%)]" />
      
      {/* Cinematic Glowing Nodes & Lines */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />
      
      {/* Node connecting lines (CSS SVG representation) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none stroke-indigo-400" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 200 Q 300 150 500 400 T 900 300" fill="none" strokeWidth="1" strokeDasharray="4 4"/>
        <path d="M800 100 Q 600 300 400 600" fill="none" strokeWidth="1" strokeDasharray="4 4"/>
        <circle cx="100" cy="200" r="3" fill="#818cf8" />
        <circle cx="500" cy="400" r="4" fill="#818cf8" />
        <circle cx="900" cy="300" r="3" fill="#818cf8" />
        <circle cx="800" cy="100" r="3" fill="#818cf8" />
        <circle cx="400" cy="600" r="4" fill="#818cf8" />
        <circle cx="600" cy="300" r="2" fill="#818cf8" />
      </svg>

      {/* Floating Tech Icons & Abstract Tech Elements (Background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block z-0">
        {/* Blurry Code Snippet - Right */}
        <div className="absolute right-[-2%] top-[15%] text-indigo-400 opacity-[0.08] font-mono text-[10px] md:text-sm whitespace-pre transform rotate-[-5deg] blur-[1px] select-none">
{`const analyzeIdea = async (repo: Repo) => {
  const stack = await extractStack(repo);
  const gaps = findMarketGaps(stack);
  
  return {
    architecture: scaffold(stack),
    insights: generateInsights(gaps),
    reliability: calculateScore()
  };
}

async function build() {
  await deploy(analyze(target));
}`}
        </div>

        <div className="absolute left-[2%] bottom-[12%] text-sky-400 opacity-[0.06] font-mono text-[10px] md:text-xs whitespace-pre transform rotate-[8deg] blur-[1px] select-none">
{`SELECT architecture_pattern, count(*) 
FROM repos 
WHERE stars > 10000 
  AND topic = 'ai'
GROUP BY 1 
ORDER BY 2 DESC`}
        </div>

        {/* Scattered Terminal Dots & Plus Signs */}
        <div className="absolute left-[30%] top-[25%] text-indigo-500 opacity-20 font-mono text-[8px] tracking-[0.5em] select-none pointer-events-none">
          + + . . . + <br/>
          . . + . + . <br/>
          + . . + . .
        </div>
        <div className="absolute right-[25%] bottom-[35%] text-sky-400 opacity-20 font-mono text-[8px] tracking-[0.5em] select-none pointer-events-none">
          . . + + . . <br/>
          + . . + . + <br/>
          . + . . + .
        </div>

        {/* Faded Commit Graph - Left */}
        <svg className="absolute left-[-2%] top-[25%] opacity-[0.06] stroke-indigo-400 fill-none w-64 h-96" viewBox="0 0 200 400">
          <path d="M 50 50 L 50 350" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 50 100 C 100 100, 100 200, 100 200" strokeWidth="2" />
          <path d="M 100 200 C 150 200, 150 250, 150 250" strokeWidth="2" />
          <path d="M 100 200 L 100 300" strokeWidth="2" />
          <path d="M 100 300 C 50 300, 50 350, 50 350" strokeWidth="2" />
          <circle cx="50" cy="50" r="5" fill="#818cf8" stroke="none" />
          <circle cx="50" cy="150" r="5" fill="#818cf8" stroke="none" />
          <circle cx="100" cy="200" r="5" fill="#818cf8" stroke="none" />
          <circle cx="50" cy="250" r="5" fill="#818cf8" stroke="none" />
          <circle cx="100" cy="300" r="5" fill="#818cf8" stroke="none" />
          <circle cx="150" cy="250" r="5" fill="#818cf8" stroke="none" />
          <circle cx="50" cy="350" r="5" fill="#818cf8" stroke="none" />
        </svg>

        {/* Faded Isometric abstract servers - Bottom Right */}
        <svg className="absolute right-[5%] bottom-[20%] opacity-[0.05] stroke-sky-400 fill-transparent w-48 h-64" viewBox="0 0 100 150">
          <path d="M 50 10 L 90 30 L 50 50 L 10 30 Z" strokeWidth="1" />
          <path d="M 10 30 L 10 50 L 50 70 L 90 50 L 90 30" strokeWidth="1" />
          <path d="M 50 50 L 50 70" strokeWidth="1" />
          
          <path d="M 50 50 L 90 70 L 50 90 L 10 70 Z" strokeWidth="1" />
          <path d="M 10 70 L 10 90 L 50 110 L 90 90 L 90 70" strokeWidth="1" />
          <path d="M 50 90 L 50 110" strokeWidth="1" />
          
          <path d="M 50 90 L 90 110 L 50 130 L 10 110 Z" strokeWidth="1" />
          <path d="M 10 110 L 10 130 L 50 150 L 90 130 L 90 110" strokeWidth="1" />
          <path d="M 50 130 L 50 150" strokeWidth="1" />
        </svg>
        
        {/* Connection Nodes - Top Right */}
        <svg className="absolute right-[15%] top-[5%] opacity-[0.04] stroke-indigo-400 fill-none w-48 h-48" viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="3" />
          <circle cx="80" cy="30" r="4" />
          <circle cx="50" cy="80" r="3" />
          <path d="M 20 20 L 80 30 L 50 80 Z" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>

        {/* Faded Abstract Box - Top left */}
        <svg className="absolute left-[3%] top-[5%] opacity-[0.06] stroke-indigo-500 fill-transparent w-32 h-32 transform rotate-12" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" strokeWidth="1" strokeDasharray="4 4" />
          <rect x="30" y="30" width="60" height="60" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="30" y2="30" strokeWidth="1" />
          <line x1="80" y1="20" x2="90" y2="30" strokeWidth="1" />
          <line x1="20" y1="80" x2="30" y2="90" strokeWidth="1" />
          <line x1="80" y1="80" x2="90" y2="90" strokeWidth="1" />
        </svg>

        {/* Floating Technology Icons */}
        {[
          { Icon: Database, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", top: "15%", left: "15%", delay: 0, scale: 1 },
          { Icon: Box, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", top: "60%", left: "8%", delay: 1.5, scale: 1.1 },
          { Icon: Code2, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", top: "35%", right: "12%", delay: 0.5, scale: 0.9 },
          { Icon: Cloud, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", top: "65%", right: "8%", delay: 2, scale: 1.2 },
          { Icon: Hexagon, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", top: "20%", right: "18%", delay: 1, scale: 0.85 },
          { Icon: Terminal, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", top: "80%", left: "20%", delay: 2.5, scale: 1 },
          { Icon: Server, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", top: "45%", left: "3%", delay: 0.8, scale: 0.7 },
          { Icon: Cpu, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", top: "50%", right: "4%", delay: 1.8, scale: 0.9 },
          { Icon: Layers, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", top: "10%", left: "30%", delay: 1.2, scale: 0.75 },
          { Icon: GitBranch, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20", top: "85%", right: "25%", delay: 3, scale: 0.8 },
          { Icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", top: "75%", right: "35%", delay: 0.4, scale: 0.6 },
          { Icon: LayoutTemplate, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", top: "25%", left: "40%", delay: 2.2, scale: 0.65 },
        ].map((item, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
            className={`absolute p-4 rounded-2xl ${item.bg} border ${item.border} backdrop-blur-md shadow-2xl`}
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right,
              transform: `scale(${item.scale})`
            }}
          >
            <item.Icon className={`w-8 h-8 ${item.color} drop-shadow-[0_0_15px_currentColor]`} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-3xl w-full space-y-8 text-center"
      >
        {/* Logo/Brand */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="p-3.5 rounded-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <GitBranch className="h-7 w-7 text-indigo-400" />
          </div>
          <span className="text-2xl font-semibold tracking-tight text-slate-100">GitGlimpse</span>
        </motion.div>

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.15]">
            <span className="text-slate-100">Architect Your </span>
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
              Next Big Idea
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Turn vague project ideas into structured architectural insights by analyzing top GitHub repositories with AI.
          </p>
        </motion.div>

        {/* Features pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-4"
        >
          {[
            { icon: Sparkles, label: "AI Analysis" },
            { icon: Box, label: "Architecture Patterns" },
            { icon: Lightbulb, label: "Innovation Insights" },
            { icon: Zap, label: "Instant Results" },
          ].map(({ icon: Icon, label }, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 border border-slate-700/60 text-sm text-slate-300 hover:bg-slate-800/80 hover:border-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all cursor-default backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-indigo-400" />
              <span className="font-medium tracking-wide">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Input area with advanced glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative group mt-12"
        >
          {/* Outer glowing halo */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/20 via-sky-400/20 to-indigo-500/20 rounded-[2rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Glassmorphic Container */}
          <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl shadow-indigo-900/10">
            <div className="relative">
              <Textarea
                placeholder="Describe your project idea... (e.g., 'I want to build a fitness app using AI')"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-[160px] resize-none bg-slate-950/40 border-slate-800 text-slate-100 placeholder:text-slate-500 text-lg md:text-xl p-5 md:p-6 rounded-2xl focus:border-indigo-500/50 focus-visible:ring-2 focus-visible:ring-indigo-500/20 transition-all font-light leading-relaxed !ring-offset-0"
              />
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!idea.trim()}
              size="lg"
              className="w-full h-16 gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg py-6 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:shadow-none hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-[1.01] transition-all duration-300 border border-indigo-400/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              <Sparkles className="h-6 w-6 relative z-10" />
              <span className="relative z-10 tracking-wide">Analyze Idea</span>
            </Button>
          </div>
        </motion.div>

        {/* Example prompts */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-4 mt-8"
        >
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest text-xs">AI-Powered Blueprints</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "Build a real-time collaboration tool",
              "Create a personal finance tracker",
              "Design a learning management system",
            ].map((example, index) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                key={example}
                onClick={() => setIdea(example)}
                className="px-4 py-2 text-sm rounded-xl bg-slate-800/30 hover:bg-slate-800/80 border border-slate-700/40 text-slate-400 hover:text-slate-200 hover:border-indigo-500/30 transition-all duration-300 shadow-sm"
              >
                {example}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Flowchart / How it Works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl mx-auto mt-32 mb-20 px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
            How GitGlimpse Works
          </h2>
          <p className="text-slate-400 mt-4 text-lg font-light">From raw idea to complete technical blueprint in 4 steps.</p>
        </div>

        <div className="relative">
          {/* Main Line connecting steps (visible on md screens and up) */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "1. Input Idea",
                desc: "Describe your app, feature, or platform in plain English.",
                color: "text-amber-400",
                bg: "bg-amber-400/10 border-amber-400/20"
              },
              {
                icon: Search,
                title: "2. Vector Search",
                desc: "AI scans millions of top GitHub repos for similar patterns.",
                color: "text-sky-400",
                bg: "bg-sky-400/10 border-sky-400/20"
              },
              {
                icon: Cpu,
                title: "3. Analyze & Extract",
                desc: "LLMs aggregate key architectures, tech stacks, and schemas.",
                color: "text-indigo-400",
                bg: "bg-indigo-400/10 border-indigo-400/20"
              },
              {
                icon: Box,
                title: "4. Generate Blueprint",
                desc: "Receive a tailored, actionable software design document.",
                color: "text-emerald-400",
                bg: "bg-emerald-400/10 border-emerald-400/20"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center group">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 bg-slate-900/80 backdrop-blur-xl ${step.bg} shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} strokeWidth={1.5} />
                </div>
                
                {/* Arrow pointing to next step (mobile) */}
                {idx < 3 && (
                  <ArrowRight className="md:hidden my-4 text-slate-600 rotate-90 w-6 h-6" />
                )}

                <div className="mt-6 text-center space-y-2">
                  <h3 className="text-xl font-semibold text-slate-200">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* What You Get / Output Breakdown Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto mt-10 mb-32 px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
            Exactly What You Get
          </h2>
          <p className="text-slate-400 mt-4 text-lg font-light max-w-2xl mx-auto">
            A deep-dive meta-analysis identifying tech stacks, risks, and market gaps based on real GitHub data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
          {/* Left Side: Features List */}
          <div className="space-y-8">
            {[
              {
                icon: Layers,
                title: "Tech Stack Recommendations",
                desc: "Optimal languages, frameworks, and tools backed by popular GitHub repositories."
              },
              {
                icon: Rocket,
                title: "Market Gaps & Opportunities",
                desc: "Strategic insights and blueprints to differentiate your solution within the current market space."
              },
              {
                icon: AlertTriangle,
                title: "Architectural Risks",
                desc: "Detailed breakdown of system limitations, vulnerabilities, and implementation pitfalls."
              },
              {
                icon: Target,
                title: "Target Implementations",
                desc: "Real-world use cases, learning outcomes, and unique selling points tailored for your idea."
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 items-start group hover:bg-slate-800/30 p-2 -ml-2 rounded-xl transition-colors">
                <div className="p-3 bg-indigo-500/10 rounded-xl shrink-0 mt-1">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-200">{feature.title}</h3>
                  <p className="text-slate-400 mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="mt-8 gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700 w-full sm:w-auto h-12 px-6">
              <Zap className="w-5 h-5 text-indigo-400" />
              Instant Insight Generation
            </Button>
          </div>

          {/* Right Side: Mock UI Card (Insight Style) */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0A0D14] flex flex-col shadow-inner group p-6 gap-4">
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Blur Toggle */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 gap-8 blur-[4px] group-hover:blur-0 transition-all duration-700">
               
               {/* Tech Stack Mock */}
               <div className="w-full bg-slate-900/80 border border-slate-800 p-4 rounded-xl shadow-lg backdrop-blur-md">
                 <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">System.Stack</div>
                 <div className="flex gap-2 flex-wrap">
                   {["React", "Node.js", "PostgreSQL", "Redis", "Docker"].map((tech) => (
                     <div key={tech} className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-300 font-mono">
                       {tech}
                     </div>
                   ))}
                 </div>
               </div>

               {/* Market Gap Mock */}
               <div className="w-full bg-slate-900/80 border border-slate-800 p-4 rounded-xl shadow-lg backdrop-blur-md flex gap-4 items-start">
                 <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                    <Rocket className="w-4 h-4 text-amber-500" />
                 </div>
                 <div className="space-y-2 w-full pt-1">
                   <div className="h-2 w-1/3 bg-slate-700 rounded-full"></div>
                   <div className="h-2 w-full bg-slate-800 rounded-full"></div>
                   <div className="h-2 w-2/3 bg-slate-800 rounded-full"></div>
                 </div>
               </div>

               {/* Risk Mock */}
               <div className="w-full bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl shadow-lg backdrop-blur-md flex gap-4 items-start">
                 <div className="p-2 bg-rose-500/10 rounded-lg shrink-0">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                 </div>
                 <div className="space-y-2 w-full pt-1">
                   <div className="h-2 w-1/4 bg-rose-500/30 rounded-full"></div>
                   <div className="h-2 w-3/4 bg-rose-500/20 rounded-full"></div>
                 </div>
               </div>

            </div>

            {/* Hover overlay text */}
            <div className="absolute inset-0 z-30 bg-slate-950/70 backdrop-blur-[6px] flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-4 group-hover:scale-95 transition-all duration-700 pointer-events-none">
              <div className="relative scale-110 sm:scale-125">
                 <div className="absolute -inset-1.5 bg-indigo-500/40 rounded-full blur-lg animate-pulse"></div>
                 <div className="px-8 py-4 bg-slate-900 border border-indigo-500/50 rounded-full text-slate-100 text-base md:text-lg font-semibold shadow-[0_0_40px_rgba(99,102,241,0.6)] flex items-center gap-3 relative z-10 transition-transform duration-300">
                   <div className="p-2 bg-indigo-500/20 rounded-lg">
                     <Search className="w-5 h-5 text-indigo-400" />
                   </div>
                   Hover to Inspect Full Analysis
                   <ArrowRight className="w-5 h-5 ml-1 opacity-60" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Who is GitGlimpse For Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl mx-auto mt-20 mb-32 px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
            Who is GitGlimpse For?
          </h2>
          <p className="text-slate-400 mt-4 text-lg font-light max-w-2xl mx-auto">
            Whether you're starting from scratch or scaling up, GitGlimpse provides the architectural clarity you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Code2,
              title: "Software Engineers",
              desc: "Skip the boilerplate phase. Learn industry best practices and scaffold side projects instantly."
            },
            {
              icon: Rocket,
              title: "Startup Founders",
              desc: "Validate ideas and generate technical roadmaps to share with stakeholders or developers."
            },
            {
              icon: Briefcase,
              title: "Product Managers",
              desc: "Bridge the gap between product and engineering by exploring feasible architecture designs."
            },
            {
              icon: GraduationCap,
              title: "CS Students",
              desc: "Learn how real-world, production-ready applications are built inside top tech companies."
            }
          ].map((persona, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all shadow-lg"
            >
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <persona.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-200">{persona.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {persona.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl mx-auto mb-32 px-4 text-center space-y-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
          Ready to architect your next idea?
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-light">
          Stop wondering how to build it. Get your technical blueprint now.
        </p>

        <div className="relative group mt-8">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/20 via-sky-400/20 to-indigo-500/20 rounded-[2rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl shadow-indigo-900/10 text-left">
            <div className="relative">
              <Textarea
                placeholder="Describe your project idea... (e.g., 'I want to build a fitness app using AI')"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-[140px] resize-none bg-slate-950/40 border-slate-800 text-slate-100 placeholder:text-slate-500 text-lg md:text-xl p-5 md:p-6 rounded-2xl focus:border-indigo-500/50 focus-visible:ring-2 focus-visible:ring-indigo-500/20 transition-all font-light leading-relaxed !ring-offset-0"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!idea.trim()}
              size="lg"
              className="w-full h-16 gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg py-6 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:shadow-none hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-[1.01] transition-all duration-300 border border-indigo-400/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              <Sparkles className="h-6 w-6 relative z-10" />
              <span className="relative z-10 tracking-wide">Analyze Idea</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
