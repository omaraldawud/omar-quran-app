import { useState, useEffect } from "react";
import "./assets/css/layout.css";
import "./assets/css/App.css";
//main components
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
//organization
import OrganizationRegistration from "./components/OrganizationRegistration";
import AdminPanel from "./components/AdminPanel";
import OrganizationProfile from "./components/OrganizationProfile";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard, profile, admin, register

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost/api/auth.php", {
        credentials: "include",
      });
      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView("dashboard");
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/api/logout.php", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setCurrentView("dashboard");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Registration page (public, no layout needed)
  if (!user && currentView === "register") {
    return (
      <div className="registration-page">
        <OrganizationRegistration
          onBackToLogin={() => setCurrentView("dashboard")}
        />
      </div>
    );
  }

  // Main app with Layout
  return (
    <Layout
      user={user}
      onLogout={handleLogout}
      currentView={currentView}
      onNavigate={navigateTo}
    >
      {user ? (
        <>
          {/* Dashboard View */}
          {currentView === "dashboard" && (
            <Dashboard
              currentUserId={user.id}
              organizationId={user.organization_id}
              userRole={user.role}
              associatedMosqueId={user.associated_mosque_id}
            />
          )}

          {/* Organization Profile View */}
          {currentView === "profile" && (
            <div className="page-container">
              <button
                className="btn-back-nav"
                onClick={() => navigateTo("dashboard")}
              >
                ← Back to Dashboard
              </button>
              <OrganizationProfile organizationId={user.organization_id} />
            </div>
          )}

          {/* Admin Panel View (only for admins) */}
          {currentView === "admin" && user.role === "admin" && (
            <div className="page-container">
              <button
                className="btn-back-nav"
                onClick={() => navigateTo("dashboard")}
              >
                ← Back to Dashboard
              </button>
              <AdminPanel />
            </div>
          )}

          {/* Fallback to dashboard if invalid view */}
          {!["dashboard", "profile", "admin"].includes(currentView) && (
            <Dashboard
              currentUserId={user.id}
              organizationId={user.organization_id}
              userRole={user.role}
              associatedMosqueId={user.associated_mosque_id}
              onNavigate={navigateTo}
            />
          )}
        </>
      ) : (
        <Login
          onLogin={handleLogin}
          onRegister={() => setCurrentView("register")}
        />
      )}
    </Layout>
  );
}

export default App;
