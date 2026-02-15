import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEye,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import DataTable from "../../components/admin/DataTable";
import TemplateDrawer from "../../components/admin/TemplateDrawer";
import TemplatePreviewModal from "../../components/admin/TemplatePreviewModal";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function EmailTemplatesManager() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewModal, setPreviewModal] = useState({
    show: false,
    template: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    template: null,
  });
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/email_templates.php`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.templates)) {
        setTemplates(data.templates);
      } else {
        setTemplates([]);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = [...templates];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (template) =>
          template.name?.toLowerCase().includes(term) ||
          template.purpose?.toLowerCase().includes(term) ||
          template.subject?.toLowerCase().includes(term),
      );
    }

    setFilteredTemplates(filtered);
  };

  const handleCreate = () => {
    setSelectedTemplate(null);
    setDrawerOpen(true);
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setDrawerOpen(true);
  };

  const handlePreview = (template) => {
    setPreviewModal({ show: true, template });
  };

  const handleDelete = (template) => {
    setDeleteModal({ show: true, template });
  };

  const confirmDelete = async () => {
    const template = deleteModal.template;
    if (!template) return;

    setProcessingId(template.id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/email_templates.php`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: template.id }),
        },
      );

      const result = await response.json();

      if (result.success) {
        setTemplates(templates.filter((t) => t.id !== template.id));
      } else {
        alert(result.message || "Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("An error occurred");
    } finally {
      setProcessingId(null);
      setDeleteModal({ show: false, template: null });
    }
  };

  const handleToggleActive = async (template) => {
    setProcessingId(template.id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/email_templates.php`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id: template.id,
            is_active: template.is_active ? 0 : 1,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        fetchTemplates();
      } else {
        alert(result.message || "Failed to update template");
      }
    } catch (error) {
      console.error("Error toggling template:", error);
      alert("An error occurred");
    } finally {
      setProcessingId(null);
    }
  };

  const handleSave = async (formData) => {
    try {
      const method = selectedTemplate ? "PUT" : "POST";
      const url = `${import.meta.env.VITE_API_BASE}/email_templates.php`;

      const body = selectedTemplate
        ? { ...formData, id: selectedTemplate.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        fetchTemplates();
        setDrawerOpen(false);
      } else {
        alert(result.message || "Failed to save template");
      }
    } catch (error) {
      console.error("Error saving template:", error);
      alert("An error occurred");
    }
  };

  const columns = [
    { key: "name", label: "Template Name", sortable: true },
    { key: "purpose", label: "Purpose", sortable: true },
    {
      key: "subject",
      label: "Subject",
      render: (template) => (
        <span className="text-truncate" style={{ maxWidth: "300px" }}>
          {template.subject}
        </span>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      render: (template) => (
        <span
          className={`status-dot ${template.is_active ? "active" : "inactive"}`}
        >
          {template.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "version",
      label: "Version",
      render: (template) => (
        <span className="badge badge-info">v{template.version}</span>
      ),
    },
  ];

  const actions = [
    {
      label: "Preview",
      icon: FaEye,
      onClick: handlePreview,
      color: "#8b5cf6",
    },
    {
      label: "Edit",
      icon: FaEdit,
      onClick: handleEdit,
      color: "#3b82f6",
    },
    {
      label: (template) => (template.is_active ? "Deactivate" : "Activate"),
      icon: (template) => (template.is_active ? FaToggleOff : FaToggleOn),
      onClick: handleToggleActive,
      color: (template) => (template.is_active ? "#f59e0b" : "#10b981"),
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
          <h1>Email Templates</h1>
          <p className="manager-subtitle">
            Manage email templates for outreach campaigns
          </p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <FaPlus /> Create Template
        </button>
      </div>

      {/* Search */}
      <div className="manager-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, purpose, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredTemplates}
        columns={columns}
        actions={actions}
        loading={loading}
        emptyMessage="No email templates found"
        processingId={processingId}
      />

      {/* Drawer */}
      {drawerOpen && (
        <TemplateDrawer
          template={selectedTemplate}
          onClose={() => setDrawerOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Preview Modal */}
      {previewModal.show && (
        <TemplatePreviewModal
          template={previewModal.template}
          onClose={() => setPreviewModal({ show: false, template: null })}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.show}
        title="Delete Template"
        message={`Are you sure you want to delete "${deleteModal.template?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ show: false, template: null })}
        confirmText="Delete"
        confirmColor="#ef4444"
        processing={processingId === deleteModal.template?.id}
      />
    </div>
  );
}
