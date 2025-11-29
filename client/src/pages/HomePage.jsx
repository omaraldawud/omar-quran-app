import { useEffect, useState } from "react";

import SurahViewer from "@/components/SurahViewer";
import SurahFilters from "@/components/SurahFilters";

import { loadChaptersMetas } from "@/utils/loadChaptersMetas";
import { loadQuran } from "@/utils/loadQuran";
import { loadTranslation } from "@/utils/loadTranslation";
import RightSidebar from "../components/layout/RightSidebar";

export default function HomePage() {
  const [chapters, setChapters] = useState([]);
  const [arabic, setArabic] = useState({});
  const [translation, setTranslation] = useState({});
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    type: "all", // 'all', 'meccan', 'medinan'
    order: "default", // 'default', 'revelation', 'alphabetical'
    verses: "all", // 'all', 'short', 'medium', 'long'
  });

  useEffect(() => {
    (async () => {
      const loadedChapters = await loadChaptersMetas("en");
      const loadedTranslation = await loadTranslation("en");
      const loadedArabic = await loadQuran();

      setChapters(loadedChapters);
      setArabic(loadedArabic);
      setTranslation(loadedTranslation);

      if (
        loadedChapters.length > 0 &&
        loadedArabic[loadedChapters[0].id] &&
        loadedTranslation[loadedChapters[0].id]
      ) {
        setSelectedSurah(loadedChapters[0]);
      }
    })();
  }, []);

  const handleSelect = (id) => {
    const surah = chapters.find((ch) => ch.id === id);
    setSelectedSurah(surah);
  };

  const filteredChapters = chapters
    .filter((c) => {
      // Revelation type filter
      if (filters.type !== "all" && c.type !== filters.type) {
        return false;
      }

      // Verse length filter
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
      // Sort order
      if (filters.order === "revelation") {
        return a.revelation_order - b.revelation_order;
      }
      if (filters.order === "alphabetical") {
        return a.transliteration.localeCompare(b.transliteration);
      }
      return a.id - b.id; // default order
    });

  return (
    <div className="home-page d-flex">
      <div className="home-main p-3">
        <SurahFilters filters={filters} setFilters={setFilters} />

        <SurahViewer
          surah={selectedSurah}
          arabic={arabic}
          translation={translation}
        />
      </div>

      <RightSidebar
        chapters={filteredChapters}
        selectedSurah={selectedSurah}
        onSelect={handleSelect}
      />
    </div>
  );
}
