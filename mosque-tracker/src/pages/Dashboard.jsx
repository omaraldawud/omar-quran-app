import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import MasjidCard from "../components/layout/MasjidCard";
import LogActionModal from "../components/LogActionModal";
import OrganizationSidebar from "../components/layout/OrganizationSidebar";
import MosqueAdminSidebar from "../components/layout/MosqueAdminSidebar";
import { US_STATES } from "../assets/ds/us_states";
import "../assets/css/search-and-filter.css";

export default function Dashboard({
  currentUserId,
  organizationId,
  userRole,
  associatedMosqueId, // This comes from user.associated_mosque_id
  onNavigate,
}) {
  const [mosques, setMosques] = useState([]);
  const [outreach, setOutreach] = useState([]);
  const [activeMasjidId, setActiveMasjidId] = useState(null);
  const [selectedState, setSelectedState] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load mosques and outreach from API
  useEffect(() => {
    fetch("http://localhost/api/mosques.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Mosques loaded:", data);
        setMosques(data);
      })
      .catch(console.error);

    fetch("http://localhost/api/outreach.php", {
      credentials: "include",
    })
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
      user_id: currentUserId,
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
        credentials: "include",
        body: JSON.stringify(newEntry),
      });
      const savedEntry = await res.json();

      console.log("Saved entry:", savedEntry);

      // Append new entry to local state (add to beginning for newest first)
      setOutreach((prev) => [savedEntry, ...prev]);
      setActiveMasjidId(null);
    } catch (err) {
      console.error("Error saving outreach:", err);
    }
  };

  const handleEditMosque = (mosqueId) => {
    onNavigate("edit-mosque", mosqueId);
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
      m.contact_name?.toLowerCase().includes(q) ||
      m.website?.toLowerCase().includes(q) ||
      m.facebook?.toLowerCase().includes(q) ||
      m.whatsapp?.toLowerCase().includes(q)
    );
  });

  // Calculate statistics
  const totalOutreach = outreach.length;
  const mosquesWithOutreach = new Set(outreach.map((o) => o.mosque_id)).size;

  // Determine which sidebar to show based on role
  const showOrganizationSidebar =
    userRole === "organization_admin" && organizationId;
  const showMosqueSidebar = userRole === "mosque_admin" && associatedMosqueId;
  const showNoSidebar = userRole === "system_admin";

  // Debug logging
  console.log("Dashboard Props:", {
    userRole,
    organizationId,
    associatedMosqueId,
    showOrganizationSidebar,
    showMosqueSidebar,
    showNoSidebar,
  });

  return (
    <>
      {/* Main Dashboard Content */}
      <div
        className={`dashboard-with-sidebar ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${showNoSidebar ? "no-sidebar" : ""}`}
      >
        {/* STATE + SEARCH + STATS */}
        <div className="state-filter mb-4 d-flex align-items-center flex-wrap gap-3">
          <select
            className="pe-2 text-primary"
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
            className="masjid-search"
            style={{ flex: "1 1 300px" }}
          />

          {/* Summary Stats */}
          <div className="d-flex gap-2">
            <Badge bg="info" className="p-2">
              🕌 {filteredMosques.length} Total Mosques in {selectedState}:
            </Badge>
            <Badge bg="primary" className="p-2">
              📊 {totalOutreach} Total Outreach
            </Badge>
            <Badge bg="success" className="p-2">
              📊 {mosquesWithOutreach} Mosques Contacted
            </Badge>
          </div>
        </div>

        {/* MOSQUE GRID */}
        <div className="masjid-grid">
          {filteredMosques.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                gridColumn: "1 / -1",
                color: "#6c757d",
              }}
            >
              <h4>No mosques found</h4>
              <p>Try adjusting your filters or search term</p>
            </div>
          ) : (
            filteredMosques.map((m) => {
              const masjidOutreach = outreach.filter(
                (o) => String(o.mosque_id) === String(m.id),
              );

              return (
                <MasjidCard
                  key={m.id}
                  masjid={m}
                  outreachLog={masjidOutreach}
                  onAddAction={(id) => setActiveMasjidId(id)}
                  onEditMosque={handleEditMosque}
                  userRole={userRole}
                  userOrganizationId={organizationId}
                  userAssociatedMosqueId={associatedMosqueId}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Conditional Sidebar Based on Role */}
      {showOrganizationSidebar && (
        <OrganizationSidebar
          organizationId={organizationId}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {showMosqueSidebar && (
        <MosqueAdminSidebar
          mosqueId={associatedMosqueId}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onEditMosque={() => handleEditMosque(associatedMosqueId)}
        />
      )}

      {/* system_admin has NO SIDEBAR */}

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
