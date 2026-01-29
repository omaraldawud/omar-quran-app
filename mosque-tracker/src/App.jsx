import { useState, useEffect } from "react";
import "./assets/css/layout.css";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; // You'll create this

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    fetch("http://localhost/api/auth.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Layout>
        {user ? (
          <Dashboard
            currentUserId={user.id}
            organizationId={user.organization_id}
            userRole={user.role}
            associatedMosqueId={user.associated_mosque_id}
          />
        ) : (
          <Login onLogin={setUser} />
        )}
      </Layout>
    </>
  );
}

export default App;
