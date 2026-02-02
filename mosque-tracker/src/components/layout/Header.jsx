import { useState } from "react";
import "../../assets/css/header.css";
import { FaMosque, FaUsers } from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";

export default function Header({ user, onLogout, currentView, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (view) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  // Show Organization Profile button only if user has organization_id
  const hasOrganization =
    user.organization_id != null && user.organization_id !== "";

  const hasMosque =
    user.associated_mosque_id != null && user.associated_mosque_id !== "";

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <h1 className="app-title">Masjid Outreach Platform</h1>
        </div>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <button
            className={`nav-btn ${currentView === "dashboard" ? "active" : ""}`}
            onClick={() => handleNavigation("dashboard")}
          >
            <FaMosque className="text-success me-2" />
            Masjid Dashboard
          </button>

          {/* Show Organization Profile only if user has organization_id */}
          {hasOrganization && (
            <button
              className={`nav-btn ${currentView === "profile" ? "active" : ""}`}
              onClick={() => handleNavigation("profile")}
            >
              <FaBuildingCircleArrowRight className="text-info me-2" />
              Organization Profile
            </button>
          )}

          {user.role === "system_admin" && (
            <button
              className={`nav-btn ${currentView === "admin" ? "active" : ""}`}
              onClick={() => handleNavigation("admin")}
            >
              ⚙️ Admin Panel
            </button>
          )}
        </nav>

        <div className="header-right">
          <div className="user-info flex-column">
            <div className="profile-picture-container">
              <div className="user-actions">
                {user.user_profile_picture ? (
                  <img
                    src={user.user_profile_picture}
                    alt={user.user_name}
                    className="profile-picture"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <button className="btn-logout" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div>
              <span className="user-name">
                <FaUsers size={24} className="text-primary me-2" />
                {user.user_name} :{"  "}
                <span className="text-dark">{user.role}</span>
                {user.organization_id && ` - ORG-ID: ${user.organization_id}`}
                {user.associated_mosque_id &&
                  ` - MOSQUE-ID: ${user.associated_mosque_id}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
