import { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import "../../assets/css/mosque-admin-sidebar.css";

export default function MosqueAdminSidebar({
  mosqueId,
  isCollapsed,
  onToggle,
  onEditMosque,
}) {
  const [mosque, setMosque] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mosqueId) {
      setError("No mosque ID provided");
      setLoading(false);
      return;
    }

    console.log("Fetching mosque details for ID:", mosqueId);

    fetch(
      `${import.meta.env.VITE_API_BASE}/mosque_details.php?id=${mosqueId}`,
      {
        credentials: "include",
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Failed to load mosque`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Mosque loaded:", data);
        setMosque(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading mosque:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [mosqueId]);

  if (loading) {
    return (
      <div className={`mosque-admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !mosque) {
    return (
      <div className={`mosque-admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? "▶" : "◀"}
          </button>
        </div>
        {!isCollapsed && (
          <div style={{ padding: "20px" }}>
            <div className="alert alert-warning">
              <strong>Error:</strong> {error || "Mosque not found"}
              <br />
              <small>Mosque ID: {mosqueId}</small>
            </div>
          </div>
        )}
      </div>
    );
  }

  const {
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
    logo_url,
  } = mosque;

  return (
    <div className={`mosque-admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <div className="sidebar-header">
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "▶" : "◀"}
        </button>
        {!isCollapsed && (
          <Badge bg="info" className="role-badge">
            Mosque Admin
          </Badge>
        )}
      </div>
      <div className="px-2 my-2">
        <button className="btn-edit-mosque" onClick={onEditMosque}>
          ✏️ Edit Mosque
        </button>
      </div>

      {!isCollapsed && (
        <div className="sidebar-content">
          {/* Mosque Header */}
          <div className="mosque-header">
            <div className="logo-container">
              <img
                src={logo_url}
                alt={`${name} logo`}
                caption={`${name} logo`}
                className="mosque-logo"
              />
            </div>
            <h3 className="mosque-name">{name}</h3>
          </div>

          {/* Address */}
          {(street || city || state) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">📍 Location</h6>
                {street && <div className="info-line">{street}</div>}
                {(city || state || zip) && (
                  <div className="info-line">
                    {city}
                    {state && `, ${state}`} {zip}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          {/* Contact Person */}
          {(contact_name || contact_email || contact_phone) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">👤 Contact Person</h6>
                {contact_name && (
                  <div className="contact-item">
                    <strong>Name:</strong> {contact_name}
                  </div>
                )}
                {contact_email && (
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <a href={`mailto:${contact_email}`}>{contact_email}</a>
                  </div>
                )}
                {contact_phone && (
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <a href={`tel:${contact_phone}`}>{contact_phone}</a>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          {/* General Contact Info */}
          {(phone || email) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">📱 Mosque Contact</h6>
                {phone && (
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <a href={`tel:${phone}`}>{phone}</a>
                  </div>
                )}
                {email && (
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          {/* Online Presence */}
          {(website || facebook || whatsapp) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">🌐 Online</h6>
                {website && (
                  <div className="link-item">
                    <a href={website} target="_blank" rel="noreferrer">
                      🌐 Website
                    </a>
                  </div>
                )}
                {facebook && (
                  <div className="link-item">
                    <a href={facebook} target="_blank" rel="noreferrer">
                      📘 Facebook
                    </a>
                  </div>
                )}
                {whatsapp && (
                  <div className="link-item">
                    <a href={whatsapp} target="_blank" rel="noreferrer">
                      💬 WhatsApp
                    </a>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          {/* Help Card */}
          <Card className="sidebar-card help-card">
            <Card.Body>
              <h6 className="card-title">💡 Quick Tip</h6>
              <p className="help-text">
                Keep your mosque information up to date! Click "Edit Mosque"
                above to update contact details, address, or social media links.
              </p>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
