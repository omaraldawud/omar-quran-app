import ayahIcon from "@/assets/images/ayah-icon-tr.png";

export default function JuzViewer({ juz, arabic, translation, chapters }) {
  if (!juz || !arabic || !translation) return <div>Loading Juz...</div>;

  // Collect all verses in order
  const verses = [];

  Object.entries(juz.verse_mapping).forEach(([surahId, range]) => {
    const [start, end] = range.split("-").map(Number);
    const surahArabic = arabic[surahId];
    const surahTranslation = translation[surahId];
    const surah = chapters.find((ch) => ch.id === Number(surahId));

    for (let v = start; v <= end; v++) {
      verses.push({
        surah,
        verseNumber: v,
        arabic: surahArabic[v - 1]?.text || "",
        translation: surahTranslation[v - 1]?.text || "",
      });
    }
  });

  return (
    <div>
      <h2 className="fw-bold text-success">
        Juz {juz.juz_number} — {juz.name || ""}
      </h2>
      <hr className="w-50" />

      {verses.map((verse, i) => (
        <div
          key={i}
          className="mb-4 p-4 rounded my-5"
          style={{
            background: `
              radial-gradient(circle at 10% 20%, rgba(1, 87, 155, 0.03) 0%, transparent 20%),
              radial-gradient(circle at 90% 80%, rgba(0, 109, 91, 0.03) 0%, transparent 20%),
              linear-gradient(135deg, #f8f5f0 0%, #f0e6d6 100%)
            `,
            border: "1px solid #e0d0b8",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            position: "relative",
          }}
        >
          <div
            className="py-4 rounded"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(222, 184, 135, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {/* Ayah number image */}
              <div
                className="ayah-number-wrapper"
                style={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  flexShrink: 0,
                }}
              >
                <img
                  src={ayahIcon}
                  alt="Ayah"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {verse.verseNumber}
                </span>
              </div>

              {/* Arabic text */}
              <div className="text-end fs-3 arabic-text" style={{ flex: 1 }}>
                {verse.arabic}
              </div>
            </div>

            {/* Translation text */}
            <div
              className="mt-3 text-muted"
              style={{ color: "#4a5568", lineHeight: "1.6" }}
            >
              {verse.translation}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
