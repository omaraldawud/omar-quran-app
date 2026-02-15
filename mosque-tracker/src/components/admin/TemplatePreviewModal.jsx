import { FaTimes } from "react-icons/fa";

export default function TemplatePreviewModal({ template, onClose }) {
  if (!template) return null;

  // Sample data for preview
  const sampleData = {
    masjid_name: "Islamic Center of Example City",
    contact_name: "Imam Muhammad",
    user_name: "John Smith",
    user_email: "john@organization.org",
    user_phone: "(555) 123-4567",
    "organization.name": "Example Organization",
    "organization.website": "https://example.org",
  };

  // Replace placeholders with sample data
  const previewSubject = template.subject.replace(
    /\{([^}]+)\}/g,
    (match, key) => sampleData[key] || match
  );

  const previewBody = template.body_html.replace(
    /\{([^}]+)\}/g,
    (match, key) => sampleData[key] || match
  );

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="preview-modal">
        <div className="modal-header">
          <h3>Template Preview: {template.name}</h3>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <div className="preview-section">
            <div className="preview-meta">
              <div className="meta-row">
                <strong>Purpose:</strong>
                <span>{template.purpose}</span>
              </div>
              <div className="meta-row">
                <strong>Subject:</strong>
                <span>{previewSubject}</span>
              </div>
              <div className="meta-row">
                <strong>Status:</strong>
                <span className={`badge ${template.is_active ? "badge-active" : "badge-inactive"}`}>
                  {template.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <div className="preview-divider"></div>

          <div className="preview-section">
            <h4>Email Body Preview</h4>
            <div className="preview-note">
              Note: This preview uses sample data. Actual emails will use real mosque and user information.
            </div>
            <div
              className="email-preview-content"
              dangerouslySetInnerHTML={{ __html: previewBody }}
            />
          </div>

          {template.body_text && (
            <>
              <div className="preview-divider"></div>
              <div className="preview-section">
                <h4>Plain Text Version</h4>
                <pre className="text-preview-content">{template.body_text}</pre>
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
