import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LandingScreen } from "@/components/landing-screen"
import { ResultsDashboard } from "@/components/results-dashboard"

export type AnalysisState = "idle" | "loading" | "results" | "error"

export default function App() {
  const [state, setState] = useState<AnalysisState>("idle")
  const [idea, setIdea] = useState("")
  const [analysisData, setAnalysisData] = useState<any>(null)

  const handleAnalyze = async (userIdea: string) => {
    setIdea(userIdea)
    setState("loading")
    setAnalysisData(null)

  try {
      const searchRes = await fetch(`/api/github/search?q=${encodeURIComponent(userIdea)}`)
      if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.statusText}`)
      const responseData = await searchRes.json()

      const finalData = {
        coreIntent: responseData.coreIntent || userIdea, // REAL DATA!
        features: responseData.features || [],           // REAL DATA!
        searchQueries: responseData.searchQueries || [], // REAL DATA! 
        insight: null, 
        repositories: responseData.repositories.map((repo: any) => ({
          name: repo.full_name || repo.name,
          url: repo.html_url || repo.repo_url || `https://github.com/${repo.full_name || repo.name}`, // Changed to html_url based on your backend output
          complexity: repo.insights?.complexity || "Beginner",
          techStack: repo.insights?.tech_stack || [],
          problem: repo.insights?.problem || "",
          solution: repo.insights?.solution || "",
          pros: repo.insights?.pros || [],
          cons: repo.insights?.cons || []
        }))
      }

      setAnalysisData(finalData)
      setState("results")
    } catch (error) {
      console.error("Error analyzing project idea:", error)
      setState("idle") 
    }
  }

  const handleFetchInsights = async () => {
    try {
      const metaRes = await fetch(`/api/github/meta-analysis?q=${encodeURIComponent(idea)}`)
      if (!metaRes.ok) throw new Error(`Meta analysis failed: ${metaRes.statusText}`)
      const insightData = await metaRes.json()

      // Update the existing state by inserting the new insight object
      setAnalysisData((prev: any) => ({
        ...prev,
        insight: insightData
      }))

    } catch (error) {
         console.error("Failed to get meta-analysis:", error)
    }
  }

  const handleReset = () => {
    setState("idle")
    setIdea("")
    setAnalysisData(null)
  }

  return (
    <AnimatePresence mode="wait">
      {state === "idle" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.4 }}
          className="min-h-screen"
        >
          <LandingScreen onAnalyze={handleAnalyze} />
        </motion.div>
      )}
      
      {state !== "idle" && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
        >
          <ResultsDashboard
            idea={idea}
            data={analysisData}
            isLoading={state === "loading"}
            onReset={handleReset}
            onFetchInsights={handleFetchInsights}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}