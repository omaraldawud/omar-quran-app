import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// In-memory token storage (simple, resets on server restart)
let oauthToken = null;
let tokenExpiry = 0;

// Function to get a valid token
async function getToken() {
  const now = Date.now();
  if (oauthToken && now < tokenExpiry) {
    return oauthToken;
  }

  const res = await fetch("https://api.quran.foundation/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.QURAN_CLIENT_ID,
      client_secret: process.env.QURAN_CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "content",
    }),
  });

  const data = await res.json();
  oauthToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000 - 5000; // refresh 5s early
  return oauthToken;
}

// Endpoint to fetch Surah audio
app.get("/api/audio/:chapterId", async (req, res) => {
  try {
    const { chapterId } = req.params;
    const reciter = "abdullaah_3awwaad_al-juhaynee";

    const token = await getToken();

    const apiRes = await fetch(
      `https://api.quran.foundation/v1/chapters/${chapterId}/reciter/${reciter}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
