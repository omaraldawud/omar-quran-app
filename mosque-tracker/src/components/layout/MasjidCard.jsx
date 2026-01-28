import Badge from "react-bootstrap/Badge";

export default function MasjidCard({ masjid, outreachLog = [], onAddAction }) {
  const { name, address, contacts } = masjid;
  const handleAddAction = () => {
    if (onAddAction) onAddAction(masjid.id);
  };

  return (
    <div className="masjid-card">
      {/* ROW 1: INFO + ACTIONS */}
      <div className="masjid-card-row first-row">
        <div className="masjid-info">
          <h2 className="text-success">{name}</h2>
          <span className="masjid-location ms-3">
            <Badge bg="info" className="p-2">
              📍 {address.street}. {address.city} {address.zip}
              {address.state ? ` , ${address.state}` : ""}
            </Badge>
          </span>
          <h4 className="ms-3 my-4">
            <span className="small">- Contact Person: </span>
            <span className="text-primary">{contacts.contact_name}</span>
          </h4>

          {/* Single row contact info */}
          <div className="d-flex masjid-contacts-row my-3">
            {contacts.phone && (
              <span className="contact-item mx-3">
                📞 <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
              </span>
            )}
            {contacts.email && contacts.email.length > 0 && (
              <span className="contact-item mx-3">
                ✉️{" "}
                <a href={`mailto:${contacts.email.join(",")}`}>
                  {contacts.email.join(", ")}
                </a>
              </span>
            )}
            {contacts.website && (
              <span className="contact-item">
                🌐{" "}
                <a href={contacts.website} target="_blank" rel="noreferrer">
                  {contacts.website}
                </a>
              </span>
            )}
            {contacts.facebook && (
              <span className="contact-item">
                🔵{" "}
                <a href={contacts.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </span>
            )}
            {contacts.whatsapp && (
              <span className="contact-item">
                💬{" "}
                <a href={contacts.whatsapp} target="_blank" rel="noreferrer">
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
        </div>
      </div>

      {/* ROW 2: OUTREACH LOG */}
      <div className="masjid-card-row log-row">
        {outreachLog.length === 0 ? (
          <p>No outreach yet.</p>
        ) : (
          <table className="log-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Timestamp</th>
                <th>Contact Person</th>
                <th>Notes</th>
                <th>Clerk</th>
              </tr>
            </thead>
            <tbody>
              {outreachLog.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.method}</td>
                  <td>{new Date(entry.timestamp).toLocaleString()}</td>
                  <td>{entry.contact_name}</td>
                  <td>{entry.notes}</td>
                  <td>{entry.clerk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
