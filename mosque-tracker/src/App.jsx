import { useState, useEffect } from "react";
import "./assets/css/layout.css";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./assets/css/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/api/logout.php", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      {user ? (
        <Dashboard
          currentUserId={user.id}
          organizationId={user.organization_id}
          userRole={user.role}
          associatedMosqueId={user.associated_mosque_id}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Layout>
  );
}

export default App;
