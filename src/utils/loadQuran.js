export async function loadQuran() {
  const module = await import("@/assets/data/quran.json");
  return module.default;
}
