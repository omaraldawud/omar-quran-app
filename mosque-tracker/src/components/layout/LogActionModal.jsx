import { useState } from "react";
import "../../assets/css/LogActionModal.css";

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
        <div className="modal-header">
          <h3>Log Outreach Action</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <div className="form-group">
                <label>
                  <span className="label-icon">📞</span>
                  Contact Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="method-select"
                >
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="visit">In-Person Visit</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="social">Social Media</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">👤</span>
                  Contact Person
                </label>
                <input
                  placeholder="Full name"
                  value={contacted_person_name}
                  onChange={(e) => setContactName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">📱</span>
                  Phone Number
                </label>
                <input
                  placeholder="+1 XXX XXX XXX"
                  value={contacted_person_phone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">✉️</span>
                  Email Address
                </label>
                <input
                  placeholder="person@example.com"
                  value={contacted_person_email}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="form-input"
                  type="email"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="form-group">
                <label>
                  <span className="label-icon">📝</span>
                  Conversation Notes
                </label>
                <textarea
                  placeholder="What was discussed during the outreach..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-textarea"
                  rows="5"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">✅</span>
                  Outcome / Next Steps
                </label>
                <textarea
                  placeholder="Result of contact and follow-up actions..."
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  className="form-textarea"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Outreach Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
