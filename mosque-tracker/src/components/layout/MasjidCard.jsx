import { useState } from "react";
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
  const [showOutreach, setShowOutreach] = useState(false);

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
    if (userRole === "system_admin") return true;
    if (userRole === "organization_admin") {
      return (
        parent_organization_id && parent_organization_id === userOrganizationId
      );
    }
    if (userRole === "mosque_admin") {
      return id === userAssociatedMosqueId;
    }
    return false;
  };
  const showEditButton = canEdit();

  // Sort outreach by date (most recent first)
  const sortedOutreach = [...outreachLog].sort(
    (a, b) => new Date(b.contacted_at) - new Date(a.contacted_at),
  );

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
            {contact_email && (
              <span className="contact-item mx-3">
                ✉️ <a href={`mailto:${contact_email}`}>{contact_email}</a>
              </span>
            )}
            {phone && (
              <span className="contact-item mx-3">
                📱 <a href={`tel:${phone}`}>{phone}</a>
              </span>
            )}
            {email && (
              <span className="contact-item mx-3">
                📧 <a href={`mailto:${email}`}>{email}</a>
              </span>
            )}
            {website && (
              <span className="contact-item">
                🌐{" "}
                <a href={website} target="_blank" rel="noreferrer">
                  {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
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

          {/* Show badge to toggle outreach */}
          {sortedOutreach.length > 0 && (
            <Badge
              bg="success"
              className="ms-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowOutreach(!showOutreach)}
            >
              {sortedOutreach.length} outreach
              {sortedOutreach.length !== 1 ? "es" : ""}{" "}
              {showOutreach ? "▼" : "▶"}
            </Badge>
          )}

          {/* Show last outreach summary */}
          {sortedOutreach.length > 0 && (
            <div className="mt-2">
              <small className="text-muted">
                Last contact:{" "}
                {new Date(sortedOutreach[0].contacted_at).toLocaleDateString()}{" "}
                via {sortedOutreach[0].method}
                {sortedOutreach[0].contacted_person_name &&
                  ` - ${sortedOutreach[0].contacted_person_name}`}
              </small>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
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

      {/* ROW 2: OUTREACH HISTORY TABLE */}
      {showOutreach && sortedOutreach.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
          }}
        >
          <h5 style={{ marginBottom: "15px", color: "#495057" }}>
            📋 Outreach History ({sortedOutreach.length})
          </h5>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#e9ecef" }}>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Date/Time
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Method
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Contact Person
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Notes
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedOutreach.map((entry) => (
                  <tr
                    key={entry.id}
                    style={{ borderBottom: "1px solid #dee2e6" }}
                  >
                    <td style={{ padding: "10px", fontSize: "14px" }}>
                      {new Date(entry.contacted_at).toLocaleString()}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor: "#e7f3ff",
                          fontSize: "13px",
                          display: "inline-block",
                        }}
                      >
                        {entry.method}
                      </span>
                    </td>
                    <td style={{ padding: "10px", fontSize: "14px" }}>
                      <div>
                        <strong>{entry.contacted_person_name || "N/A"}</strong>
                      </div>
                      {entry.contacted_person_email && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            marginTop: "2px",
                          }}
                        >
                          ✉️ {entry.contacted_person_email}
                        </div>
                      )}
                      {entry.contacted_person_phone && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            marginTop: "2px",
                          }}
                        >
                          📞 {entry.contacted_person_phone}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        fontSize: "14px",
                        maxWidth: "200px",
                      }}
                    >
                      {entry.notes || "-"}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        fontSize: "14px",
                        maxWidth: "200px",
                      }}
                    >
                      {entry.result || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
