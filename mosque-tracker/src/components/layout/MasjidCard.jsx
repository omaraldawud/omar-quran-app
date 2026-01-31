import Badge from "react-bootstrap/Badge";

export default function MasjidCard({
  masjid,
  outreachLog = [],
  onAddAction,
  onEditMosque,
  userRole,
  userOrganizationId,
  userAssociatedMosqueId,
}) {
  const {
    id,
    name,
    street,
    city,
    state,
    zip,
    contact_name,
    contact_email,
    contact_phone,
    phone,
    email,
    website,
    facebook,
    whatsapp,
    parent_organization_id,
  } = masjid;

  const handleAddAction = () => {
    if (onAddAction) onAddAction(id);
  };

  const handleEditMosque = () => {
    if (onEditMosque) onEditMosque(id);
  };

  // Determine if user can edit this mosque
  const canEdit = () => {
    // system_admin can edit any mosque
    if (userRole === "system_admin") return true;

    // organization_admin can edit mosques in their organization
    if (userRole === "organization_admin") {
      return parent_organization_id && parent_organization_id === userOrganizationId;
    }

    // mosque_admin can only edit their own mosque
    if (userRole === "mosque_admin") {
      return id === userAssociatedMosqueId;
    }

    return false;
  };

  const showEditButton = canEdit();

  return (
    <div className="masjid-card">
      {/* ROW 1: INFO + ACTIONS */}
      <div className="masjid-card-row first-row">
        <div className="masjid-info">
          <h2 className="text-success">{name}</h2>
          <span className="masjid-location ms-3">
            <Badge bg="info" className="p-2">
              📍 {street}. {city} {zip}
              {state ? ` , ${state}` : ""}
            </Badge>
          </span>
          <h4 className="ms-3 my-4">
            <span className="small">- Contact Person: </span>
            <span className="text-primary">{contact_name || "N/A"}</span>
          </h4>

          {/* Single row contact info */}
          <div className="d-flex masjid-contacts-row my-3">
            {contact_phone && (
              <span className="contact-item mx-3">
                📞 <a href={`tel:${contact_phone}`}>{contact_phone}</a>
              </span>
            )}
            {contact_email && contact_email.length > 0 && (
              <span className="contact-item mx-3">
                ✉️ <a href={`mailto:${contact_email}`}>{contact_email}</a>
              </span>
            )}
            {phone && (
              <span className="contact-item mx-3">
                📱 <a href={`tel:${phone}`}>{phone}</a>
              </span>
            )}
            {email && email.length > 0 && (
              <span className="contact-item mx-3">
                📧 <a href={`mailto:${email}`}>{email}</a>
              </span>
            )}
            {website && (
              <span className="contact-item">
                🌐{" "}
                <a href={website} target="_blank" rel="noreferrer">
                  {website}
                </a>
              </span>
            )}
            {facebook && (
              <span className="contact-item">
                🔵{" "}
                <a href={facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </span>
            )}
            {whatsapp && (
              <span className="contact-item">
                💬{" "}
                <a href={whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </span>
            )}
          </div>
        </div>

        <div className="masjid-actions">
          <button className="btn-log" onClick={handleAddAction}>
            + Log Action
          </button>
          {showEditButton && (
            <button className="btn-edit" onClick={handleEditMosque}>
              ✏️ Edit Mosque
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
