"use client"

import { ExternalLink, GitBranch, Code2, Database, Terminal, Layout, Smartphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Repository } from "@/lib/mock-data"

interface RepositoryCardProps {
  repository: Repository
  viewMode: "grid" | "list"
  onClick?: () => void
}

const complexityColors: Record<Repository["complexity"], string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
  Intermediate: "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.15)]",
  Advanced: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]",
}

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase()
  if (t.includes('react') || t.includes('vue') || t.includes('ui')) return <Layout className="w-3 h-3 mr-1" />
  if (t.includes('node') || t.includes('api') || t.includes('backend')) return <Terminal className="w-3 h-3 mr-1" />
  if (t.includes('sql') || t.includes('db') || t.includes('data')) return <Database className="w-3 h-3 mr-1" />
  if (t.includes('mobile') || t.includes('ios') || t.includes('android')) return <Smartphone className="w-3 h-3 mr-1" />
  return <Code2 className="w-3 h-3 mr-1" />
}

export function RepositoryCard({ repository, viewMode, onClick }: RepositoryCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`bg-slate-900/60 backdrop-blur-xl border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full overflow-hidden text-slate-200 ${
        viewMode === "list" ? "flex-row h-auto" : ""
      }`}
    >
      {/* Top-Bar */}
      <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <GitBranch className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[15px] font-semibold text-slate-100 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
            >
              {repository.name}
              <ExternalLink className="h-3.5 w-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </a>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 capitalize font-semibold tracking-wide text-[10px] px-2.5 py-0.5 rounded-full ${complexityColors[repository.complexity]}`}
        >
          {repository.complexity}
        </Badge>
      </div>

      {/* Middle-Body */}
      <CardContent className="flex-1 space-y-4">
        <div className="space-y-3 flex flex-col h-full justify-start">
          {/* Problem */}
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-700 rounded-full" />
            <p className="text-sm text-slate-400 font-light line-clamp-3 leading-relaxed">
              {repository.problem}
            </p>
          </div>
          
          {/* Solution */}
          <div className="relative pl-4 mt-2">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500/60 rounded-full" />
            <p className="text-sm font-medium text-slate-200 line-clamp-3 leading-relaxed">
              {repository.solution}
            </p>
          </div>
        </div>
      </CardContent>

      {/* Bottom-Tray */}
      <CardFooter className="pt-2 pb-5 shrink-0 border-t border-slate-800/60 mt-auto bg-slate-900/40">
        <div className="flex flex-wrap gap-2 w-full pt-3">
          {repository.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-300 font-mono text-[11px] px-2.5 py-1 rounded shadow-sm flex items-center backdrop-blur-sm transition-colors"
            >
              {getTechIcon(tech)}
              {tech}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
