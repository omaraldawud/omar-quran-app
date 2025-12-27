// utils/loadJuz.js
import localJuz from "@/assets/data/juz/juzList.json"; // your local JSON

export async function loadJuz(useApi = false) {
  if (useApi) {
    try {
      const res = await fetch("https://api.quran.com/api/v4/juzs");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.juzs;
    } catch (err) {
      console.warn("Failed to fetch Juz from API, using local JSON.", err);
    }
  }

  // fallback to local JSON
  return localJuz;
}
