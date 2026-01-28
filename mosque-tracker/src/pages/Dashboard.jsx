import { useState, useEffect } from "react";
import MasjidCard from "../components/layout/MasjidCard";
import OutreachTable from "../components/OutreachTable";

import LogActionModal from "../components/LogActionModal";
import { US_STATES } from "../assets/ds/us_states";
import "../assets/css/search-and-filter.css";

export default function Dashboard({ currentUserId }) {
  const [mosques, setMosques] = useState([]);
  const [outreach, setOutreach] = useState([]);
  const [activeMasjidId, setActiveMasjidId] = useState(null);
  const [selectedState, setSelectedState] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Load mosques and outreach from API
  useEffect(() => {
    fetch("http://localhost/api/mosques.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Mosques loaded:", data);
        setMosques(data);
      })
      .catch(console.error);

    fetch("http://localhost/api/outreach.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Outreach data loaded:", data);
        setOutreach(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error loading outreach:", err);
        setOutreach([]);
      });
  }, []);

  const handleSaveAction = async ({
    method,
    contacted_person_name,
    contacted_person_phone,
    contacted_person_email,
    notes,
    result,
  }) => {
    if (!activeMasjidId) return;

    const newEntry = {
      mosque_id: activeMasjidId,
      user_id: currentUserId, // logged-in clerk
      method,
      contacted_person_name,
      contacted_person_phone,
      contacted_person_email,
      notes,
      result,
    };

    try {
      const res = await fetch("http://localhost/api/outreach.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      const savedEntry = await res.json();

      console.log("Saved entry:", savedEntry);

      // Append new entry to local state
      setOutreach((prev) => [savedEntry, ...prev]);
      setActiveMasjidId(null);
    } catch (err) {
      console.error("Error saving outreach:", err);
    }
  };

  // Filtered mosques by state and search term
  const filteredMosques = mosques.filter((m) => {
    if (selectedState !== "ALL" && m.state !== selectedState) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.street?.toLowerCase().includes(q) ||
      m.city?.toLowerCase().includes(q) ||
      m.contact_phone?.toLowerCase().includes(q) ||
      m.contact_name?.toLowerCase().includes(q)
    );
  });

  console.log("Rendering Dashboard - Outreach count:", outreach.length);

  return (
    <>
      {/* STATE + SEARCH */}
      <div className="state-filter mb-4 d-flex align-items-center">
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

      {/* MOSQUE GRID */}
      <div className="masjid-grid">
        {filteredMosques.map((m) => {
          const masjidOutreach = outreach.filter(
            (o) => String(o.mosque_id) === String(m.id),
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

      {/* ALL OUTREACH LOGS TABLE - Always render this section */}
      <div
        className="mt-5 mb-5"
        style={{
          width: "100%",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3 className="mb-3">📊 All Outreach Logs ({outreach.length} total)</h3>
        <OutreachTable outreachLog={outreach} />
      </div>

      {/* LOG MODAL */}
      {activeMasjidId && (
        <LogActionModal
          onSave={handleSaveAction}
          onClose={() => setActiveMasjidId(null)}
        />
      )}
    </>
  );
}
