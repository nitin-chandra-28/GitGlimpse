"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  GitBranch,
  LayoutGrid,
  List,
  ChevronLeft,
  Search,
  Target,
  Layers,
  AlertTriangle,
  Lightbulb,
  Compass,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AnalysisData } from "@/lib/mock-data"
import { InsightCard } from "@/components/insight-card"
import { RepositoryCard } from "@/components/repository-card"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Repository } from "@/lib/mock-data"

interface ResultsDashboardProps {
  idea: string
  data: AnalysisData
  isLoading: boolean
  onReset: () => void
  onFetchInsights: () => Promise<void>
}

export function ResultsDashboard({
  idea,
  data,
  isLoading,
  onReset,
  onFetchInsights
}: ResultsDashboardProps) {
  const [showInsights, setShowInsights] = useState(false)
  const [insightLoading, setInsightLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)

  const handleRunMetaAnalysis = async () => {
    // If insight already exists, just show it
    if (data.insight) {
      setShowInsights(true)
      return
    }

    setInsightLoading(true)
    await onFetchInsights()
    setInsightLoading(false)
    setShowInsights(true)
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (showInsights) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-[#0A0D14] text-slate-200 selection:bg-indigo-500/30 font-sans"
      >
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0A0D14]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInsights(false)}
                className="gap-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Repositories
              </Button>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <Lightbulb className="h-4 w-4 text-teal-400" />
                <span className="text-sm font-medium text-teal-100 font-mono tracking-wide uppercase">
                  Meta-Analysis Insights
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <InsightCard insight={data.insight} />
        </main>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-[100dvh] bg-[#0A0D14] text-slate-200 selection:bg-indigo-500/30 font-sans"
    >
      {/* Background Holographic Grid (Matching Landing Page) */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black_60%,transparent_100%)] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_60%)] pointer-events-none" />
      <div className="fixed -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0A0D14]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="gap-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            >
              <ChevronLeft className="h-4 w-4" />
              New Analysis
            </Button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <GitBranch className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-medium text-slate-200 uppercase tracking-widest font-mono">
                GitGlimpse
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
                  onClick={() => setShowInsights(true)}
                  className="mr-4 bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all border border-indigo-400/30 rounded-xl px-5 h-10 hidden sm:flex"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  View Meta-Analysis
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "text-indigo-400 bg-indigo-500/10" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "text-indigo-400 bg-indigo-500/10" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <section className="mb-8 space-y-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <Target className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 uppercase tracking-wide font-mono">
                {data.coreIntent}
              </h1>
              <p className="text-slate-400 leading-relaxed font-light">
                Target Objective: <span className="text-sky-300">&quot;{idea}&quot;</span>
              </p>
            </div>
          </div>

          {/* Features and Search Queries */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Extracted Features */}
            <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400">
                <Sparkles className="h-4 w-4" />
                System Requirements
              </div>
              <div className="flex flex-wrap gap-2.5">
                {data.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20 font-mono text-[11px] uppercase tracking-wider px-2.5 py-1"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Search Queries */}
            <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
                <Search className="h-4 w-4" />
                Execution Queries
              </div>
              <div className="flex flex-wrap gap-2.5">
                {data.searchQueries.map((query) => (
                  <Badge
                    key={query}
                    variant="outline"
                    className="border-slate-700/80 text-slate-400 hover:text-sky-300 hover:border-sky-500/40 bg-slate-950/50 font-mono text-[11px] px-2.5 py-1"
                  >
                    <span className="text-sky-500 mr-1.5">~</span>{query}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area without Tabs */}
        <div className="flex items-center justify-between mt-10 mb-6 relative z-10 hidden sm:flex">
          <h2 className="text-xl font-bold flex items-center gap-3 text-slate-100">
            <GitBranch className="h-5 w-5 text-indigo-400" />
            Repository Matrix 
            <Badge variant="outline" className="bg-slate-900/80 border-slate-700 text-slate-400 font-mono">
              {data.repositories.length} Nodes
            </Badge>
          </h2>
          <Button 
            onClick={handleRunMetaAnalysis}
            disabled={insightLoading}
            className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-400/30 transition-all relative overflow-hidden group font-mono uppercase tracking-wider text-xs hidden sm:flex"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            <Lightbulb className="h-4 w-4 relative z-10" />
            <span className="relative z-10">{insightLoading ? "Initializing AI Core..." : "Synthesize Blueprints"}</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)] pr-4 custom-scrollbar relative z-10 w-full overflow-hidden">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="show"
            className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 w-full"
                : "space-y-4 pb-20 w-full"
            }
          >
            {data.repositories.map((repo) => (
              <motion.div
                key={repo.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <RepositoryCard
                  repository={repo}
                  viewMode={viewMode}
                  onClick={() => setSelectedRepo(repo)}
                />
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </main>

      {/* Repository Details Dialog */}
      <Dialog open={!!selectedRepo} onOpenChange={(open) => !open && setSelectedRepo(null)}>
        <DialogContent className="max-w-3xl overflow-hidden max-h-[85vh] p-0 border-slate-700/50 shadow-[0_0_50px_rgba(99,102,241,0.15)] sm:rounded-3xl flex flex-col bg-[#0A0D14]/95 backdrop-blur-2xl text-slate-200">
          {selectedRepo && (
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div className="flex flex-col min-h-max">
                {/* Header section */}
                <div className="p-6 sm:p-8 bg-slate-900/50 border-b border-slate-800 relative overflow-hidden shrink-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  <DialogHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10 pr-6 sm:pr-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-sm text-sky-400 shrink-0 transition-transform hover:-translate-y-1 duration-300">
                          <GitBranch className="h-6 w-6" />
                        </div>
                        <div className="space-y-2 mt-1 min-w-0 flex-1">
                          <DialogTitle className="text-2xl font-bold text-slate-100 font-mono tracking-tight leading-tight break-all sm:break-normal break-words">
                            {selectedRepo.name}
                          </DialogTitle>
                          <a
                            href={selectedRepo.url.startsWith('http') ? selectedRepo.url : `https://${selectedRepo.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-300 hover:text-sky-200 transition-colors group break-all sm:break-normal"
                          >
                             Github repository{selectedRepo.url}
                            <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="w-fit sm:w-auto uppercase tracking-widest font-mono px-3 py-1.5 bg-slate-950 shadow-xs text-[10px] font-bold whitespace-nowrap border-slate-700 text-slate-300"
                    >
                    {selectedRepo.complexity}
                    </Badge>
                  </div>
                </DialogHeader>

                <div className="mt-6 flex items-center gap-2 flex-wrap relative z-10">
                  {selectedRepo.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1 font-mono uppercase tracking-widest bg-slate-800/60 border border-slate-700/50 shadow-sm text-[10px] hover:bg-slate-700 hover:text-sky-300 transition-colors backdrop-blur-sm text-slate-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-8 bg-[#0A0D14]">
                {/* Problem vs Solution */}
                <div className="grid md:grid-cols-2 gap-8 border-b border-slate-800 pb-8">
                  <div className="relative group min-w-0">
                    <div className="absolute -inset-4 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-lg pointer-events-none"></div>
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-3 shrink-0">
                      <Target className="w-4 h-4" />
                      Issue.Log
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm font-light break-words w-full">
                      {selectedRepo.problem}
                    </p>
                  </div>
                  
                  <div className="relative group min-w-0">
                     <div className="absolute -inset-4 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-lg pointer-events-none"></div>
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2 mb-3 shrink-0">
                      <div className="bg-indigo-500/20 p-1 rounded-md text-indigo-400"><TrendingUp className="w-3.5 h-3.5" /></div>
                      Resolution.Patch
                    </h3>
                    <p className="text-slate-100 leading-relaxed text-sm font-medium break-words w-full">
                      {selectedRepo.solution}
                    </p>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div className="bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/30 p-5 sm:p-6 rounded-2xl shadow-sm transition-colors group flex flex-col max-h-full min-w-0">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2.5 shrink-0">
                      <div className="p-1.5 rounded-md bg-emerald-500/10 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      System Strengths
                    </h3>
                    <ul className="space-y-3.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                      {selectedRepo.pros.map((pro, i) => (
                        <li key={i} className="text-sm font-light text-slate-300 leading-relaxed flex items-start gap-3 break-words">
                          <CheckCircle2 className="w-[16px] h-[16px] text-emerald-400/80 mt-1 shrink-0" />
                          <span className="flex-1 min-w-0 break-words">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-rose-500/5 border border-rose-500/10 hover:border-rose-500/30 p-5 sm:p-6 rounded-2xl shadow-sm transition-colors group flex flex-col max-h-full min-w-0">
                     <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-4 flex items-center gap-2.5 shrink-0">
                      <div className="p-1.5 rounded-md bg-rose-500/10 group-hover:scale-110 transition-transform">
                        <XCircle className="h-4 w-4" />
                      </div>
                      System Limitations
                    </h3>
                    <ul className="space-y-3.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                      {selectedRepo.cons.map((con, i) => (
                        <li key={i} className="text-sm font-light text-slate-300 leading-relaxed flex items-start gap-3 break-words">
                          <XCircle className="w-[16px] h-[16px] text-rose-400/80 mt-1 shrink-0" />
                          <span className="flex-1 min-w-0 break-words">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}