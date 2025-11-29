export async function loadTranslation(lang = "en") {
  const module = await import(`@/assets/data/translations/${lang}.json`);
  return module.default;
}
