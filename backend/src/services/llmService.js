import axios from "axios";

// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const openrouter = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:3000", // optional but recommended
    "X-Title": "Repo Analyzer"
  }
});

// Intercept requests to dynamically inject the API key
openrouter.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.OPENROUTER_API_KEY}`;
  return config;
});

// 🔹 Helper to extract + clean JSON safely
function safeParseJSON(text) {
  try {
    const clean = text
      .replace(/```json|```/gi, "")
      .replace(/\n/g, " ")
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .trim();

    return JSON.parse(clean);
  } catch (err) {
    return null;
  }
}

// ==============================
// 1. PROCESS QUERY
// ==============================
export async function processQuery(userInput) {
  const prompt = `
You are a software architect. Return ONLY valid JSON, no explanation, no markdown.

Input: ${userInput.slice(0, 600)}

Rules:
- If input is vague/single word: infer the most common use case for that domain
- If input is non-English: translate intent, then apply rules
- If input is already technical: extract stack directly, skip inference
- core_intent: max 15 words, English only
- features: max 5 items, each under 8 words, technical not business
- queries: exactly 4, keyword-dense GitHub search terms (4-6 words each)
  - Stack coverage: web frontend, mobile, backend/API, AI/ML
  - Use: [framework] + [domain keyword] + [architecture/feature]
  - Avoid: "app", "system", "platform", "web", "mobile" as standalone words
  - Prefer: specific frameworks, libraries, model names (YOLOv5, BERT, JWT, etc.)

{"core_intent":"","features":[],"queries":[]}
"""${userInput}"""
`;
  try {
    const res = await openrouter.post("/chat/completions", {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    const text = res.data.choices[0].message.content;
    const parsed = safeParseJSON(text);

    return parsed || { queries: [userInput], features: [], core_intent: userInput };
  } catch (err) {
    console.error("processQuery error:", err.response?.data || err.message);
    return [userInput];
  }
}

// ==============================
// 2. ANALYZE README
// ==============================
export async function analyzeReadme(repoName, readme) {
  const prompt = `
You are a software architect. Analyze this README and return ONLY valid JSON with no explanation.

Repo: ${repoName}
README: ${readme || "".slice(0, 3000)}

{"problem":"","solution":"","tech_stack":[],"complexity":"low|medium|high","pros":[],"cons":[],"unique_points":[],"use_cases":[],"learning_outcomes":[]}

Rules:
- Arrays: max 4 items, each under 10 words
- Strings: max 20 words
- No markdown, no explanation, no extra keys
`;

  try {
    const res = await openrouter.post("/chat/completions", {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    const text = res.data.choices[0].message.content;
    const parsed = safeParseJSON(text);

    if (!parsed) {
      return { error: "INVALID_JSON", raw: text };
    }

    return {
      problem: parsed.problem || "",
      solution: parsed.solution || "",
      tech_stack: parsed.tech_stack || [],
      complexity: parsed.complexity || "Unknown",
      pros: parsed.pros || [],
      cons: parsed.cons || [],
      unique_points: parsed.unique_points || [],
      use_cases: parsed.use_cases || [],
      learning_outcomes: parsed.learning_outcomes || []
    };
  } catch (err) {
    console.error("analyzeReadme error:", err.response?.data || err.message);
    return { error: "LLM_FAILED", repo: repoName };
  }
}

// ==============================
// 3. GENERATE META INSIGHTS
// ==============================
export async function generateProjectInsights(repoAnalyses, userInput = "") {
  const prompt = `
You are a software architect. Return ONLY valid JSON, no explanation, no markdown.

Goal: Deep meta-analysis for someone building "${userInput.slice(0, 150)}"

Repos: ${JSON.stringify(repoAnalyses.slice(0, 6).map(r => ({
  s: r.tech_stack?.slice(0, 4),
  p: r.problem,
  g: r.pros?.slice(0, 2),
  b: r.cons?.slice(0, 2),
  u: r.unique_points?.[0]
})))}

Rules (all relative to "${userInput.slice(0, 200)}"):
Focus on DIFFERENCES and TRADE-OFFS between repos, not summaries
- Avoid generic phrases ("user-friendly", "scalable", "uses ML")
- problem: core shared pain point (max 12 words)
- solution: best approach based on trade-offs (max 12 words)
- tech_stack: most relevant to idea (max 5)
- complexity: low|medium|high
- pros: strongest patterns worth copying (max 4, <10 words each)
- cons: non-obvious critical weaknesses (max 4, <10 words each)
- unique_points: rare valuable features (max 3, <10 words each)
- use_cases: real validated scenarios (max 4, <8 words each)
- learning_outcomes: key technical skills gained (max 4, <10 words each)
- gap_opportunities: underbuilt areas + why they matter (max 4, <12 words each)
- architectural_risks: design mistakes + their impact (max 3, <12 words each)
- Prefer architectural insights (deployment, data flow, model design) over features
{"problem":"","solution":"","tech_stack":[],"complexity":"","pros":[],"cons":[],"unique_points":[],"use_cases":[],"learning_outcomes":[],"gap_opportunities":[],"architectural_risks":[]}
`;

  try {
    const res = await openrouter.post("/chat/completions", {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const text = res.data.choices[0].message.content;
    const parsed = safeParseJSON(text);

    return parsed || { error: "INVALID_JSON" };
  } catch (err) {
    console.error("generateProjectInsights error:", err.message);
    return { error: "LLM_FAILED" };
  }
}




























// import axios from 'axios';

// export async function processQuery(userInput) {
//     const prompt = `You are an expert software architect.

