import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Rocket,
  ChevronDown,
  Layers,
  ArrowRight,
  TrendingUp,
  Target,
  BookOpen
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { InsightData } from "@/lib/mock-data"

export function InsightCard({ insight }: { insight: InsightData }) {
  const complexityColor = {
    low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.15)]",
    medium: "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.15)]",
    high: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]",
  }[insight.complexity] || "bg-sky-500/10 text-sky-400 border-sky-500/20";

  return (
    <div className="space-y-6 w-full pt-4 pb-10">
      {/* Top Summary Section */}
      <div className="rounded-3xl border border-slate-800 shadow-[0_0_40px_rgba(99,102,241,0.05)] overflow-hidden bg-slate-900/60 backdrop-blur-2xl relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-800/80">
          <div className="p-6 md:p-8 md:border-r border-slate-800 bg-gradient-to-br from-slate-900/80 via-transparent to-transparent relative">
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Target className="w-4 h-4"/> Issue.Log
              </span>
              <div className="h-px bg-slate-800 flex-1 ml-2"></div>
            </div>
            <p className="font-light text-lg leading-relaxed text-slate-300 relative z-10">
              {insight.problem}
            </p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-bl from-indigo-500/5 via-transparent to-transparent relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500"></div>
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4"/> Resolution.Patch
              </span>
              <div className="h-px bg-indigo-500/20 flex-1 ml-2"></div>
            </div>
            <p className="text-slate-100 leading-relaxed font-medium relative z-10 lg:text-lg">
              {insight.solution}
            </p>
          </div>
        </div>
        
        {/* Tech Stack & Complexity */}
        <div className="bg-[#0A0D14]/80 p-6 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-slate-800">
          <div className="flex items-center gap-4 flex-wrap flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border border-slate-800/80 bg-slate-900 px-3 py-1.5 rounded-md shrink-0">System.Stack</span>
            <div className="flex flex-wrap gap-2">
              {insight.tech_stack.map((tech) => (
                <div key={tech} className="rounded px-3 py-1 font-mono uppercase tracking-wider bg-slate-800/60 border border-slate-700/50 shadow-sm text-[10px] hover:bg-slate-700 hover:text-sky-300 transition-colors backdrop-blur-sm text-slate-300 cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-slate-900/60 pl-4 pr-1.5 py-1.5 rounded-full border border-slate-800 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">SYS.LEVEL</span>
            <span className={`px-4 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest border ${complexityColor}`}>
              {insight.complexity}
            </span>
          </div>
        </div>
      </div>

      {/* Grid for Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] overflow-hidden bg-slate-900/60 backdrop-blur-xl group relative">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 transition-colors duration-500"></div>
          <div className="px-6 py-5 md:px-8 mt-2 border-b border-slate-800/60">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 text-emerald-400">
              <div className="p-1.5 rounded-md bg-emerald-500/10">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              System Strengths
            </h3>
          </div>
          <div className="p-6 md:p-8">
            <ul className="space-y-4">
              {insight.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0 group-hover/item:scale-125 transition-transform" />
                  <span className="text-slate-400 font-light leading-relaxed text-sm md:text-base group-hover/item:text-slate-200 transition-colors">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)] overflow-hidden bg-slate-900/60 backdrop-blur-xl group relative">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-rose-500/20 group-hover:bg-rose-500/40 transition-colors duration-500"></div>
          <div className="px-6 py-5 md:px-8 mt-2 border-b border-slate-800/60">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 text-rose-400">
              <div className="p-1.5 rounded-md bg-rose-500/10">
                <XCircle className="w-5 h-5" />
              </div>
              System Limitations
            </h3>
          </div>
          <div className="p-6 md:p-8">
            <ul className="space-y-4">
              {insight.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-3 group/item">
                  <XCircle className="w-4 h-4 text-rose-400 mt-1 shrink-0 group-hover/item:scale-125 transition-transform" />
                  <span className="text-slate-400 font-light leading-relaxed text-sm md:text-base group-hover/item:text-slate-200 transition-colors">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gap Opportunities (MOST IMPORTANT) */}
      <div className="rounded-3xl border border-indigo-500/30 bg-[#0F1219]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
        <div className="md:px-8 px-6 pt-8 pb-6 border-b border-indigo-500/20">
          <h2 className="flex items-center gap-3 text-2xl font-bold font-mono tracking-tight text-indigo-400">
            <Rocket className="w-7 h-7" />
            Market Gaps & Opportunities
          </h2>
          <p className="text-slate-400 font-light text-base mt-2">
            High-value architectural blueprints to distinguish this solution inside the current market.
          </p>
        </div>
        <div className="md:px-8 px-6 py-8 bg-indigo-500/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insight.gap_opportunities.map((gap, idx) => (
              <div 
                key={idx} 
                className="bg-[#1A1F2E]/60 backdrop-blur-xl p-6 rounded-2xl border border-indigo-500/20 shadow-sm hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:border-indigo-400/50 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="bg-indigo-500/10 p-2.5 rounded-xl border border-indigo-500/20 w-fit">
                  <Rocket className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-slate-200 font-medium text-base leading-relaxed">
                  {gap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architectural Risks */}
      <div className="rounded-2xl border border-rose-500/20 bg-slate-900/40 backdrop-blur-xl shadow-sm overflow-hidden relative">
         <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500/80" />
        <div className="px-6 py-5 md:px-8 border-b border-slate-800/80">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 text-rose-400">
            <div className="p-1.5 rounded-md bg-rose-500/10">
               <AlertTriangle className="w-5 h-5" />
            </div>
            Architectural Risks
          </h3>
        </div>
        <div className="p-6 md:p-8 bg-slate-900/20">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insight.architectural_risks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-slate-800/30 backdrop-blur-md p-5 rounded-xl border border-slate-700/50 hover:border-rose-500/30 hover:bg-rose-500/5 transition-colors group/risk">
                <AlertTriangle className="w-5 h-5 text-rose-500/70 shrink-0 mt-0.5 group-hover/risk:text-rose-400 transition-colors" />
                <span className="text-slate-300 font-light text-[15px] leading-relaxed group-hover/risk:text-slate-200 transition-colors">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

          {/* Expandable Sections using Accordion */}
      <div className="rounded-2xl border border-slate-800 shadow-[0_0_20px_rgba(99,102,241,0.05)] overflow-hidden bg-slate-900/60 backdrop-blur-xl">
        <Accordion type="multiple" defaultValue={["use-cases"]} className="w-full text-slate-300">
          {/* Use Cases */}
          <AccordionItem value="use-cases" className="border-b border-slate-800/80 px-6">
            <AccordionTrigger className="hover:no-underline py-6 group">
              <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest font-bold group-hover:text-indigo-400 transition-colors text-slate-100">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                Target Implementations
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="pl-14">
                <div className="grid sm:grid-cols-2 gap-4">
                  {insight.use_cases.map((uc, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] shrink-0" />
                      <span className="text-slate-200 font-light leading-relaxed">{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Learning Outcomes */}
          <AccordionItem value="learning-outcomes" className="border-b border-slate-800/80 px-6">
            <AccordionTrigger className="hover:no-underline py-6 group">
              <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest font-bold group-hover:text-sky-400 transition-colors text-slate-100">
                <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                Learning Outcomes
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
               <div className="pl-14">
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                    {insight.learning_outcomes.map((lo, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-sky-500/70 mt-1 shrink-0 group-hover:text-sky-400 transition-colors" />
                        <span className="text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors">{lo}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Unique Points */}
          <AccordionItem value="unique-points" className="border-0 px-6">
            <AccordionTrigger className="hover:no-underline py-6 group">
              <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest font-bold group-hover:text-amber-400 transition-colors text-slate-100">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                Unique Selling Points
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="pl-14">
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                    {insight.unique_points.map((up, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-amber-500/70 mt-1 shrink-0 group-hover:text-amber-400 transition-colors" />
                        <span className="text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors">{up}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  )
}
