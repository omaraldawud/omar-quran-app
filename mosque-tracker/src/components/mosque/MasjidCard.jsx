import { useState } from "react";
import { Badge } from "react-bootstrap";
import MasjidBadges from "./MasjidBadges";
import OutreachHistory from "../outreach/OutreachHistory";
import { useMasjidPermissions } from "../../hooks/useMasjidPermissions";
import EmailPreviewModal from "../email-templates/EmailPreviewModal";
import EmailTemplates from "../email-templates/EmailTemplates";

import {
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
  FaHistory,
} from "react-icons/fa";

export default function MasjidCard({
  masjid,
  outreachLog = [],
  onAddAction,
  onEditMosque,
  userRole,
  userOrganizationId,
  userAssociatedMosqueId,
  user,
  templates = [],
}) {
  const [showOutreach, setShowOutreach] = useState(false);

  // Email preview state
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewBody, setPreviewBody] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const { canEdit, canLog } = useMasjidPermissions({
    userRole,
    userOrganizationId,
    userAssociatedMosqueId,
    masjid,
  });

  const handleAddAction = () => {
    if (onAddAction) onAddAction(masjid.id);
  };

  const handleEditMosque = () => {
    if (onEditMosque) onEditMosque(masjid.id);
  };

  // Sort outreach by date (most recent first)
  const sortedOutreach = [...outreachLog].sort(
    (a, b) => new Date(b.contacted_at) - new Date(a.contacted_at),
  );

  /**   placeholders in body_html with real masjid/user data */
  const handlePreviewEmail = (template) => {
    setPreviewTemplate(template);

    let body = template.body_html
      .replace(/\{masjid_name\}/g, masjid.name || "")
      .replace(/\{contact_name\}/g, masjid.contact_name || "")
      .replace(/\{user_name\}/g, user?.name || user?.user_name || "");

    setPreviewBody(body);
    setShowPreview(true);
  };

  /** POST to send_mail.php — server does its own placeholder replacement too */
  const handleSendEmail = async () => {
    if (!previewTemplate) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/send_mail.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            template_id: previewTemplate.id,
            masjid_id: masjid.id,
          }),
        },
      );
      const data = await res.json();
      alert(data.message || "Email sent!");
      setShowPreview(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    }
  };

  // Only show the email section for roles that are allowed to send
  const canSendEmail =
    userRole === "organization_admin" || userRole === "mosque_admin";

  return (
    <div className="masjid-card">
      <div className="masjid-card-row first-row">
        <div className="masjid-info">
          <div className="d-flex align-items-center mb-4">
            <img
              src="/qt/images/islamic-mosque-icon.png"
              alt="Mosque icon"
              width="48"
              height="48"
            />
            <h2 className="text-success mb-0 ms-3">{masjid.name}</h2>
          </div>
          <MasjidBadges masjid={masjid} />

          {/* Contact Person */}
          <div className="d-flex align-items-center gap-2 mt-2 mb-4">
            <h4 className="ms-2 my-1">
              <span className="small">- Contact Person: </span>
              <span className="text-secondary">
                {masjid.contact_name || "N/A"}
              </span>
            </h4>

            {masjid.contact_phone && (
              <span className="contact-item ms-2">
                <FaPhoneAlt />
                <a href={`tel:${masjid.contact_phone}`}>
                  {masjid.contact_phone}
                </a>
              </span>
            )}
            {masjid.contact_email && (
              <span className="contact-item mx-2">
                <FaEnvelopeOpen />
                <a href={`mailto:${masjid.contact_email}`}>
                  {masjid.contact_email}
                </a>
              </span>
            )}
          </div>

          {/* Email Templates — only for roles that can send */}
          {canSendEmail && (
            <div className="email-actions">
              <EmailTemplates
                templates={templates}
                onSelectTemplate={handlePreviewEmail}
              />
            </div>
          )}

          {/* Outreach count toggle */}
          {sortedOutreach.length > 0 && (
            <span
              className="ms-3 my-4"
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
              onClick={() => setShowOutreach(!showOutreach)}
              title="Toggle Outreach History"
            >
              <Badge bg="success" className="px-4 py-2 text-light fs-5 ">
                <FaUsers size={24} className="text-light me-2" />
                {sortedOutreach.length} outreach
                {sortedOutreach.length !== 1 ? "es" : ""}
                {showOutreach ? (
                  <FaChevronDown size={16} className="text-warning ms-3" />
                ) : (
                  <FaChevronRight size={16} className="text-warning ms-3" />
                )}
              </Badge>
            </span>
          )}

          {/* Last Outreach Summary */}
          {sortedOutreach.length > 0 && (
            <div className="mt-2">
              <small className="text-muted">
                <FaHistory className="me-1" />
                Last contact:{" "}
                {new Date(
                  sortedOutreach[0].contacted_at,
                ).toLocaleDateString()}{" "}
                via {sortedOutreach[0].method}
                {sortedOutreach[0].contacted_person_name &&
                  ` - ${sortedOutreach[0].contacted_person_name}`}
              </small>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="masjid-actions">
          {canLog && (
            <button className="btn-log" onClick={handleAddAction}>
              + Log Action
            </button>
          )}
          {canEdit && (
            <button className="btn-edit" onClick={handleEditMosque}>
              ✏️ Edit Mosque
            </button>
          )}
        </div>
      </div>

      {/* ROW 2: OUTREACH HISTORY TABLE */}
      {showOutreach && <OutreachHistory outreachLog={sortedOutreach} />}

      {/* Email Preview + Send Modal */}
      {showPreview && (
        <EmailPreviewModal
          template={previewTemplate}
          previewBody={previewBody}
          onClose={() => setShowPreview(false)}
          onSend={handleSendEmail}
          masjid={masjid}
          user={user}
        />
      )}
    </div>
  );
}