// Convert the following vague project idea into structured JSON.

// Rules:
// - Output ONLY valid JSON (no explanation, no markdown)
// - Keep it concise and technical
// - Focus on real engineering intent

// Format:
// {
//   "core_intent": "short description",
//   "features": ["feature1", "feature2"],
//   "queries": ["query1", "query2", "query3"]
// }

// Guidelines:
// - Queries must be useful for GitHub search
// - Include technical terms (e.g., websocket, auth, backend, system design)
// - Avoid vague words like "something", "maybe"

// Input:
// """${userInput}"""
// `;

//     try {
//         const response = await axios.post(
//             "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GOOGLE_API_KEY1,
//             {
//                 contents: [{ parts: [{ text: prompt }] }]
//             }
//         );

//         // Extract the raw text from the Gemini response payload
//         const rawText = response.data.candidates[0].content.parts[0].text;
        
//         // Remove markdown formatting (like ```json ... ```) and parse
//         const cleanJsonStr = rawText.replace(/```(json)?/gi, '').trim();
//         const parsed = JSON.parse(cleanJsonStr);

//         // Return just the queries array from the parsed JSON
//         return parsed.queries || [userInput];
//     } catch (error) {
//         console.error("LLM Error:", error.response?.data || error.message);
//         // Fallback to the original user input if the API fails
//         return [userInput];
//     }
// }

// export async function analyzeReadme(repoName, readme) {
//     const prompt = `
// You are a senior software architect and technical educator.

// Analyze the given GitHub repository README and extract structured insights.

// Repository Name:
// ${repoName}

// README:
// ${readme}

// Return ONLY valid JSON:

// {
//   "problem": "",
//   "solution": "",
//   "tech_stack": [],
//   "complexity": "Beginner | Intermediate | Advanced",
//   "pros": [],
//   "cons": [],
//   "unique_points": [],
//   "use_cases": [],
//   "learning_outcomes": []
// }

// Rules:
// - No markdown
// - No explanation outside JSON
// - Keep concise but meaningful
// - If missing info, infer intelligently
// `;

//     try {
//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY1}`,
//             {
//                 contents: [{ parts: [{ text: prompt }] }],
//                 generationConfig: {
//                     temperature: 0.3,
//                     responseMimeType: "application/json"  // 🔥 more consistent JSON
//                 }
//             }
//         );

//         const rawText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//         if (!rawText) throw new Error("Empty LLM response");

//         // 🔧 Clean response
//         let clean = rawText
//             .replace(/```json|```/gi, "")
//             .trim();

//         // 🛡️ Fix common JSON issues
//         clean = clean.replace(/\n/g, " "); // remove line breaks
//         clean = clean.replace(/,\s*}/g, "}"); // trailing commas
//         clean = clean.replace(/,\s*]/g, "]");

//         let parsed;

//         try {
//             parsed = JSON.parse(clean);
//         } catch (err) {
//             console.warn("⚠️ JSON parse failed, returning raw output");
//             return {
//                 error: "Invalid JSON",
//                 raw: clean
//             };
//         }

//         // ✅ Ensure structure safety
//         return {
//             problem: parsed.problem || "",
//             solution: parsed.solution || "",
//             tech_stack: parsed.tech_stack || [],
//             complexity: parsed.complexity || "Unknown",
//             pros: parsed.pros || [],
//             cons: parsed.cons || [],
//             unique_points: parsed.unique_points || [],
//             use_cases: parsed.use_cases || [],
//             learning_outcomes: parsed.learning_outcomes || []
//         };

//     } catch (error) {
//         console.error(`LLM Analysis Error for ${repoName}:`, error.response?.data || error.message);

//         return {
//             error: "LLM_FAILED",
//             repo: repoName
//         };
//     }
// }




// export async function generateProjectInsights(repoAnalyses) {
//     const prompt = `
// You are a senior technical strategist and product manager.

// Analyze the given data of the top 5 GitHub repositories in a specific domain.

// 1. Identify common patterns
// 2. Identify missing features
// 3. Identify weaknesses
// 4. Identify innovation opportunities
// 5. Recommend directions

// ---
// Projects Data:
// ${JSON.stringify(repoAnalyses)}
// ---

// Return ONLY valid JSON in this format:
// {
//   "common_patterns": [],
//   "missing_features": [],
//   "weaknesses": [],
//   "innovation_opportunities": [],
//   "recommended_directions": []
// }

// Rules:
// - Do NOT explain outside JSON
// - Do NOT repeat same points
// - Keep answers concise but meaningful
// - Focus on real insights, not generic statements
// `;

//     try {
//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY1}`,
//             {
//                 contents: [{ parts: [{ text: prompt }] }],
//                 generationConfig: {
//                     temperature: 0.4,
//                     responseMimeType: "application/json"
//                 }
//             }
//         );

//         const rawText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//         if (!rawText) throw new Error("Empty LLM response");

//         let clean = rawText.replace(/```json|```/gi, "").trim();
//         clean = clean.replace(/\n/g, " ");

//         return JSON.parse(clean);
//     } catch (error) {
//         console.error("LLM Meta-Insights Error:", error.message);
//         return { error: "LLM_FAILED" };
//     }
// }