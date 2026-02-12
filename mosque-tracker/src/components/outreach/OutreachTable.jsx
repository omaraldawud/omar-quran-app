import { useState, useEffect } from "react";

export default function OutreachTable({ outreachLog = [] }) {
  const [usersMap, setUsersMap] = useState({});
  const [mosquesMap, setMosquesMap] = useState({});

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

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #dee2e6",
    verticalAlign: "top",
  };

  if (outreachLog.length === 0) {
    return <div>No outreach logged yet.</div>;
  }

  return (
    <div style={{ padding: "20px", marginTop: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Mosque</th>
            <th>User</th>
            <th>Method</th>
            <th>Contact Time</th>
            <th>Contacted Person</th>
            <th>Notes</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>
          {outreachLog.map((entry) => (
            <tr key={entry.id}>
              <td style={tdStyle}>
                {mosquesMap[entry.mosque_id] || `Mosque #${entry.mosque_id}`}
              </td>

              <td style={tdStyle}>
                {usersMap[entry.user_id] || `User #${entry.user_id}`}
              </td>

              <td style={tdStyle}>{entry.method}</td>

              <td style={tdStyle}>
                {new Date(entry.contacted_at).toLocaleString()}
              </td>

              <td style={tdStyle}>
                <strong>{entry.contacted_person_name || "N/A"}</strong>
              </td>

              <td style={tdStyle}>{entry.notes || "-"}</td>

              <td style={{ ...tdStyle, maxWidth: "260px" }}>
                <div>{entry.result || "-"}</div>

                {entry.is_agreed == 1 && (
                  <div style={{ marginTop: "6px", color: "green" }}>
                    ✅ Agreed
                  </div>
                )}

                {entry.agreed_date && (
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    📅 {new Date(entry.agreed_date).toLocaleDateString()}
                  </div>
                )}

                {entry.event_type && (
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    🕌 {entry.event_type}
                  </div>
                )}

                {entry.event_khateeb && (
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    🎤 {entry.event_khateeb}
                  </div>
                )}

                {entry.event_address && (
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    📍 {entry.event_address}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
