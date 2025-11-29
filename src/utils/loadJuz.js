export async function loadJuz() {
  const res = await fetch("https://api.quran.com/api/v4/juzs");
  const data = await res.json();
  return data.juzs;
}
