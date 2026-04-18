export interface Repository {
  name: string
  url: string
  complexity: "Beginner" | "Intermediate" | "Advanced"
  techStack: string[]
  problem: string
  solution: string
  pros: string[]
  cons: string[]
}

export interface InsightData {
  problem: string
  solution: string
  tech_stack: string[]
  complexity: "low" | "medium" | "high"
  pros: string[]
  cons: string[]
  unique_points: string[]
  use_cases: string[]
  learning_outcomes: string[]
  gap_opportunities: string[]
  architectural_risks: string[]
}

export interface AnalysisData {
  coreIntent: string
  features: string[]
  searchQueries: string[]
  insight: InsightData
  repositories: Repository[]
}

export const mockAnalysisData: AnalysisData = {
  coreIntent: "AI-Powered Personal Fitness Tracking & Coaching Platform",
  features: [
    "Workout Planning",
    "AI Personal Trainer",
    "Progress Tracking",
    "Nutrition Integration",
    "Social Features",
    "Wearable Sync",
  ],
  searchQueries: [
    "AI fitness app GitHub",
    "machine learning workout tracker",
    "personal trainer app open source",
    "fitness tracking React Native",
    "AI exercise recommendation system",
  ],
  insight: {
    problem: "Current fitness apps lack hyper-personalized, real-time adaptation and often provide cookie-cutter workout routines that don't account for daily user constraints and recovery states.",
    solution: "An AI-powered system that uses contextual daily data (sleep, nutrition, stress) to dynamically generate and adjust workout plans, acting as a true real-time personal coach.",
    tech_stack: ["React Native", "TensorFlow.js", "Node.js", "PostgreSQL", "Redis", "Supabase"],
    complexity: "high",
    pros: [
      "Highly personalized user experience",
      "Dynamic adaptation to health metrics",
      "Potential for high user retention",
      "Scalable AI coaching model"
    ],
    cons: [
      "High computational cost for real-time AI",
      "Complex integration with various wearables",
      "Steep learning curve for model training",
      "Privacy and security concerns with health data"
    ],
    unique_points: [
      "Real-time form correction via computer vision",
      "Predictive fatigue modeling",
      "Emotion and stress-aware workout adjustments"
    ],
    use_cases: [
      "Individuals recovering from injuries needing adaptive routines",
      "Busy professionals with unpredictable schedules",
      "Athletes looking for marginal gains through micro-optimizations"
    ],
    learning_outcomes: [
      "Implementing real-time data streaming and processing",
      "Edge-computing for AI models on mobile devices",
      "Complex state management across cross-platform apps",
      "Handling sensitive PII health data securely"
    ],
    gap_opportunities: [
      "Lack of AR-based real-time form correction apps in the market",
      "Untapped integration with continuous glucose monitors (CGMs)",
      "Mental health and physical fitness correlation tracking"
    ],
    architectural_risks: [
      "Sync conflicts between offline mode and cloud predictions",
      "Battery drain issues due to continuous background processing",
      "Latency in processing computer vision models for form correction"
    ]
  },
  repositories: [
    {
      name: "wger-project/wger",
      url: "https://github.com/wger-project/wger",
      complexity: "Advanced",
      techStack: ["Python", "Django", "PostgreSQL", "Docker", "REST API"],
      problem:
        "Lack of open-source, self-hosted fitness tracking solutions with comprehensive workout management.",
      solution:
        "Full-featured fitness/workout manager with exercise database, workout plans, nutrition diary, and REST API.",
      pros: [
        "Comprehensive exercise database with 800+ exercises",
        "Self-hosted option for privacy-conscious users",
        "Active community and regular updates",
        "Well-documented REST API",
      ],
      cons: [
        "Steep learning curve for deployment",
        "UI feels dated compared to commercial apps",
        "Limited mobile app functionality",
        "No AI/ML features currently",
      ],
    },
    {
      name: "nicholasglazer/fittrackee",
      url: "https://github.com/SamR1/FitTrackee",
      complexity: "Intermediate",
      techStack: ["Python", "Flask", "Vue.js", "PostgreSQL", "Leaflet"],
      problem:
        "Need for privacy-focused workout tracking with GPS support without relying on commercial services.",
      solution:
        "Self-hosted outdoor workout tracking with GPS visualization, statistics, and multi-sport support.",
      pros: [
        "Clean, modern UI design",
        "Strong focus on privacy",
        "GPS track visualization with maps",
        "Multi-sport activity support",
      ],
      cons: [
        "Limited to outdoor activities",
        "No AI-powered recommendations",
        "Smaller community than alternatives",
        "Basic social features",
      ],
    },
    {
      name: "AshishSharma03/FitBot",
      url: "https://github.com/AshishSharma03/FitBot",
      complexity: "Beginner",
      techStack: ["Python", "TensorFlow", "OpenCV", "MediaPipe"],
      problem:
        "Users often perform exercises with incorrect form, leading to injuries and reduced effectiveness.",
      solution:
        "AI-powered fitness assistant using pose estimation to provide real-time feedback on exercise form.",
      pros: [
        "Real-time pose correction feedback",
        "Uses MediaPipe for efficient processing",
        "Educational value for learning CV",
        "Simple setup and demo",
      ],
      cons: [
        "Prototype-level code quality",
        "Limited exercise variety",
        "No persistent data storage",
        "Requires good lighting conditions",
      ],
    },
    {
      name: "openworkout/openworkout",
      url: "https://github.com/oliexdev/openworkout",
      complexity: "Intermediate",
      techStack: ["Java", "Android", "SQLite", "Material Design"],
      problem:
        "Android users need offline-first fitness tracking without subscriptions or data collection.",
      solution:
        "Native Android workout trainer with offline support, progress tracking, and customizable routines.",
      pros: [
        "Fully offline capable",
        "No ads or tracking",
        "Material Design UI",
        "Export/import functionality",
      ],
      cons: [
        "Android only platform",
        "No cloud sync option",
        "Limited exercise animations",
        "Community-driven updates only",
      ],
    },
    {
      name: "healthkit-samples/fitness-tracker",
      url: "https://github.com/example/fitness-tracker",
      complexity: "Advanced",
      techStack: ["Swift", "SwiftUI", "HealthKit", "CoreML", "CloudKit"],
      problem:
        "iOS developers need reference implementations for integrating with Apple Health ecosystem.",
      solution:
        "Sample iOS fitness app demonstrating HealthKit integration, ML-based activity recognition, and cloud sync.",
      pros: [
        "Native iOS performance",
        "Deep HealthKit integration",
        "Modern SwiftUI architecture",
        "Apple Watch companion app",
      ],
      cons: [
        "iOS exclusive platform",
        "Requires Apple Developer account",
        "Complex setup for HealthKit",
        "Limited documentation",
      ],
    },
  ],
}
