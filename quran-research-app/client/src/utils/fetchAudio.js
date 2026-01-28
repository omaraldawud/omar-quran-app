export async function fetchSurahAudio(chapterId) {
  try {
    const res = await fetch(`/api/audio/${chapterId}`);
    if (!res.ok) throw new Error("Failed to fetch audio from backend");
    const data = await res.json();
    console.log("Fetched Surah audio data:", data);
    if (!data.audio_files || data.audio_files.length === 0) return null;
    return data.audio_files[0]; // audio_url + timestamps
  } catch (err) {
    console.error("Error fetching Surah audio:", err);
    return null;
  }
}
