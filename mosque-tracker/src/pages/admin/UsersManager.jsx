import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaKey,
} from "react-icons/fa";
import DataTable from "../../components/admin/DataTable";
import UserDrawer from "../../components/admin/UserDrawer";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, user: null });
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchOrganizations();
    fetchMosques();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/users.php`, {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/register_organization.php?status=all`,
        { credentials: "include" },
      );
      const data = await res.json();
      setOrganizations(data || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const fetchMosques = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/mosques.php`, {
        credentials: "include",
      });
      const data = await res.json();
      setMosques(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching mosques:", error);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.user_name?.toLowerCase().includes(term) ||
          user.user_email?.toLowerCase().includes(term) ||
          user.user_phone?.toLowerCase().includes(term),
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setDrawerOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDelete = (user) => {
    setDeleteModal({ show: true, user });
  };

  const confirmDelete = async () => {
    const user = deleteModal.user;
    if (!user) return;

    setProcessingId(user.id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/users.php`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: user.id }),
        },
      );

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== user.id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred");
    } finally {
      setProcessingId(null);
      setDeleteModal({ show: false, user: null });
    }
  };

  const handleSave = async (formData) => {
    try {
      const method = selectedUser ? "PUT" : "POST";
      const url = `${import.meta.env.VITE_API_BASE}/users.php`;

      const body = selectedUser
        ? { ...formData, id: selectedUser.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchUsers();
        setDrawerOpen(false);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to save user");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred");
    }
  };

  const getOrganizationName = (orgId) => {
    const org = organizations.find((o) => o.id === orgId);
    return org?.name || "—";
  };

  const getMosqueName = (mosqueId) => {
    const mosque = mosques.find((m) => m.id === mosqueId);
    return mosque?.name || "—";
  };

  const columns = [
    { key: "user_name", label: "Name", sortable: true },
    { key: "user_email", label: "Email", sortable: true },
    { key: "user_phone", label: "Phone" },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (user) => (
        <span className={`badge badge-${user.role}`}>
          {user.role?.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "organization_id",
      label: "Organization",
      render: (user) => getOrganizationName(user.organization_id),
    },
    {
      key: "associated_mosque_id",
      label: "Mosque",
      render: (user) => getMosqueName(user.associated_mosque_id),
    },
    {
      key: "is_active",
      label: "Status",
      render: (user) => (
        <span
          className={`status-dot ${user.is_active ? "active" : "inactive"}`}
        >
          {user.is_active ? "Active" : "Inactive"}
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
          <h1>Users</h1>
          <p className="manager-subtitle">
            Manage system users and their permissions
          </p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <FaPlus /> Create User
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
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="system_admin">System Admin</option>
            <option value="organization_admin">Organization Admin</option>
            <option value="mosque_admin">Mosque Admin</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        actions={actions}
        loading={loading}
        emptyMessage="No users found"
        processingId={processingId}
      />

      {/* Drawer */}
      {drawerOpen && (
        <UserDrawer
          user={selectedUser}
          organizations={organizations}
          mosques={mosques}
          onClose={() => setDrawerOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.show}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteModal.user?.user_name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ show: false, user: null })}
        confirmText="Delete"
        confirmColor="#ef4444"
        processing={processingId === deleteModal.user?.id}
      />
    </div>
  );
}
