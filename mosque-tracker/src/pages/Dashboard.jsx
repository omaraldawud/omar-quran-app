import { useState } from "react";
import mosques from "../assets/data/mosques.json";
import outreachSeed from "../assets/data/outreach_log.json";
import MasjidCard from "../components/layout/MasjidCard";
import LogActionModal from "../components/LogActionModal";
import { US_STATES } from "../assets/ds/us_states";
import "../assets/css/search-and-filter.css";

export default function Dashboard() {
  const [outreach, setOutreach] = useState(() => {
    const saved = localStorage.getItem("outreach");
    return saved ? JSON.parse(saved) : outreachSeed;
  });

  const [activeMasjidId, setActiveMasjidId] = useState(null);
  const [selectedState, setSelectedState] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSaveAction = ({ method, contact_name, notes, result, clerk }) => {
    const newEntry = {
      id: crypto.randomUUID(),
      masjid_id: activeMasjidId,
      method,
      contact_name,
      notes,
      result,
      clerk,
      timestamp: new Date().toISOString(),
    };

    setOutreach((prev) => {
      const updated = [...prev, newEntry];
      localStorage.setItem("outreach", JSON.stringify(updated));
      return updated;
    });
    setActiveMasjidId(null);
  };

  return (
    <>
      <div className="state-filter mb-4">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="ALL">All States</option>
          {US_STATES.map((s) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="🔍 Search masjid, city, phone, contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="masjid-search ms-4"
        />
      </div>

      {/* GRID */}
      <div className="masjid-grid">
        {mosques
          .filter((m) => {
            // state filter
            if (selectedState !== "ALL" && m.address?.state !== selectedState) {
              return false;
            }

            // search filter
            if (!searchTerm) return true;

            const q = searchTerm.toLowerCase();

            return (
              m.name?.toLowerCase().includes(q) ||
              m.address?.street?.toLowerCase().includes(q) ||
              m.address?.city?.toLowerCase().includes(q) ||
              m.contacts?.phone?.toLowerCase().includes(q) ||
              m.contacts?.contact_name?.toLowerCase().includes(q)
            );
          })
          .map((m) => {
            const masjidOutreach = outreach.filter(
              (o) => String(o.masjid_id) === String(m.id),
            );

            return (
              <MasjidCard
                key={m.id}
                masjid={m}
                outreachLog={masjidOutreach}
                onAddAction={(id) => setActiveMasjidId(id)}
              />
            );
          })}
      </div>

      {/* STEP 5: MODAL LIVES HERE */}
      {activeMasjidId && (
        <LogActionModal
          onSave={handleSaveAction}
          onClose={() => setActiveMasjidId(null)}
        />
      )}
    </>
  );
}
