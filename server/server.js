// server/server.js (using import syntax)
import express from "express";
import dotenv from "dotenv";
// node-fetch is needed internally by the package
import fetch from "node-fetch";
import { QuranClient, Language } from "@quranjs/api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize the QuranClient with specific URLs from .env
const client = new QuranClient({
  clientId: process.env.QURAN_CLIENT_ID,
  clientSecret: process.env.QURAN_CLIENT_SECRET,
  defaults: {
    language: Language.ENGLISH,
  },
  fetch: fetch,
  // Use the pre-deployment URLs you defined in your .env file
  baseUrl: process.env.QURAN_API_BASE_URL,
  oauthUrl: process.env.QURAN_OAUTH_URL,
});

// EXAMPLE: How to use the package to fetch data
app.get("/api/verse/:key", async (req, res) => {
  try {
    // The client internally handles the getAccessToken() logic
    const { key } = req.params; // e.g., "2:255"
    const verse = await client.verses.findByKey(key, {
      translations: 1, // Example translation ID (you need a valid ID)
      words: true,
    });
    res.json(verse);
  } catch (error) {
    console.error(error);
    // If this still gives "Unauthorized", the URLs or credentials are off
    res.status(500).json({ error: "Failed to fetch verse using package" });
  }
});

// ... (Add your listen function here) ...

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
