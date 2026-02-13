import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import { FaMosque, FaChartPie, FaChartLine } from "react-icons/fa";

import MasjidCard from "../components/mosque/MasjidCard";
import LogActionModal from "../components/outreach/LogActionModal";
import OrganizationSidebar from "../components/organization/OrganizationSidebar";
import MosqueAdminSidebar from "../components/mosque/MosqueAdminSidebar";
import { US_STATES } from "../assets/ds/us_states";
import "../assets/css/search-and-filter.css";

export default function Dashboard({
  user, // full user object — passed down to MasjidCard for email flow
  currentUserId,
  organizationId,
  userRole,
  associatedMosqueId, // This comes from user.associated_mosque_id
  onNavigate,
}) {
  const [mosques, setMosques] = useState([]);
  const [outreach, setOutreach] = useState([]);
  const [activeMasjidId, setActiveMasjidId] = useState(null);
  const [selectedState, setSelectedState] = useState("ALL STATES");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  // Load mosques and outreach from API
  useEffect(() => {
    fetch("https://hostitwise.net/qt/api/mosques.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Mosques loaded:", data);
        setMosques(data);
      })
      .catch(console.error);

    fetch("https://hostitwise.net/qt/api/outreach.php", {
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

  //fetch email templates:
  useEffect(() => {
    fetch("https://hostitwise.net/qt/api/email_templates.php", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch templates");
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.templates)) {
          setTemplates(data.templates);
        } else {
          setTemplates([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching templates:", err);
        setTemplates([]);
      })
      .finally(() => setLoadingTemplates(false));
  }, []);

  const handleSaveAction = async (formData) => {
    if (!activeMasjidId) return;

    const newEntry = {
      mosque_id: activeMasjidId,
      user_id: currentUserId,
      ...formData,
    };

    try {
      const res = await fetch("https://hostitwise.net/qt/api/outreach.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newEntry),
      });

      const savedEntry = await res.json();
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
    if (selectedState !== "ALL STATES" && m.state !== selectedState)
      return false;
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
      m.whatsapp?.toLowerCase().includes(q) ||
      m.youtube?.toLowerCase().includes(q)
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
            <option value="ALL STATES">All States</option>
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
            className="masjid-search me-3"
            style={{ flex: "1 1 300px" }}
          />

          {/* Summary Stats */}
          <div className="d-flex gap-2">
            <Badge className="my-light-gray p-2">
              <FaMosque
                size={24}
                className="top-negative-12 text-gray-700 me-2"
              />
              <span className="text-warning fs-5">
                {filteredMosques.length}
              </span>{" "}
              Total Mosques in: {selectedState}
            </Badge>
            <Badge className="my-light-gray p-2">
              <FaChartLine
                size={24}
                className="top-negative-12 text-blue-600 me-2"
              />
              <span className="text-warning fs-5">{totalOutreach}</span> Total
              Outreach
            </Badge>
            <Badge className="my-light-gray p-2">
              <FaChartPie
                size={24}
                className="top-negative-12 text-blue-600 me-2"
              />
              <span className="text-warning fs-5">{mosquesWithOutreach}</span>{" "}
              Mosques Contacted
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
                  user={user}
                  templates={templates}
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
