import React from "react";

export default function OutreachHistory({ outreachLog }) {
  if (!outreachLog || outreachLog.length === 0) return null;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
      }}
    >
      <h5 style={{ marginBottom: "15px", color: "#495057" }}>
        📋 Outreach History ({outreachLog.length})
      </h5>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e9ecef" }}>
              <th style={thStyle}>Date/Time</th>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Contact Person</th>
              <th style={thStyle}>Notes</th>
              <th style={thStyle}>Result</th>
            </tr>
          </thead>

          <tbody>
            {outreachLog.map((entry) => (
              <tr key={entry.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={tdStyle}>
                  {new Date(entry.contacted_at).toLocaleString()}
                </td>

                <td style={tdStyle}>
                  <span style={methodBadge}>{entry.method}</span>
                </td>

                <td style={tdStyle}>
                  <strong>{entry.contacted_person_name || "N/A"}</strong>
                  {entry.contacted_person_email && (
                    <div style={subText}>✉️ {entry.contacted_person_email}</div>
                  )}
                  {entry.contacted_person_phone && (
                    <div style={subText}>📞 {entry.contacted_person_phone}</div>
                  )}
                </td>

                <td style={{ ...tdStyle, maxWidth: "200px" }}>
                  {entry.notes || "-"}
                </td>

                <td style={{ ...tdStyle, maxWidth: "260px" }}>
                  <div>{entry.result || "-"}</div>

                  {entry.is_agreed == 1 && (
                    <div style={{ marginTop: "8px", color: "green" }}>
                      ✅ Agreed
                    </div>
                  )}

                  {entry.agreed_date && (
                    <div style={subText}>
                      📅 {new Date(entry.agreed_date).toLocaleDateString()}
                    </div>
                  )}

                  {entry.event_type && (
                    <div style={subText}>🕌 {entry.event_type}</div>
                  )}

                  {entry.event_khateeb && (
                    <div style={subText}>🎤 {entry.event_khateeb}</div>
                  )}

                  {entry.event_address && (
                    <div style={subText}>📍 {entry.event_address}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
};

const tdStyle = {
  padding: "10px",
  fontSize: "14px",
  verticalAlign: "top",
};

const subText = {
  fontSize: "12px",
  color: "#666",
  marginTop: "4px",
};

const methodBadge = {
  padding: "4px 8px",
  borderRadius: "4px",
  backgroundColor: "#e7f3ff",
  fontSize: "13px",
  display: "inline-block",
};
