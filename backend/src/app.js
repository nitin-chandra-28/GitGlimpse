import express from 'express';
import cors from 'cors';
import githubRoutes from './routes/githubRoutes.js';



const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://git-glimpse-alpha.vercel.app"
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());

app.use('/api/github', githubRoutes);

app.get('/', (req, res) => {
    // console.log(req.session)
    res.send({status: 'API Running'});
});




export default app;
