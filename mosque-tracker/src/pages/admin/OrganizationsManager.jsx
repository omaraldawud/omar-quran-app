import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import DataTable from "../../components/admin/DataTable";
import OrganizationDrawer from "../../components/admin/OrganizationDrawer";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function OrganizationsManager({ onStatsUpdate }) {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, org: null });
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    filterOrganizations();
  }, [organizations, searchTerm, statusFilter]);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/register_organization.php?status=all`,
        { credentials: "include" },
      );
      const data = await res.json();
      setOrganizations(data || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrganizations = () => {
    let filtered = [...organizations];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (org) =>
          org.name?.toLowerCase().includes(term) ||
          org.email?.toLowerCase().includes(term) ||
          org.phone?.toLowerCase().includes(term),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((org) => org.status === statusFilter);
    }

    setFilteredOrgs(filtered);
  };

  const handleCreate = () => {
    setSelectedOrg(null);
    setDrawerOpen(true);
  };

  const handleEdit = (org) => {
    setSelectedOrg(org);
    setDrawerOpen(true);
  };

  const handleDelete = (org) => {
    setDeleteModal({ show: true, org });
  };

  const confirmDelete = async () => {
    const org = deleteModal.org;
    if (!org) return;

    setProcessingId(org.id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/organizations.php`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: org.id }),
        },
      );

      if (response.ok) {
        setOrganizations(organizations.filter((o) => o.id !== org.id));
        if (onStatsUpdate) onStatsUpdate();
      } else {
        alert("Failed to delete organization");
      }
    } catch (error) {
      console.error("Error deleting organization:", error);
      alert("An error occurred");
    } finally {
      setProcessingId(null);
      setDeleteModal({ show: false, org: null });
    }
  };

  const handleApprove = async (org) => {
    if (!confirm(`Approve organization: ${org.name}?`)) return;

    setProcessingId(org.id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/approve_organization.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ organization_id: org.id, action: "approve" }),
        },
      );

      if (response.ok) {
        fetchOrganizations();
        if (onStatsUpdate) onStatsUpdate();
      } else {
        alert("Failed to approve organization");
      }
    } catch (error) {
      console.error("Error approving organization:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleSave = async (formData) => {
    try {
      const method = selectedOrg ? "PUT" : "POST";
      const url = `${import.meta.env.VITE_API_BASE}/organizations.php`;

      const body = selectedOrg ? { ...formData, id: selectedOrg.id } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchOrganizations();
        setDrawerOpen(false);
        if (onStatsUpdate) onStatsUpdate();
      } else {
        alert("Failed to save organization");
      }
    } catch (error) {
      console.error("Error saving organization:", error);
      alert("An error occurred");
    }
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "type", label: "Type", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (org) => (
        <span className={`badge badge-${org.status}`}>
          {org.status || "pending"}
        </span>
      ),
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "is_active",
      label: "Active",
      render: (org) => (
        <span className={`status-dot ${org.is_active ? "active" : "inactive"}`}>
          {org.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      onClick: handleEdit,
      color: "#3b82f6",
    },
    {
      label: "Approve",
      icon: FaCheck,
      onClick: handleApprove,
      color: "#10b981",
      condition: (org) => org.status === "pending",
    },
    {
      label: "Delete",
      icon: FaTrash,
      onClick: handleDelete,
      color: "#ef4444",
    },
  ];

  return (
    <div className="manager-container">
      {/* Header */}
      <div className="manager-header">
        <div>
          <h1>Organizations</h1>
          <p className="manager-subtitle">
            Manage organizations and their settings
          </p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <FaPlus /> Create Organization
        </button>
      </div>

      {/* Filters */}
      <div className="manager-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FaFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredOrgs}
        columns={columns}
        actions={actions}
        loading={loading}
        emptyMessage="No organizations found"
        processingId={processingId}
      />

      {/* Drawer */}
      {drawerOpen && (
        <OrganizationDrawer
          organization={selectedOrg}
          onClose={() => setDrawerOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.show}
        title="Delete Organization"
        message={`Are you sure you want to delete "${deleteModal.org?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ show: false, org: null })}
        confirmText="Delete"
        confirmColor="#ef4444"
        processing={processingId === deleteModal.org?.id}
      />
    </div>
  );
}
