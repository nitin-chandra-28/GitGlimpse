import mongoose, {Schema} from "mongoose";

const repoSchema = new Schema ( {
  github_id: { type: Number, unique: true, required: true },
  name: String,
  full_name: String,
  description: String,
  stars: Number,
  language: String,
  repo_url: String,
  search_query: String ,// ✅ Add this to keep track of the query used
  readme: String,
  embedding: [Number],
  insights: {
        problem: String,
        solution: String,
        tech_stack: [String],
        complexity: String,
        pros: [String],
        cons: [String],
        unique_points: [String],
        use_cases: [String],
        learning_outcomes: [String],
        error: String // Optional: in case the LLM fails
    }
}, { timestamps: true });

export const Repo = mongoose.model("Repo", repoSchema);