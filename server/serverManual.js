import axios from "axios";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

let oauthToken = null;
let tokenExpiry = 0;

// STEP 1: Get OAuth Token (cached)
async function getAccessToken() {
  const now = Date.now();

  // reuse valid token
  if (oauthToken && now < tokenExpiry) {
    return oauthToken;
  }

  const { QURAN_CLIENT_ID, QURAN_CLIENT_SECRET, QURAN_OAUTH_URL } = process.env;

  const basicAuth = Buffer.from(
    `${QURAN_CLIENT_ID}:${QURAN_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios({
      method: "post",
      url: QURAN_OAUTH_URL,
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials&scope=content",
    });

    oauthToken = response.data.access_token;
    tokenExpiry = now + response.data.expires_in * 1000 - 5000; // refresh early

    console.log("🔐 New OAuth token acquired");
    return oauthToken;
  } catch (error) {
    console.error(
      "❌ Error fetching OAuth token:",
      error.response?.data || error
    );
    throw error;
  }
}

app.get("/api/test-oauth", async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/audio/:chapterId", async (req, res) => {
  try {
    const { chapterId } = req.params;
    const token = await getAccessToken();
    const { QURAN_API_URL, QURAN_CLIENT_ID } = process.env;

    // reciter ID, not string name
    const reciterId = 7; // Abu Bakr Shatri (example from docs)

    const apiRes = await axios.get(
      `${QURAN_API_URL}/v4/chapters/chapter_recitations/${reciterId}/by_chapter/${chapterId}`,
      {
        headers: {
          "x-auth-token": token,
          "x-client-id": QURAN_CLIENT_ID,
        },
      }
    );
    res.json(apiRes.data);
  } catch (err) {
    console.error("Error fetching audio:", err.response?.data || err);
    res.status(500).json({ error: "Failed to fetch Surah audio" });
  }
});

// Start the server and listen for incoming requests
const PORT = process.env.PORT || 3000; // Use environment variable or default to port 3000

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
