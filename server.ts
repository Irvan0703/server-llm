import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import llmRouter from "./routes/llmSearch";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// rate limit
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

app.use("/api", llmRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
