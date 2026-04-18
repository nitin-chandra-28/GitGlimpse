
import axios from "axios";

export async function getEmbedding(text) {
  try {
    const apiKey = (process.env.OPENROUTER_API_KEY || "").trim();

    if (!apiKey) {
      throw new Error("Missing OPENROUTER_API_KEY");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/embeddings",
      {
        model: "google/gemini-embedding-001", // Make sure this is the correct OpenRouter model ID
        input: text
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // optional but recommended
          "X-Title": "Repo Analyzer" 
        }
      }
    );

    // OpenRouter follows OpenAI's embedding response format
    return response.data.data[0].embedding;

  } catch (error) {
    console.error("Embedding error:", error.response?.data || error.message);
    return null;
  }
}


// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function getEmbedding(text) {
// try {
// const apiKey = (process.env.GOOGLE_API_KEY1 || "").trim();

// if (!apiKey) {
//   throw new Error("Missing GOOGLE_API_KEY");
// }

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
// const result = await model.embedContent(text);

// return result.embedding.values;

// } catch (error) {
// console.log("Embedding error:", error.message);
// return null;
// }
// }