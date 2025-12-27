import ayahIcon from "@/assets/images/ayah-icon-tr.png";
import "@/assets/css/surah-ayah.css";
import "@/assets/css/islamic-hr.css";

export default function SurahViewer({ displayedAyahs }) {
  // Guard: wait until data exists
  console.log("SurahViewer displayedAyahs:", displayedAyahs);
  if (!displayedAyahs || displayedAyahs.length === 0) {
    return <div>Loading Surah ...</div>;
  }

  return (
    <div>
      {displayedAyahs.map(({ surah, ayahs, translation }) => (
        <div key={surah.id}>
          {/* Surah header */}
          <div className="d-flex flex-column bg-success p-3 justify-content-start">
            <div>
              <h2 className="fw-bold text-light mt-4">
                {surah.id}. {surah.transliteration}. {surah.name}
              </h2>
              <h3>
                <small className="ms-2 text-dark">({surah.translation})</small>
              </h3>
            </div>
            <div
              className="justify-content-between"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div>
                <span className="surah-header me-2">Type: {surah.type}</span>
                <span className="surah-header">
                  Verses: {surah.total_verses}
                </span>
              </div>
              {/* Surah audio */}
              <div>
                <audio
                  controls
                  src={`https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee//${String(
                    surah.id
                  ).padStart(3, "0")}.mp3`}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>

          <hr className="hr-elegant-islamic" />

          {/* Ayahs */}
          {ayahs.map((verse, i) => (
            <div
              key={i}
              className="ayah-container bg-gradient mb-4 p-4 rounded my-5"
            >
              <div className="ayah-content py-4 rounded">
                <div className="ayah-header d-flex justify-content-between align-items-start">
                  <div
                    className="ayah-number-wrapper position-relative"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <img
                      src={ayahIcon}
                      alt="Ayah"
                      className="ayah-icon"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span className="ayah-number-text position-absolute top-50 start-50 translate-middle fw-bold">
                      {verse.verse}
                    </span>
                  </div>
                  <div className="text-end fs-3 arabic-text">{verse.text}</div>
                </div>
                <div className="translation-text text-dark mt-3">
                  {translation[i]?.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
