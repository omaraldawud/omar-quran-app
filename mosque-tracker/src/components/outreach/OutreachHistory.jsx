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
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                Date/Time
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                Method
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                Contact Person
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                Notes
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {outreachLog.map((entry) => (
              <tr key={entry.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={{ padding: "10px", fontSize: "14px" }}>
                  {new Date(entry.contacted_at).toLocaleString()}
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: "#e7f3ff",
                      fontSize: "13px",
                      display: "inline-block",
                    }}
                  >
                    {entry.method}
                  </span>
                </td>
                <td style={{ padding: "10px", fontSize: "14px" }}>
                  <div>
                    <strong>{entry.contacted_person_name || "N/A"}</strong>
                  </div>
                  {entry.contacted_person_email && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "2px",
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
                        marginTop: "2px",
                      }}
                    >
                      📞 {entry.contacted_person_phone}
                    </div>
                  )}
                </td>
                <td
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    maxWidth: "200px",
                  }}
                >
                  {entry.notes || "-"}
                </td>
                <td
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    maxWidth: "200px",
                  }}
                >
                  {entry.result || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
