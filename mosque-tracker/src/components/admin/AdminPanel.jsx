import { useState, useEffect } from "react";
import {
  FaMosque, // Mosque
  FaBuilding, // Organization
  FaHandsHelping, // Outreach
  FaUsers, // Users
  FaUserFriends, // Alternative for users
  FaGlobeAmericas, // Alternative for outreach
  FaCity, // Alternative for organizations
} from "react-icons/fa";

import "../../assets/css/admin-panel.css";
import "../../assets/css/admin-stats.css";

export default function AdminPanel() {
  const [pendingOrgs, setPendingOrgs] = useState([]);
  const [allOrgs, setAllOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [processingId, setProcessingId] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchOrganizations();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost/api/stats.php", {
        credentials: "include",
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      // Fetch pending organizations
      const pendingRes = await fetch(
        "http://localhost/api/register_organization.php?status=pending",
      );
      const pending = await pendingRes.json();
      setPendingOrgs(pending);

      // Fetch all organizations
      const allRes = await fetch(
        "http://localhost/api/register_organization.php?status=all",
      );
      const all = await allRes.json();
      setAllOrgs(all);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (orgId) => {
    if (!confirm("Are you sure you want to approve this organization?")) {
      return;
    }

    setProcessingId(orgId);
    try {
      const response = await fetch(
        "http://localhost/api/approve_organization.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organization_id: orgId,
            action: "approve",
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        fetchOrganizations();
      } else {
        alert(result.error || "Failed to approve organization");
      }
    } catch (error) {
      console.error("Error approving organization:", error);
      alert("An error occurred while approving the organization");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (orgId) => {
    if (
      !confirm(
        "Are you sure you want to reject this organization? This will permanently delete the registration.",
      )
    ) {
      return;
    }

    setProcessingId(orgId);
    try {
      const response = await fetch(
        "http://localhost/api/approve_organization.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organization_id: orgId,
            action: "reject",
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        fetchOrganizations();
      } else {
        alert(result.error || "Failed to reject organization");
      }
    } catch (error) {
      console.error("Error rejecting organization:", error);
      alert("An error occurred while rejecting the organization");
    } finally {
      setProcessingId(null);
    }
  };

  const renderOrganizationCard = (org, isPending = false) => (
    <div key={org.id} className="org-card">
      <div className="org-header">
        <div>
          <h3>{org.name}</h3>
          <span className={`org-type-badge ${org.type}`}>
            {org.type === "nonprofit" ? "Non-Profit" : org.type}
          </span>
          {!isPending && (
            <span
              className={`status-badge ${org.is_active ? "active" : "inactive"}`}
            >
              {org.is_active ? "Active" : "Inactive"}
            </span>
          )}
        </div>
        {isPending && (
          <div className="org-date">
            Registered: {new Date(org.created_at).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="org-details">
        <div className="detail-row">
          <strong>📧 Email:</strong> {org.email}
        </div>
        {org.phone && (
          <div className="detail-row">
            <strong>📞 Phone:</strong> {org.phone}
          </div>
        )}
        {org.website && (
          <div className="detail-row">
            <strong>🌐 Website:</strong>{" "}
            <a href={org.website} target="_blank" rel="noreferrer">
              {org.website}
            </a>
          </div>
        )}
        {org.street && (
          <div className="detail-row">
            <strong>📍 Address:</strong> {org.street}, {org.city}, {org.state}{" "}
            {org.zip}
          </div>
        )}
        {org.ein && (
          <div className="detail-row">
            <strong>EIN:</strong> {org.ein}
          </div>
        )}
        {org.tax_exempt_status && (
          <div className="detail-row">
            <strong>Tax Status:</strong> {org.tax_exempt_status}
          </div>
        )}
      </div>

      {isPending && (
        <div className="org-actions">
          <button
            className="btn-approve"
            onClick={() => handleApprove(org.id)}
            disabled={processingId === org.id}
          >
            {processingId === org.id ? "Processing..." : "✅ Approve"}
          </button>
          <button
            className="btn-reject"
            onClick={() => handleReject(org.id)}
            disabled={processingId === org.id}
          >
            {processingId === org.id ? "Processing..." : "❌ Reject"}
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="loading">Loading organizations...</div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-stats">
        {!stats ? (
          <p>Loading stats...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <FaMosque size={24} className="text-success me-2 mb-2" />
              <h2>{stats.total_mosques}</h2>
              <span>Mosques</span>
            </div>

            <div className="stat-card">
              <FaCity size={24} className="text-success me-2 mb-2" />
              <h2>{stats.total_organizations}</h2>
              <span>Organizations</span>
            </div>

            <div className="stat-card">
              <FaGlobeAmericas size={24} className="text-success me-2 mb-2" />
              <h2>{stats.total_outreach}</h2>
              <span>Total Outreach</span>
            </div>

            <div className="stat-card">
              <FaUserFriends size={24} className="text-success me-2 mb-2" />
              <h2>{stats.total_users}</h2>
              <span>Users</span>
            </div>
          </div>
        )}
      </div>

      <div className="admin-header">
        <h1>Organization Management</h1>
        <p>Review and approve organization registrations</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Approvals
          {pendingOrgs.length > 0 && (
            <span className="badge">{pendingOrgs.length}</span>
          )}
        </button>
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Organizations
          <span className="badge">{allOrgs.length}</span>
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "pending" && (
          <div className="org-list">
            {pendingOrgs.length === 0 ? (
              <div className="empty-state">
                <p>No pending organization registrations</p>
              </div>
            ) : (
              pendingOrgs.map((org) => renderOrganizationCard(org, true))
            )}
          </div>
        )}

        {activeTab === "all" && (
          <div className="org-list">
            {allOrgs.length === 0 ? (
              <div className="empty-state">
                <p>No organizations found</p>
              </div>
            ) : (
              allOrgs.map((org) => renderOrganizationCard(org, false))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
