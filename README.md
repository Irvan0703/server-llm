# 🗺️ LLM + Google Maps Backend

This backend connects a **local LLM** (such as Open WebUI / Ollama) with the **Google Maps API**.  
Goal: Users can type natural language prompts → LLM transforms into a query → Google Maps API is called → results are sent back to the frontend (e.g., React + Tailwind 3).

---

## 🚀 Features
- Integration with **Google Places API** (search for places).
- Support for **Maps Embed** to preview locations.
- Support for **Directions API** to open Google Maps directions.
- API protection (CORS, helmet, rate limiting).
- Works with **local LLMs** (Open WebUI / Ollama).

---

## 📦 Setup Project

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Add your environment variables:
```env
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_API_KEY
LLM_URL=http://localhost:3000/api/generate
PORT=4000
```

### 4. Run the Server
If using TypeScript:
```bash
npx ts-node server.ts
```

If using plain JavaScript:
```bash
node server.js
```

Server will run at:  
👉 [http://localhost:4000](http://localhost:4000)

---

## 🔌 API Endpoints

### POST `/api/llm-search`
Search for a place based on user prompt.

**Request Body:**
```json
{
  "prompt": "find seafood near Monas",
  "origin": "-6.2,106.8"
}
```

**Response:**
```json
{
  "parsed": {
    "query": "seafood near Monas Jakarta",
    "location": "-6.1751,106.8650",
    "radius": 5000
  },
  "items": [
    {
      "name": "Seafood 45",
      "address": "Jl. Veteran I No.10, Jakarta",
      "rating": 4.5,
      "placeId": "ChIJ123...",
      "embedUrl": "https://www.google.com/maps/embed/v1/place?...",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&origin=-6.2%2C106.8&destination=place_id:ChIJ123..."
    }
  ]
}
```

---

## 🧠 LLM Connection

- Default LLM endpoint: `http://localhost:3000/api/generate` (Open WebUI).  
- Can be switched to **Ollama API** or another model by editing `services/llm.ts`.  

---

## 🔒 Best Practices
- Restrict your **Google Maps API Key** to your server IP only.  
- Use **express-rate-limit** to prevent abuse.  
- Deploy with **Docker** or **PM2** for production stability.  

---

## 📄 License
MIT
