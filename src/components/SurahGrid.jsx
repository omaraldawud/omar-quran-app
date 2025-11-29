import "@/assets/css/surah-grid.css";

export default function SurahGrid({ chapters, onSelect, selectedSurah }) {
  return (
    <div className="surah-grid">
      {chapters.map((ch) => (
        <button
          key={ch.id}
          className={`surah-btn ${selectedSurah?.id === ch.id ? "active" : ""}`}
          onClick={() => onSelect(ch.id)}
        >
          <div className="surah-number">{ch.id}</div>
          <div className="surah-info">
            <div className="surah-name">{ch.transliteration}</div>
            <div className="surah-translation">{ch.translation}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
