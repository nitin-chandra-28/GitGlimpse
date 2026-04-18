import searchRepoService from '../services/reposervice.js';
import { fetchRepoReadme } from '../services/githubService.js';
import { Repo } from '../models/repo.model.js';
import { generateProjectInsights } from '../services/llmService.js';



// Controller to handle search queries
export async function searchRepositories(req, res) {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter q is required' });
    }
    
    try {
        const repositories = await searchRepoService(query);
        
        // Extract the metadata you attached in reposervice.js
        const meta = repositories.meta || { features: [], coreIntent: query, searchQueries: [query] };
        
        // Return JSON perfectly formatted for the frontend
        res.json({
           repositories: repositories,
           features: meta.features,
           coreIntent: meta.coreIntent,
           searchQueries: meta.searchQueries
        });
    } catch (error) {
        console.error('Error fetching repositories:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

// Controller to fetch individual README from GitHub
export async function getRepoReadme(req, res) {
    const { owner, repo } = req.params;

    if (!owner || !repo) {
        return res.status(400).json({ error: 'Owner and repo parameters are required' });
    }
    
    try {
        const readmeContent = await fetchRepoReadme(owner, repo);
        res.send(readmeContent); 
    } catch (error) {
        console.error('Error fetching README:', error.message);
        res.status(404).json({ error: 'README not found or failed to fetch' });
    }
}

// Controller to get meta-analysis of the top 5 repos
export async function getMetaAnalysis(req, res) {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter q is required' });
    }

    try {
        const savedRepos = await Repo.find({ search_query: query }).limit(5);

        if (savedRepos.length === 0) {
            return res.status(404).json({ error: 'No analyzed repositories found for this query in the database.' });
        }

        const repoAnalyses = savedRepos.map(repo => ({
            name: repo.full_name,
            insights: repo.insights 
        }));

        const metaInsights = await generateProjectInsights(repoAnalyses, query);

        res.json(metaInsights);
    } catch (error) {
        console.error('Error generating meta analysis:', error.message);
        res.status(500).json({ error: 'Failed to generate meta analysis' });
    }
}

export default searchRepositories;