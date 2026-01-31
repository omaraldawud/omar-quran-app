import { useState } from "react";
import "../../assets/css/header.css";

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
            📊 Dashboard
          </button>

          {/* Show Organization Profile only if user has organization_id */}
          {hasOrganization && (
            <button
              className={`nav-btn ${currentView === "profile" ? "active" : ""}`}
              onClick={() => handleNavigation("profile")}
            >
              🏢 Organization Profile
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
          <div className="user-info">
            <span className="user-name">{user.user_name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
