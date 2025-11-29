import { useEffect, useState } from "react";

import SurahViewer from "@/components/SurahViewer";
import SurahFilter from "@/components/SurahFilter";

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

  useEffect(() => {
    (async () => {
      const loadedChapters = await loadChaptersMetas("en");
      const loadedArabic = await loadQuran();
      const loadedTranslation = await loadTranslation("en");

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

  const filteredChapters = chapters.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.transliteration.toLowerCase().includes(term) ||
      c.translation.toLowerCase().includes(term) ||
      String(c.id) === term
    );
  });

  return (
    <div className="home-page d-flex">
      <div className="home-main p-3">
        <SurahFilter search={search} setSearch={setSearch} />

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
