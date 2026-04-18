

import fetchGithubRepo from './githubService.js';
import { getEmbedding } from './embeddingService.js';
import { Repo } from '../models/repo.model.js';
import { processQuery , analyzeReadme} from './llmService.js';

// -----------------------------
// Cosine Similarity
// -----------------------------
function cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

    let dotProduct = 0, normA = 0, normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// -----------------------------
// Main Service
// -----------------------------
async function searchRepoService(userInput) {
    try {
        // -----------------------------
        // 1. Check Cache (DB)
        // -----------------------------
        const existing = await Repo.find({ search_query: userInput });

        if (existing.length > 0) {
            console.log("✅ Returning from DB cache");

            return existing.sort(
                (a, b) => (b.similarity_score || 0) - (a.similarity_score || 0)
            );
        }

        // -----------------------------
        // 2. Process Query (LLM)
        // -----------------------------
        const queryData = await processQuery(userInput);
        const searchQueries = queryData.queries || [userInput];

        if (!searchQueries || searchQueries.length === 0) {
            throw new Error("No processed queries generated");
        }

        console.log("💡 Processed Queries:", searchQueries);

        // -----------------------------
        // 3. Merge Queries → One Intent
        // -----------------------------
        const mergedQueryText = searchQueries.join(" ");
        const mergedQueryEmbedding = await getEmbedding(mergedQueryText);

        if (!mergedQueryEmbedding) {
            throw new Error("Failed to generate query embedding");
        }

        // -----------------------------
        // 4. Collect Unique Repos
        // -----------------------------
        const repoMap = new Map();

        for (const query of searchQueries) {
            try {
                const repos = await fetchGithubRepo(query);

                for (const repo of repos) {
                    if (!repo || !repo.github_id) continue;

                    // Store only once (dedupe)
                    if (!repoMap.has(repo.github_id)) {
                        repoMap.set(repo.github_id, repo);
                    }
                }
            } catch (err) {
                console.error(`❌ Error fetching for query "${query}":`, err.message);
            }
        }

        let uniqueRepos = Array.from(repoMap.values());

        if (uniqueRepos.length === 0) {
            console.log("⚠️ No repositories found");
            return [];
        }

        // -----------------------------
        // 5. Compute Similarity + Score
        // -----------------------------
        const scoredRepos = [];

        for (const repo of uniqueRepos) {
            // Skip if embedding missing
            if (!repo.embedding) continue;

            const similarity = cosineSimilarity(
                mergedQueryEmbedding,
                repo.embedding
            );

            // Optional popularity boost
            const stars = repo.stars || 0;
            const popularityBoost = Math.log(stars + 1) / 10;

            const finalScore = 0.8 * similarity + 0.2 * popularityBoost;

            scoredRepos.push({
                github_id: repo.github_id,
                name: repo.name,
                full_name: repo.full_name,
                html_url: repo.html_url,
                description: repo.description,
                stars: stars,
                search_query: userInput,
                similarity_score: finalScore,
                readme: repo.readme
            });

            // Debug log (optional)
            // console.log(repo.name, finalScore);
        }

        // -----------------------------
        // 6. Sort (Ranking)
        // -----------------------------
        scoredRepos.sort(
            (a, b) => b.similarity_score - a.similarity_score
        );

        // -----------------------------
        // 7. Top K Selection
        // -----------------------------
        const topRepos = scoredRepos.slice(0, 5);

        console.log("🔥 Top Ranked Repositories Ready");

        console.log("🧠 Generating deep insights for top 5 repos...");
        const analysisPromises = topRepos.map(async (repo) => {
            if (repo.readme && repo.readme !== "No README available") {
                // Call your new function from llmService
                const insights = await analyzeReadme(repo.full_name, repo.readme);
                
                // Attach the structured JSON insights to the repo object
                repo.insights = insights; 
            } else {
                repo.insights = null; // No README to analyze
            }
            return repo;
        });

        // Wait for all 5 Gemini requests to finish
        await Promise.all(analysisPromises);
        console.log("✅ Insights generated successfully!");

        // -----------------------------
        // 8. Save to DB (Clean Data Only)
        // -----------------------------
        try {
            if (topRepos.length > 0) {
                await Repo.insertMany(topRepos, { ordered: false });
            }
        } catch (err) {
            console.log("⚠️ Some repos already exist or failed to save");
        }
         topRepos.meta = {
            features: queryData.features || [],
            coreIntent: queryData.core_intent || userInput,
            searchQueries: searchQueries
        };

        return topRepos;

    } catch (error) {
        console.error("❌ searchRepoService Error:", error.message);
        return [];
    }
}

export default searchRepoService;