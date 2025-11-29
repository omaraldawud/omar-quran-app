import ayahIcon from "@/assets/images/ayah-icon-tr.png";
import "@/assets/css/surah-ayah.css";
import "@/assets/css/islamic-hr.css";
import quranBg from "@/assets/images/quran-bg.jpeg";

export default function SurahViewer({ surah, arabic, translation }) {
  // Guard: wait until surah and loaded data exist
  if (!surah || !arabic[surah.id] || !translation[surah.id]) {
    return <div>Loading Surah...</div>;
  }

  const versesAr = arabic[surah.id];
  const versesTr = translation[surah.id];

  // Direct mp3 URL for Surah (no fetch)
  const surahNumber = String(surah.id).padStart(3, "0");
  const audioUrl = `https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee//${surahNumber}.mp3`;

  return (
    <div>
      <div className="d-flex flex-column justify-content-between">
        <div>
          <h2 className="fw-bold text-dark mt-4">
            {surah.id}. {surah.transliteration}. {surah.name}
          </h2>
          <h3>
            <small className="ms-2 text-primary">({surah.translation})</small>
          </h3>
        </div>
        <div
          className="mb-3"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span className="surah-header">Type: {surah.type}</span>
          <span className="surah-header">Verses: {surah.total_verses}</span>
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <hr className="hr-elegant-islamic" />

      {versesAr.map((verse, i) => (
        <div
          key={i}
          className="ayah-container bg-gradient mb-4 p-4 rounded my-5"
        >
          <div className="ayah-content py-4 rounded">
            <div className="ayah-header">
              <div className="ayah-number-wrapper">
                <img
                  src={ayahIcon}
                  alt="Ayah"
                  className="ayah-icon"
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="ayah-number-text">{verse.verse}</span>
              </div>
              <div className="text-end fs-3 arabic-text">{verse.text}</div>
            </div>
            <div className="translation-text mt-3">{versesTr[i].text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
