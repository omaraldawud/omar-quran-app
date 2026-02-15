import { useState, useEffect } from "react";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaEnvelope,
  FaMosque,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import DashboardOverview from "../../pages/admin/DashboardOverview";
import OrganizationsManager from "../../pages/admin/OrganizationsManager";
import UsersManager from "../../pages/admin/UsersManager";
import EmailTemplatesManager from "../../pages/admin/EmailTemplatesManager";

import "../../assets/css/admin-dashboard.css";

export default function AdminDashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/stats.php`, {
        credentials: "include",
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: FaHome },
    { id: "organizations", label: "Organizations", icon: FaBuilding },
    { id: "users", label: "Users", icon: FaUsers },
    { id: "templates", label: "Email Templates", icon: FaEnvelope },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <DashboardOverview stats={stats} onNavigate={setActiveSection} />
        );
      case "organizations":
        return <OrganizationsManager onStatsUpdate={fetchStats} />;
      case "users":
        return <UsersManager />;
      case "templates":
        return <EmailTemplatesManager />;
      default:
        return (
          <DashboardOverview stats={stats} onNavigate={setActiveSection} />
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {!sidebarCollapsed && (
              <>
                <FaMosque size={28} className="logo-icon" />
                <span className="logo-text">Admin Panel</span>
              </>
            )}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
              title={item.label}
            >
              <item.icon className="nav-icon" />
              {!sidebarCollapsed && (
                <span className="nav-label">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            {!sidebarCollapsed && (
              <>
                <div className="user-avatar">
                  {user?.user_name?.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="user-details">
                  <div className="user-name">{user?.user_name || "Admin"}</div>
                  <div className="user-role">System Admin</div>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="main-content">{renderContent()}</div>
      </main>
    </div>
  );
}
