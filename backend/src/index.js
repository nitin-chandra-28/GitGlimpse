import dotenv from 'dotenv';
dotenv.config();

const required = ["GITHUB_TOKEN", "MONGODB_URI", "OPENROUTER_API_KEY", "GOOGLE_API_KEY1"];
const missing = required.filter((k) => !process.env[k] || !process.env[k].trim());

if (missing.length > 0) {
console.error("Missing required env vars:", missing.join(", "));
process.exit(1);
}


import app from './app.js';
import connectDB from './db/index.js';


const PORT = process.env.PORT || 3000;

connectDB()
   .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
   })
   .catch((error) => {
    console.error("DB Connection failed", error);
    process.exit(1);
   });