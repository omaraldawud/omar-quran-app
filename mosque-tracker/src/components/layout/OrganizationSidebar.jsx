import { useState, useEffect } from "react";
import { Card, Badge, ListGroup } from "react-bootstrap";
import "../../assets/css/organization-sidebar.css";

export default function OrganizationSidebar({
  organizationId,
  isCollapsed,
  onToggle,
}) {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizationId) return;

    fetch(`http://localhost/api/organization.php?id=${organizationId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Organization loaded:", data);
        setOrganization(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading organization:", err);
        setLoading(false);
      });
  }, [organizationId]);

  if (loading) {
    return (
      <div className={`organization-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className={`organization-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div style={{ padding: "20px" }}>
          <p>Organization not found</p>
        </div>
      </div>
    );
  }

  const {
    name,
    logo_url,
    tagline,
    mission_statement,
    description,
    talking_points,
    elevator_pitch,
    outreach_goals,
    phone,
    email,
    website,
    street,
    city,
    state,
    zip,
    brochure_url,
    presentation_url,
    donation_link,
    facebook_url,
    instagram_url,
    twitter_url,
    linkedin_url,
    youtube_url,
    ein,
    tax_exempt_status,
    primary_color,
  } = organization;

  return (
    <div className={`organization-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? "▶" : "◀"}
          </button>
          <div>
            {tax_exempt_status && (
              <Badge bg="success" style={{ marginLeft: "200px" }}>
                {tax_exempt_status === "501c3"
                  ? "501(c)(3)"
                  : tax_exempt_status}
              </Badge>
            )}
          </div>
        </div>
      </div>
      {!isCollapsed && (
        <div className="sidebar-content ">
          {/* Organization Header */}

          <div
            className="org-header"
            style={{ borderLeftColor: primary_color || "#28a745" }}
          >
            {logo_url && (
              <img src={logo_url} alt={`${name} logo`} className="org-logo" />
            )}
          </div>
          <div>
            <h3 className="org-name">{name}</h3>
            {tagline && <p className="org-tagline">{tagline}</p>}
          </div>

          {/* Quick Contact */}
          {(phone || email || website) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title fs-4 fw-bold">
                  <span style={{ color: primary_color }}> Contacts</span>
                </h6>
                <div className="mb-3 fw-bold" style={{ fontSize: "11px" }}>
                  {street}. {city}, {state}.
                </div>
                {phone && (
                  <div className="contact-item d-flex align-items-center mb-2">
                    <span
                      className="me-2"
                      style={{ color: primary_color, width: "10px" }}
                    >
                      📞
                    </span>
                    <a href={`tel:${phone}`}>{phone}</a>
                    <span
                      className="mx-2"
                      style={{ color: primary_color, width: "10px" }}
                    >
                      ✉️
                    </span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                )}
                {email && (
                  <div className="contact-item d-flex align-items-center mb-2"></div>
                )}
                {website && (
                  <div className="contact-item d-flex align-items-center mb-2">
                    <span
                      className="me-2"
                      style={{ color: primary_color, width: "20px" }}
                    >
                      🌐
                    </span>
                    <a href={website} target="_blank" rel="noreferrer">
                      {website
                        .replace(/^https?:\/\//, "")
                        .replace(/^www\./, "")}
                    </a>
                    {donation_link && (
                      <a
                        href={donation_link}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-link"
                        style={{ color: primary_color }}
                      >
                        💚 Donation Link
                      </a>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
          {/* Social Media */}
          {(facebook_url ||
            instagram_url ||
            twitter_url ||
            linkedin_url ||
            youtube_url) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <span style={{ color: primary_color }}>🌐</span> Social Media
                  Links
                </h6>
                <div className="social-links ms-3">
                  {facebook_url && (
                    <a
                      href={facebook_url}
                      target="_blank"
                      rel="noreferrer"
                      title="Facebook"
                    >
                      🔵
                    </a>
                  )}
                  {instagram_url && (
                    <a
                      href={instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      title="Instagram"
                    >
                      📷
                    </a>
                  )}
                  {twitter_url && (
                    <a
                      href={twitter_url}
                      target="_blank"
                      rel="noreferrer"
                      title="Twitter"
                    >
                      🐦
                    </a>
                  )}
                  {linkedin_url && (
                    <a
                      href={linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      title="LinkedIn"
                    >
                      💼
                    </a>
                  )}
                  {youtube_url && (
                    <a
                      href={youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      title="YouTube"
                    >
                      📺
                    </a>
                  )}
                </div>
              </Card.Body>
            </Card>
          )}
          {/* Elevator Pitch */}
          {elevator_pitch && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <span style={{ color: primary_color }}>🎯</span> Quick Pitch
                </h6>
                <p className="pitch-text">{elevator_pitch}</p>
              </Card.Body>
            </Card>
          )}

          {/* Talking Points */}
          {talking_points && talking_points.length > 0 && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">💬 Talking Points</h6>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  <ListGroup variant="flush">
                    {talking_points.map((point, index) => (
                      <li
                        key={index}
                        style={{
                          paddingLeft: "1.5em",
                          fontSize: "14px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            color: primary_color,
                            position: "absolute",
                            left: 0,
                            fontSize: "1.5em",
                          }}
                        >
                          •
                        </span>
                        {point}
                      </li>
                    ))}
                  </ListGroup>
                </ul>
              </Card.Body>
            </Card>
          )}

          {/* Outreach Goals */}
          {outreach_goals && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <span style={{ color: primary_color }}>🎯</span> Current Goals
                </h6>
                <p className="goals-text">{outreach_goals}</p>
              </Card.Body>
            </Card>
          )}

          {/* mission / vision*/}
          {mission_statement && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <span style={{ color: primary_color }}>🎯</span> Mission
                  Statement
                </h6>

                <div
                  className="goals-text"
                  dangerouslySetInnerHTML={{ __html: mission_statement }}
                />
              </Card.Body>
            </Card>
          )}

          {/* Resources */}
          {(brochure_url || presentation_url || donation_link) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <span style={{ color: primary_color }}>📁</span> Resources
                </h6>
                <div className="resources-list">
                  {brochure_url && (
                    <a
                      href={brochure_url}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link"
                    >
                      📄 Brochure
                    </a>
                  )}
                  {presentation_url && (
                    <a
                      href={presentation_url}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link"
                    >
                      📊 Presentation
                    </a>
                  )}
                  {donation_link && (
                    <a
                      href={donation_link}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link"
                      style={{ color: primary_color }}
                    >
                      💚 Donate
                    </a>
                  )}
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Tax Info */}
          {(ein || tax_exempt_status) && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <span style={{ color: primary_color }}>📋</span> Tax Info
                </h6>
                {tax_exempt_status && (
                  <Badge bg="success" className="mb-2">
                    {tax_exempt_status === "501c3"
                      ? "501(c)(3)"
                      : tax_exempt_status}
                  </Badge>
                )}
                {ein && <p className="small text-muted mb-0">EIN: {ein}</p>}
              </Card.Body>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
