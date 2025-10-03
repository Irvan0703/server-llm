import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_KEY = process.env.GOOGLE_MAPS_API_KEY!;

export async function searchPlaces(query: string, location?: string, radius?: number) {
  const url = "https://maps.googleapis.com/maps/api/place/textsearch/json";
  const params: Record<string, string | number> = { query, key: GOOGLE_KEY };
  if (location) params.location = location;
  if (radius) params.radius = radius;

  const res = await axios.get(url, { params });
  return res.data; // berisi { status, results }
}

export function generateEmbedUrl(placeId: string) {
  return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&q=place_id:${placeId}`;
}

export function generateDirectionsUrl(origin: string, destinationPlaceId: string) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=place_id:${encodeURIComponent(destinationPlaceId)}`;
}
