// 
import axios from "axios";
import { getEmbedding } from "./embeddingService.js";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/**
 * Fetch repositories + README + embeddings
 */
async function fetchGithubRepo(query) {
  const githubToken = process.env.GITHUB_TOKEN;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${githubToken}`,
  };

  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        headers,
        params: { q: query },
      }
    );

    const repositories = response.data.items
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5);

    const enrichedRepos = [];

    for (const repo of repositories) {
      try {
        const readme = await fetchRepoReadme(
          repo.owner.login,
          repo.name
        );

        const limitedReadme = readme
          ? readme.slice(0, 3000)
          : null;

        const textForEmbedding =
          limitedReadme ||
          repo.description ||
          repo.name ||
          "No description";
          await delay(1000);

        const embedding = await getEmbedding(textForEmbedding);

        enrichedRepos.push({
          github_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          repo_url: repo.html_url,
          readme: limitedReadme || "No README available",
          embedding,
        });

      } catch (error) {
        // fallback if README fails
        const fallbackText =
          repo.description || repo.name || "No description";

        const embedding = await getEmbedding(fallbackText);

        enrichedRepos.push({
          github_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          repo_url: repo.html_url,
          readme: "No README available",
          embedding,
        });
      }
    }

        return enrichedRepos;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "GitHub API error"
    );
  }
}



/**
 * Fetch README from GitHub
 */
export async function fetchRepoReadme(owner, repo) {
  const githubToken = process.env.GITHUB_TOKEN;

  const headers = {
    Accept: "application/vnd.github.v3.raw",
    Authorization: `token ${githubToken}`,
  };

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers }
    );

    return response.data;

  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch README"
    );
  }
}

export default fetchGithubRepo;

