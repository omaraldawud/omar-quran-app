import { useState } from "react";
import "../assets/css/LogActionModal.css"; // we’ll create this

export default function LogActionModal({ onSave, onClose }) {
  const [method, setMethod] = useState("phone");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [contact_name, setContactName] = useState("");
  const [clerk, setClerk] = useState("Sr. Fatima");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ method, contact_name, notes, result, clerk });
    setMethod("phone");
    setNotes("");
    setResult("");
    setClerk("");
    setContactName("");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h4>Log Outreach</h4>
        <form onSubmit={handleSubmit}>
          <label>
            Method
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="phone">📞 Phone</option>
              <option value="email">✉️ Email</option>
              <option value="visit">🏠 Visit</option>
              <option value="whatsapp">💬 WhatsApp</option>
              <option value="social">🌐 Social</option>
            </select>
          </label>

          <label>
            🙋 Contact Person
            <input
              value={contact_name}
              onChange={(e) => setContactName(e.target.value)}
            />
          </label>

          <label>
            📝 Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          <label>
            ✅ Result
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </label>

          <label>
            🙋 Action By
            <input value={clerk} onChange={(e) => setClerk(e.target.value)} />
          </label>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
