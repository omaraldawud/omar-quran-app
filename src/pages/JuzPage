import JuzViewer from "@/components/JuzViewer";

export default function JuzPage({
  juzId,
  juzList,
  arabic,
  translation,
  chapters,
}) {
  if (!juzList || juzList.length === 0) return <div>Loading Juz...</div>;

  const juz = juzList.find((j) => j.juz_number === Number(juzId));
  if (!juz) return <div>Juz not found</div>;

  return (
    <JuzViewer
      juz={juz}
      arabic={arabic}
      translation={translation}
      chapters={chapters}
    />
  );
}
