import express from 'express';
import cors from 'cors';
import githubRoutes from './routes/githubRoutes.js';



const app = express();


app.use(cors({ origin: 'http://localhost:5173'}));
app.use(express.json());

app.use('/api/github', githubRoutes);

app.get('/', (req, res) => {
    // console.log(req.session)
    res.send({status: 'API Running'});
});




export default app;