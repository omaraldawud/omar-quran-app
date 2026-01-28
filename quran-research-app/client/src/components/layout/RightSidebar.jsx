import SurahGrid from "@/components/SurahGrid";

export default function RightSidebar({ chapters, selectedSurah, onSelect }) {
  return (
    <aside className="home-surah-sidebar p-2">
      <SurahGrid
        chapters={chapters}
        onSelect={onSelect}
        selectedSurah={selectedSurah}
      />
    </aside>
  );
}
