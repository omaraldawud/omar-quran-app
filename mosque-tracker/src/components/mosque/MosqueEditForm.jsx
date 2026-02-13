import { useState, useEffect } from "react";
import { US_STATES } from "../../assets/ds/us_states";
import "../../assets/css/mosque-edit-form.css";

export default function MosqueEditForm({ mosqueId, onNavigate, onSuccess }) {
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState({
    id: "",
    parent_organization_id: "",
    name: "",
    is_outreach_enabled: 1,
    is_verified: 1,

    street: "",
    city: "",
    state: "",
    zip: "",

    contact_name: "",
    contact_email: "",
    contact_phone: "",

    phone: "",
    email: "",

    website: "",
    facebook: "",
    whatsapp: "",
    youtube: "",
    logo_url: "",
    donation_url: "",
    jumuah_schedule_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!mosqueId) {
      setError("No mosque ID provided");
      setLoading(false);
      return;
    }
    fetchMosqueDetails();
  }, [mosqueId]);

  const fetchMosqueDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/mosque_details.php?id=${mosqueId}`,
        { credentials: "include" },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch mosque details");
      }

      setFormData((prev) => ({
        ...prev,
        ...data,
        is_verified: Number(data.is_verified ?? 1),
        is_outreach_enabled: Number(data.is_outreach_enabled ?? 1),
      }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load mosque details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/mosque_details.php`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update mosque");
      }

      setSuccess(result.message || "Mosque updated successfully");

      if (onSuccess) onSuccess(result.mosque);

      setTimeout(() => {
        onNavigate("dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update mosque");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mosque-edit-container">
        <div className="loading-message">Loading mosque details...</div>
      </div>
    );
  }

  return (
    <div className="mosque-edit-container">
      <div className="mosque-edit-header">
        <h1>Edit Mosque</h1>
        <p>Update mosque information and contact details</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Tabs */}
      <div className="form-tabs">
        {[
          { key: "basic", label: "Basic Info" },
          { key: "address", label: "Address" },
          { key: "contact", label: "Contact Person" },
          { key: "mosque", label: "Mosque Contact" },
          { key: "online", label: "Online & Media" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mosque-edit-form">
        {/* BASIC */}
        {activeTab === "basic" && (
          <section className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label>Mosque Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Parent Organization ID</label>
              <input
                type="number"
                name="parent_organization_id"
                value={formData.parent_organization_id || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label>
                <input
                  type="checkbox"
                  name="is_verified"
                  checked={!!formData.is_verified}
                  onChange={handleChange}
                />
                Verified
              </label>

              <label>
                <input
                  type="checkbox"
                  name="is_outreach_enabled"
                  checked={!!formData.is_outreach_enabled}
                  onChange={handleChange}
                />
                Outreach Enabled
              </label>
            </div>
          </section>
        )}

        {/* ADDRESS */}
        {activeTab === "address" && (
          <section className="form-section">
            <h2>Address</h2>

            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <select
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {US_STATES.map((s) => (
                    <option key={s.abbreviation} value={s.abbreviation}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>ZIP</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>
        )}

        {/* CONTACT PERSON */}
        {activeTab === "contact" && (
          <section className="form-section">
            <h2>Contact Person</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                name="contact_email"
                placeholder="Email"
                value={formData.contact_email || ""}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="contact_phone"
                placeholder="Phone"
                value={formData.contact_phone || ""}
                onChange={handleChange}
              />
            </div>
          </section>
        )}

        {/* MOSQUE CONTACT */}
        {activeTab === "mosque" && (
          <section className="form-section">
            <h2>Mosque Contact</h2>

            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Main Phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Main Email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
          </section>
        )}

        {/* ONLINE */}
        {activeTab === "online" && (
          <section className="form-section">
            <h2>Online & Media</h2>

            {[
              "website",
              "facebook",
              "whatsapp",
              "youtube",
              "donation_url",
              "jumuah_schedule_url",
              "logo_url",
            ].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.replaceAll("_", " ").toUpperCase()}</label>
                <input
                  type="url"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          </section>
        )}

        <div className="form-actions">
          <button type="submit" disabled={saving} className="btn-save">
            {saving ? "Saving..." : "💾 Save Changes"}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => onNavigate("dashboard")}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
