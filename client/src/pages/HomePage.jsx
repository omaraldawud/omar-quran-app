import { useEffect, useState } from "react";
import SurahViewer from "@/components/SurahViewer";
import RightSidebar from "@/components/layout/RightSidebar";
import SurahFilters from "@/components/SurahFilters";
import { loadChaptersMetas } from "@/utils/loadChaptersMetas";
import { loadQuran } from "@/utils/loadQuran";
import { loadTranslation } from "@/utils/loadTranslation";
import { loadJuz } from "@/utils/loadJuz";

export default function HomePage() {
  const [chapters, setChapters] = useState([]);
  const [arabic, setArabic] = useState({});
  const [translation, setTranslation] = useState({});
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    order: "default",
    verses: "all",
    juz: "all",
  });
  const [juzList, setJuzList] = useState([]);

  // Load data
  useEffect(() => {
    console.log("arabic keys:", Object.keys(arabic));
    console.log("translation keys:", Object.keys(translation));
    (async () => {
      const loadedChapters = await loadChaptersMetas("en");
      const loadedTranslation = await loadTranslation("en");
      const loadedArabic = await loadQuran();
      const loadedJuz = await loadJuz(); // local JSON or API

      setChapters(loadedChapters);
      setArabic(loadedArabic);
      setTranslation(loadedTranslation);
      setJuzList(loadedJuz);

      if (loadedChapters.length > 0) {
        setSelectedSurah(loadedChapters[0]);
      }
    })();
  }, []);

  // Build displayedAyahs based on filters
  // Inside HomePage component
  let displayedAyahs = [];

  if (filters.juz === "all") {
    // Single Surah view
    if (selectedSurah) {
      const surahKey = String(selectedSurah.id); // ensure string
      displayedAyahs = [
        {
          surah: selectedSurah,
          ayahs: arabic[surahKey] || [],
          translation: translation[surahKey] || [],
        },
      ];
    }
  } else {
    // Juz view
    const juz = juzList.find((j) => j.index === filters.juz);
    if (juz) {
      const startSurahId = parseInt(juz.start.index, 10);
      const endSurahId = parseInt(juz.end.index, 10);

      for (let surahId = startSurahId; surahId <= endSurahId; surahId++) {
        const surahKey = String(surahId);
        const surahArabic = arabic[surahKey];
        const surahTr = translation[surahKey];
        const surahData = chapters.find((c) => String(c.id) === surahKey);

        if (!surahArabic || !surahTr || !surahData) {
          console.warn("Missing data for surah", surahId);
          continue;
        }

        let startVerse = 1;
        let endVerse = surahArabic.length;

        if (surahId === startSurahId) {
          startVerse = parseInt(
            String(juz.start.verse).replace("verse_", ""),
            10
          );
        }
        if (surahId === endSurahId) {
          endVerse = parseInt(String(juz.end.verse).replace("verse_", ""), 10);
        }

        displayedAyahs.push({
          surah: surahData,
          ayahs: surahArabic.slice(startVerse - 1, endVerse),
          translation: surahTr.slice(startVerse - 1, endVerse),
        });
      }
    }
  }

  // Filter chapters for sidebar (type/order/verses)
  const filteredChapters = chapters
    .filter((c) => {
      if (filters.type !== "all" && c.type !== filters.type) return false;

      if (filters.verses !== "all") {
        const verseCount = c.total_verses;
        if (filters.verses === "short" && verseCount > 50) return false;
        if (
          filters.verses === "medium" &&
          (verseCount <= 50 || verseCount > 100)
        )
          return false;
        if (filters.verses === "long" && verseCount <= 100) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.order === "revelation")
        return a.revelation_order - b.revelation_order;
      if (filters.order === "alphabetical")
        return a.transliteration.localeCompare(b.transliteration);
      return a.id - b.id;
    });

  return (
    <div className="home-page d-flex">
      <div className="home-main p-3">
        <SurahFilters
          filters={filters}
          setFilters={setFilters}
          juzList={juzList}
        />

        <SurahViewer displayedAyahs={displayedAyahs} />
      </div>

      {console.log("HomePAge selectedSurah:", selectedSurah)}
      <RightSidebar
        chapters={filteredChapters}
        selectedSurah={selectedSurah}
        onSelect={(id) => setSelectedSurah(chapters.find((c) => c.id === id))}
      />
    </div>
  );
}
