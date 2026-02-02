import { useState, useEffect } from "react";

export default function OutreachTable({ outreachLog = [] }) {
  const [usersMap, setUsersMap] = useState({});
  const [mosquesMap, setMosquesMap] = useState({});

  console.log("🔍 OutreachTable rendering with", outreachLog.length, "entries");

  // Fetch users
  useEffect(() => {
    fetch("http://localhost/api/users.php")
      .then((res) => res.json())
      .then((users) => {
        const map = {};
        users.forEach((u) => (map[u.id] = u.user_name));
        setUsersMap(map);
      })
      .catch(console.error);
  }, []);

  // Fetch mosques for display
  useEffect(() => {
    fetch("http://localhost/api/mosques.php")
      .then((res) => res.json())
      .then((mosques) => {
        const map = {};
        mosques.forEach((m) => (map[m.id] = m.name));
        setMosquesMap(map);
      })
      .catch(console.error);
  }, []);

  // Force visibility with inline styles - no CSS classes
  const containerStyle = {
    width: "100%",
    display: "block",
    visibility: "visible",
    opacity: 1,
    padding: "20px",
    marginTop: "20px",
    backgroundColor: "#ffffff",
    border: "2px solid #dee2e6",
    borderRadius: "8px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    display: "table",
    visibility: "visible",
    opacity: 1,
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
    backgroundColor: "#e9ecef",
    fontWeight: "bold",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #dee2e6",
    verticalAlign: "top",
  };

  if (outreachLog.length === 0) {
    return (
      <div style={containerStyle}>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            textAlign: "center",
            margin: 0,
          }}
        >
          📋 No outreach logged yet. Click "+ Log Action" on any mosque card to
          add your first entry.
        </p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ overflowX: "auto", display: "block" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Mosque</th>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Contact Time</th>
              <th style={thStyle}>Contacted Person</th>
              <th style={thStyle}>Notes</th>
              <th style={thStyle}>Result</th>
              <th style={thStyle}>User</th>
            </tr>
          </thead>
          <tbody>
            {outreachLog.map((entry) => (
              <tr key={entry.id}>
                <td style={tdStyle}>
                  <strong>
                    {mosquesMap[entry.mosque_id] ||
                      `Mosque #${entry.mosque_id}`}
                  </strong>
                </td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: "#e7f3ff",
                      fontSize: "14px",
                      display: "inline-block",
                    }}
                  >
                    {entry.method}
                  </span>
                </td>
                <td style={tdStyle}>
                  {new Date(entry.contacted_at).toLocaleString()}
                </td>
                <td style={tdStyle}>
                  <div>
                    <strong>{entry.contacted_person_name || "N/A"}</strong>
                  </div>
                  {entry.contacted_person_email && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "4px",
                      }}
                    >
                      ✉️ {entry.contacted_person_email}
                    </div>
                  )}
                  {entry.contacted_person_phone && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "4px",
                      }}
                    >
                      📞 {entry.contacted_person_phone}
                    </div>
                  )}
                </td>
                <td style={{ ...tdStyle, maxWidth: "250px" }}>
                  {entry.notes || "-"}
                </td>
                <td style={{ ...tdStyle, maxWidth: "250px" }}>
                  {entry.result || "-"}
                </td>
                <td style={tdStyle}>
                  {usersMap[entry.user_id] || `User #${entry.user_id}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
