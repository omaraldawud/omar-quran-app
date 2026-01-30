import { useState, useEffect } from "react";
import { US_STATES } from "../assets/ds/us_states";
import "../assets/css/mosque-edit-form.css";

export default function MosqueEditForm({ mosqueId, userRole, onNavigate, onSuccess }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    facebook: "",
    whatsapp: "",
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
        `http://localhost/api/mosque_details.php?id=${mosqueId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch mosque details");
      }

      const data = await response.json();
      setFormData(data);
    } catch (err) {
      console.error("Error fetching mosque:", err);
      setError(err.message || "Failed to load mosque details");
      
      // If unauthorized, redirect back
      if (err.message.includes("permission")) {
        setTimeout(() => onNavigate("dashboard"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await fetch("http://localhost/api/mosque_details.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update mosque");
      }

      const result = await response.json();
      setSuccess(result.message);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(result.mosque);
      }

      // Navigate back after short delay
      setTimeout(() => {
        onNavigate("dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error updating mosque:", err);
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

  if (error && !formData.id) {
    return (
      <div className="mosque-edit-container">
        <div className="error-message-full">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => onNavigate("dashboard")} className="btn-back">
            Back to Dashboard
          </button>
        </div>
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

      <form onSubmit={handleSubmit} className="mosque-edit-form">
        {/* Basic Information */}
        <section className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="name">
              Mosque Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                id="state"
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
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="form-section">
          <h2>Contact Information</h2>

          <div className="form-group">
            <label htmlFor="contact_name">Contact Person Name</label>
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              value={formData.contact_name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact_email">Contact Email</label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                value={formData.contact_email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact_phone">Contact Phone</label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Online Presence */}
        <section className="form-section">
          <h2>Online Presence</h2>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
              placeholder="https://"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="facebook">Facebook URL</label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={formData.facebook || ""}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="whatsapp">WhatsApp Link</label>
              <input
                type="url"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp || ""}
                onChange={handleChange}
                placeholder="https://wa.me/..."
              />
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? "Saving..." : "💾 Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className="btn-cancel"
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
