import { useState } from "react";
import "../assets/css/LogActionModal.css";

export default function LogActionModal({ onSave, onClose }) {
  const [method, setMethod] = useState("phone");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [contacted_person_name, setContactName] = useState("");
  const [contacted_person_phone, setContactPhone] = useState("");
  const [contacted_person_email, setContactEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      method,
      contacted_person_name,
      contacted_person_phone,
      contacted_person_email,
      notes,
      result,
    });

    // reset form
    setMethod("phone");
    setNotes("");
    setResult("");
    setContactName("");
    setContactPhone("");
    setContactEmail("");
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
            🙋 Contact Person Name
            <input
              value={contacted_person_name}
              onChange={(e) => setContactName(e.target.value)}
            />
          </label>

          <label>
            🙋 Contact Person Phone
            <input
              value={contacted_person_phone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </label>

          <label>
            🙋 Contact Person Email
            <input
              value={contacted_person_email}
              onChange={(e) => setContactEmail(e.target.value)}
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
