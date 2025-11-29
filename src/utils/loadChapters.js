export async function loadChapters(lang = "en") {
  const module = await import(`@/assets/data/chapters-meta/${lang}.json`);
  return module.default;
}
