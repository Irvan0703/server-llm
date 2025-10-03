import { Router } from "express";
import { parsePromptWithLLM } from "../services/llm";
import { searchPlaces, generateEmbedUrl, generateDirectionsUrl } from "../services/googleMaps";

const router = Router();

router.post("/llm-search", async (req, res) => {
  try {
    const { prompt, origin } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // 1. parse pakai LLM
    const parsed = await parsePromptWithLLM(prompt);

    // 2. panggil Google Maps
    const placesResponse = await searchPlaces(parsed.query, parsed.location, parsed.radius);
    if (placesResponse.status !== "OK" || !placesResponse.results.length) {
      return res.status(404).json({ error: "No places found", status: placesResponse.status });
    }

    // 3. ambil top 5 tempat
    const items = placesResponse.results.slice(0, 5).map((p: any) => ({
      name: p.name,
      address: p.formatted_address,
      rating: p.rating,
      placeId: p.place_id,
      embedUrl: generateEmbedUrl(p.place_id),
      directionsUrl: generateDirectionsUrl(origin || "Jakarta, Indonesia", p.place_id)
    }));

    return res.json({ parsed, items });
  } catch (err: any) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
