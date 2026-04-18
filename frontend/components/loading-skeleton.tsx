import { Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Loading Animation */}
        <div className="flex flex-col items-center justify-center py-16 space-y-8">
          {/* Spinning AI Loader */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative p-6 rounded-full bg-primary/10 border border-primary/30">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            </div>
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin [animation-duration:3s]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
            </div>
            <div className="absolute inset-0 animate-spin [animation-duration:4s] [animation-direction:reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-accent" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              Analyzing Repositories
            </h2>
            <p className="text-muted-foreground max-w-md animate-pulse">
              AI is searching GitHub, extracting patterns, and generating insights...
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-3 w-full max-w-sm">
            {[
              "Parsing your project idea",
              "Searching GitHub repositories",
              "Analyzing code patterns",
              "Generating insights",
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 animate-pulse"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    index === 2 ? "bg-primary animate-ping" : "bg-primary/50"
                  }`}
                />
                <span
                  className={`text-sm ${
                    index <= 2 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                {index < 2 && (
                  <span className="ml-auto text-xs text-success">Done</span>
                )}
                {index === 2 && (
                  <span className="ml-auto text-xs text-primary animate-pulse">
                    In progress...
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Skeleton Preview */}
        <div className="mt-8 space-y-6 opacity-50">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-card border border-border space-y-3">
              <Skeleton className="h-4 w-32" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border space-y-3">
              <Skeleton className="h-4 w-40" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-28 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-card border border-border space-y-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
