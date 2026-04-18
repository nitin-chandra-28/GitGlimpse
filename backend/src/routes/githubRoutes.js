import express from 'express';
import searchRepositories, { getRepoReadme, getMetaAnalysis } from '../controllers/githubController.js';

const routes = express.Router();


routes.get('/search', searchRepositories);
routes.get('/readme/:owner/:repo', getRepoReadme); 
routes.get('/meta-analysis', getMetaAnalysis);


export default routes;