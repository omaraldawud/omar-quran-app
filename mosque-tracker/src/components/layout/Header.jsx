export default function Header({ user, onLogout }) {
  if (!user) return null; // Safety check

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>🕌 Mosque Outreach System</h1>
        <div className="user-info">
          <span className="user-name">👤 {user.user_name}</span>
          <span className="user-role">{user.role.replace(/_/g, " ")}</span>
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
