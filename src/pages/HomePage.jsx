import { useState, useEffect } from "react";

import SurahViewer from "@/components/SurahViewer";
import SurahGrid from "@/components/SurahGrid";
import SurahFilter from "@/components/SurahFilter";

export default function HomePage({ chapters, arabic, translation }) {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [search, setSearch] = useState("");

  // When chapters + verse data are loaded, show first surah
  useEffect(() => {
    if (
      chapters.length > 0 &&
      arabic[chapters[0].id] &&
      translation[chapters[0].id]
    ) {
      setSelectedSurah(chapters[0]);
    }
  }, [chapters, arabic, translation]);

  const handleSelect = (id) => {
    const surah = chapters.find((ch) => ch.id === id);
    setSelectedSurah(surah);
  };

  // Sidebar: search filter
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
      {/* Main content */}
      <div className="home-main p-3">
        <SurahFilter search={search} setSearch={setSearch} />

        {/* Surah Viewer */}
        <SurahViewer
          surah={selectedSurah}
          arabic={arabic}
          translation={translation}
        />
      </div>

      {/* Right sidebar */}
      <aside className="home-surah-sidebar p-2">
        <SurahGrid
          chapters={filteredChapters}
          onSelect={handleSelect}
          selectedSurah={selectedSurah}
        />
      </aside>
    </div>
  );
}
