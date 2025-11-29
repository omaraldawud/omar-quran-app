import ayahIcon from "@/assets/images/ayah-icon-tr.png";
import "@/assets/css/surah-ayah.css";
import "@/assets/css/islamic-hr.css";

export default function SurahViewer({ surah, arabic, translation }) {
  // Guard: wait until surah and loaded data exist
  if (!surah || !arabic[surah.id] || !translation[surah.id]) {
    return <div>Loading Surah...</div>;
  }

  const versesAr = arabic[surah.id];
  const versesTr = translation[surah.id];

  // Generate direct mp3 URL (no API fetch, avoids CORS)
  const surahNumber = String(surah.id).padStart(3, "0");
  const audioUrl = `https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee//${surahNumber}.mp3`;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h2 className="fw-bold text-success">
            {surah.id}. {surah.transliteration}. {surah.name}
          </h2>
          <h3>
            <small className="text-secondary ms-2">({surah.translation})</small>
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
          </audio>{" "}
        </div>
      </div>
      <hr class="hr-elegant-islamic" />

      {/* Audio player */}

      {/* Verses */}
      {versesAr.map((verse, i) => (
        <div key={i} className="ayah-container mb-4 p-4 rounded my-5">
          <div className="ayah-content py-4 rounded">
            <div className="ayah-header">
              {/* Ayah number image */}
              <div className="ayah-number-wrapper">
                <img src={ayahIcon} alt="Ayah" className="ayah-icon" />
                <span className="ayah-number-text">{verse.verse}</span>
              </div>

              {/* Arabic text */}
              <div className="text-end fs-3 arabic-text">{verse.text}</div>
            </div>

            {/* Translation text */}
            <div className="translation-text mt-3">{versesTr[i].text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
