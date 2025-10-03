import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const LLM_URL = process.env.LLM_URL || "http://localhost:3000/api/generate";

export async function parsePromptWithLLM(userPrompt: string) {
  const instruction = `
  Kamu adalah asisten yang mengubah prompt user jadi query untuk Google Places API.
  Jawab hanya JSON valid:
  {
    "query": "string",
    "location": "lat,lng atau null",
    "radius": number atau null
  }
  `;

  const res = await axios.post(LLM_URL, {
    prompt: `${instruction}\nUser: ${userPrompt}`,
    max_new_tokens: 200
  });

  const text = res.data.output || res.data.text || "";
  try {
    return JSON.parse(text.trim());
  } catch {
    return { query: userPrompt, location: null, radius: null };
  }
}
