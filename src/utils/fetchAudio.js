export async function fetchSurahAudio(
  chapterId,
  reciter = "abdullaah_3awwaad_al-juhaynee"
) {
  try {
    const res = await fetch(
      `https://api.quran.foundation/v1/chapters/${chapterId}/reciter/${reciter}`
    );

    if (!res.ok) throw new Error("Failed to fetch audio");

    const data = await res.json();

    if (!data.audio_files || data.audio_files.length === 0) return null;

    return data.audio_files[0]; // contains audio_url
  } catch (err) {
    console.error("Error fetching Surah audio:", err);
    return null;
  }
}
