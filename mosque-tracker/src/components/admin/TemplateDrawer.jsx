import { useState, useEffect } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";

export default function TemplateDrawer({ template, onClose, onSave }) {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    purpose: "",
    subject: "",
    body_html: "",
    body_text: "",
    placeholders: [],
    is_active: 1,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Common placeholders that can be used
  const availablePlaceholders = [
    { value: "{masjid_name}", description: "Mosque name" },
    { value: "{contact_name}", description: "Contact person name" },
    { value: "{user_name}", description: "Your name" },
    { value: "{user_email}", description: "Your email" },
    { value: "{user_phone}", description: "Your phone" },
    { value: "{organization.name}", description: "Organization name" },
    { value: "{organization.website}", description: "Organization website" },
  ];

  useEffect(() => {
    if (template) {
      setFormData({
        slug: template.slug || "",
        name: template.name || "",
        purpose: template.purpose || "",
        subject: template.subject || "",
        body_html: template.body_html || "",
        body_text: template.body_text || "",
        placeholders:
          typeof template.placeholders === "string"
            ? JSON.parse(template.placeholders || "[]")
            : template.placeholders || [],
        is_active: template.is_active !== undefined ? template.is_active : 1,
      });
    }
  }, [template]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
    // Auto-generate slug from name if creating new template
    if (name === "name" && !template) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const insertPlaceholder = (placeholder, field) => {
    const textarea = document.getElementById(field);
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData[field];
      const before = text.substring(0, start);
      const after = text.substring(end);
      
      setFormData((prev) => ({
        ...prev,
        [field]: before + placeholder + after,
      }));

      // Set cursor position after the inserted placeholder
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + placeholder.length;
        textarea.focus();
      }, 0);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Template name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.body_html.trim()) {
      newErrors.body_html = "Email body is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);
    try {
      // Extract placeholders from body_html
      const placeholderRegex = /\{([^}]+)\}/g;
      const matches = [...formData.body_html.matchAll(placeholderRegex)];
      const extractedPlaceholders = [...new Set(matches.map((m) => m[1]))];

      const submitData = {
        ...formData,
        placeholders: JSON.stringify(extractedPlaceholders),
      };

      await onSave(submitData);
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
          <h2>{template ? "Edit Template" : "Create Template"}</h2>
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
                Template Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder="e.g., Khutbah Request"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="slug">
                  Slug <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={errors.slug ? "error" : ""}
                  placeholder="khutbah-request"
                  disabled={!!template} // Don't allow changing slug on edit
                />
                {errors.slug && <span className="error-message">{errors.slug}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="purpose">
                  Purpose <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={errors.purpose ? "error" : ""}
                  placeholder="e.g., Initial Contact"
                />
                {errors.purpose && (
                  <span className="error-message">{errors.purpose}</span>
                )}
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="form-section">
            <h3>Email Content</h3>

            <div className="form-group">
              <label htmlFor="subject">
                Subject Line <span className="required">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "error" : ""}
                placeholder="Subject of the email"
              />
              {errors.subject && (
                <span className="error-message">{errors.subject}</span>
              )}
              <div className="field-help">
                <FaInfoCircle /> You can use placeholders like {"{masjid_name}"} in the
                subject
              </div>
            </div>

            {/* Placeholder Helper */}
            <div className="placeholder-helper">
              <label>Available Placeholders (click to insert):</label>
              <div className="placeholder-tags">
                {availablePlaceholders.map((ph) => (
                  <button
                    key={ph.value}
                    type="button"
                    className="placeholder-tag"
                    onClick={() => insertPlaceholder(ph.value, "body_html")}
                    title={ph.description}
                  >
                    {ph.value}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="body_html">
                Email Body (HTML) <span className="required">*</span>
              </label>
              <textarea
                id="body_html"
                name="body_html"
                value={formData.body_html}
                onChange={handleChange}
                className={errors.body_html ? "error" : ""}
                rows="15"
                placeholder="<p>Your email content here...</p>"
              />
              {errors.body_html && (
                <span className="error-message">{errors.body_html}</span>
              )}
              <div className="field-help">
                <FaInfoCircle /> Use HTML for formatting. Placeholders will be
                automatically replaced when sending.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="body_text">Plain Text Version (Optional)</label>
              <textarea
                id="body_text"
                name="body_text"
                value={formData.body_text}
                onChange={handleChange}
                rows="8"
                placeholder="Plain text version for email clients that don't support HTML"
              />
            </div>
          </div>

          {/* Status */}
          <div className="form-section">
            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active === 1}
                onChange={handleChange}
              />
              <label htmlFor="is_active">Active Template</label>
              <p className="checkbox-help">
                Inactive templates won't be available for use in campaigns
              </p>
            </div>
          </div>

          <div className="drawer-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : template ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
