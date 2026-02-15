import {
  FaMosque,
  FaBuilding,
  FaUsers,
  FaGlobeAmericas,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";

export default function DashboardOverview({ stats, onNavigate }) {
  const statCards = [
    {
      title: "Organizations",
      value: stats?.total_organizations || 0,
      icon: FaBuilding,
      color: "#3b82f6",
      bgColor: "#eff6ff",
      action: () => onNavigate("organizations"),
    },
    {
      title: "Users",
      value: stats?.total_users || 0,
      icon: FaUsers,
      color: "#8b5cf6",
      bgColor: "#f5f3ff",
      action: () => onNavigate("users"),
    },
    {
      title: "Mosques",
      value: stats?.total_mosques || 0,
      icon: FaMosque,
      color: "#10b981",
      bgColor: "#ecfdf5",
    },
    {
      title: "Total Outreach",
      value: stats?.total_outreach || 0,
      icon: FaGlobeAmericas,
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
  ];

  const recentActivity = [
    { type: "New Organization", name: "Pending approvals need review", time: "2 hours ago" },
    { type: "User Created", name: "New users added to system", time: "5 hours ago" },
    { type: "Template Updated", name: "Email template modified", time: "1 day ago" },
  ];

  return (
    <div className="dashboard-overview">
      <div className="overview-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p className="overview-subtitle">
            Welcome back! Here's what's happening with your system.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ borderLeft: `4px solid ${card.color}` }}
            onClick={card.action}
          >
            <div className="stat-card-content">
              <div className="stat-info">
                <p className="stat-label">{card.title}</p>
                <h2 className="stat-value">{card.value}</h2>
              </div>
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.icon style={{ color: card.color }} size={24} />
              </div>
            </div>
            {card.action && (
              <div className="stat-card-footer">
                <span>View details</span>
                <FaArrowRight size={12} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button
              className="quick-action-btn"
              onClick={() => onNavigate("organizations")}
            >
              <FaBuilding />
              <span>Manage Organizations</span>
            </button>
            <button
              className="quick-action-btn"
              onClick={() => onNavigate("users")}
            >
              <FaUsers />
              <span>Manage Users</span>
            </button>
            <button
              className="quick-action-btn"
              onClick={() => onNavigate("templates")}
            >
              <FaChartLine />
              <span>Email Templates</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="overview-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-type">{activity.type}</p>
                  <p className="activity-name">{activity.name}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
