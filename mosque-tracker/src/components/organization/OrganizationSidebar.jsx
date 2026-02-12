import { useState, useEffect } from "react";
import { Card, Badge, ListGroup } from "react-bootstrap";
import "../../assets/css/organization-sidebar.css";
import {
  FaChevronRight,
  FaChevronLeft,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaHeart,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaBullseye,
  FaComments,
  FaCrosshairs,
  FaFolder,
  FaFileAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaGlobeAmericas,
} from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";

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
    guidelines,
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
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
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
                <h6 className="card-title justify-content-between fs-4 fw-bold">
                  <span style={{ color: primary_color }}>Contacts</span>
                  {donation_link && (
                    <Badge bg="light" className="d-flex align-items-center">
                      <FaHeart className="me-2 text-danger" />
                      <a
                        href={donation_link}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-link text-decoration-none"
                      >
                        Donation Link
                      </a>
                    </Badge>
                  )}
                </h6>

                <div className="mb-3 fw-bold" style={{ fontSize: "11px" }}>
                  <FaMapMarkerAlt className="text-success me-1" /> {street}.{" "}
                  {city}, {state}.
                </div>

                {/* Fixed phone section */}
                {phone && (
                  <div className="contact-item d-flex align-items-center mb-2">
                    <Badge
                      bg="light"
                      className="me-2 d-flex align-items-center"
                    >
                      <FaPhone className="text-primary me-2" />
                      <a href={`tel:${phone}`} className="text-decoration-none">
                        {phone}
                      </a>
                    </Badge>
                  </div>
                )}

                {/* Fixed email section */}
                {email && (
                  <div className="contact-item d-flex align-items-center mb-2">
                    <Badge bg="light" className="d-flex align-items-center">
                      <FaEnvelope className="text-primary me-2" />
                      <a
                        href={`mailto:${email}`}
                        className="text-decoration-none"
                      >
                        {email}
                      </a>
                    </Badge>
                  </div>
                )}

                {website && (
                  <Badge bg="light" className="me-2 d-flex align-items-center">
                    <FaGlobeAmericas className="text-primary me-2" />
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link text-decoration-none"
                    >
                      {website
                        .replace(/^https?:\/\//, "")
                        .replace(/^www\./, "")}
                    </a>
                  </Badge>
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
                  <FaGlobe style={{ color: primary_color }} className="me-1" />{" "}
                  Social Media Links
                </h6>
                <div className="social-links ms-3">
                  {facebook_url && (
                    <a
                      href={facebook_url}
                      target="_blank"
                      rel="noreferrer"
                      title="Facebook"
                      className="me-2"
                    >
                      <FaFacebook size={20} />
                    </a>
                  )}
                  {instagram_url && (
                    <a
                      href={instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      title="Instagram"
                      className="me-2"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                  {twitter_url && (
                    <a
                      href={twitter_url}
                      target="_blank"
                      rel="noreferrer"
                      title="Twitter"
                      className="me-2"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {linkedin_url && (
                    <a
                      href={linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      title="LinkedIn"
                      className="me-2"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {youtube_url && (
                    <a
                      href={youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      title="YouTube"
                      className="me-2"
                    >
                      <FaYoutube size={20} />
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
                  <FaBullseye
                    style={{ color: primary_color }}
                    className="me-1"
                  />
                  Quick Pitch
                </h6>
                <p className="pitch-text">{elevator_pitch}</p>
              </Card.Body>
            </Card>
          )}

          {/* Guidelines Section - Simplified */}
          {guidelines && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <FaComments className="me-1" /> Guidelines
                </h6>
                <div dangerouslySetInnerHTML={{ __html: guidelines }} />
              </Card.Body>
            </Card>
          )}

          {talking_points && talking_points.length > 0 && (
            <Card className="sidebar-card">
              <Card.Body>
                <h6 className="card-title">
                  <FaComments className="me-1" /> Talking Points
                </h6>
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
                  <FaCrosshairs
                    style={{ color: primary_color }}
                    className="me-1"
                  />{" "}
                  Current Goals
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
                  <FaBullseye
                    style={{ color: primary_color }}
                    className="me-1"
                  />{" "}
                  Mission Statement
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
                  <FaFolder style={{ color: primary_color }} className="me-1" />{" "}
                  Resources
                </h6>
                <div className="resources-list">
                  {brochure_url && (
                    <a
                      href={brochure_url}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link"
                    >
                      <FaFileAlt className="me-1" /> Brochure
                    </a>
                  )}
                  {presentation_url && (
                    <a
                      href={presentation_url}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link"
                    >
                      <FaFileCircleCheck className="me-1" /> Presentation
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
                      <FaHeart className="me-1" /> Donate
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
                  <FaInfoCircle
                    style={{ color: primary_color }}
                    className="me-1"
                  />{" "}
                  Tax Info
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
