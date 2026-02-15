import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { US_STATES } from "../../assets/ds/us_states";

export default function OrganizationDrawer({ organization, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "nonprofit",
    phone: "",
    email: "",
    website: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    ein: "",
    tax_exempt_status: "501c3",
    tagline: "",
    description: "",
    is_active: 1,
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name || "",
        type: organization.type || "nonprofit",
        phone: organization.phone || "",
        email: organization.email || "",
        website: organization.website || "",
        street: organization.street || "",
        city: organization.city || "",
        state: organization.state || "",
        zip: organization.zip || "",
        ein: organization.ein || "",
        tax_exempt_status: organization.tax_exempt_status || "501c3",
        tagline: organization.tagline || "",
        description: organization.description || "",
        is_active: organization.is_active !== undefined ? organization.is_active : 1,
        status: organization.status || "active",
      });
    }
  }, [organization]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer drawer-large">
        <div className="drawer-header">
          <h2>{organization ? "Edit Organization" : "Create Organization"}</h2>
          <button className="drawer-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-content">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label htmlFor="name">
                Organization Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="nonprofit">Non-Profit</option>
                  <option value="mosque">Mosque</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tagline">Tagline</label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Brief tagline or slogan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Brief description of the organization"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h3>Contact Information</h3>

            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-section">
            <h3>Address</h3>

            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
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
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
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
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div className="form-section">
            <h3>Tax Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ein">EIN</label>
                <input
                  type="text"
                  id="ein"
                  name="ein"
                  value={formData.ein}
                  onChange={handleChange}
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tax_exempt_status">Tax Status</label>
                <select
                  id="tax_exempt_status"
                  name="tax_exempt_status"
                  value={formData.tax_exempt_status}
                  onChange={handleChange}
                >
                  <option value="501c3">501(c)(3)</option>
                  <option value="other">Other</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Status */}
          <div className="form-section">
            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active === 1}
                onChange={handleChange}
              />
              <label htmlFor="is_active">Active Organization</label>
            </div>
          </div>

          <div className="drawer-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : organization ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
