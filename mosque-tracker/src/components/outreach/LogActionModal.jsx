import { useState } from "react";
import "../../assets/css/LogActionModal.css";

export default function LogActionModal({ onSave, onClose }) {
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    method: "phone",
    notes: "",
    result: "",
    contacted_person_name: "",
    contacted_person_phone: "",
    contacted_person_email: "",
    is_agreed: false,
    agreed_date: "",
    event_type: "",
    event_khateeb: "",
    event_address: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      method: formData.method,
      contacted_person_name: formData.contacted_person_name,
      contacted_person_phone: formData.contacted_person_phone,
      contacted_person_email: formData.contacted_person_email,
      notes: formData.notes,
      result: formData.result,
      is_agreed: formData.is_agreed ? 1 : 0,
      agreed_date: formData.agreed_date || null,
      event_type: formData.event_type || null,
      event_khateeb: formData.event_khateeb || null,
      event_address: formData.event_address || null,
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card" style={{ maxWidth: "750px" }}>
        <header className="modal-header">
          <h3>Log Outreach Action</h3>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="tabs-container">
          <nav className="tab-nav">
            <TabButton
              label="Outreach Details"
              active={activeTab === "details"}
              onClick={() => setActiveTab("details")}
            />
            <TabButton
              label="Result & Agreement"
              active={activeTab === "result"}
              onClick={() => setActiveTab("result")}
            />
          </nav>
          <div
            className="tab-indicator"
            style={{
              transform: `translateX(${activeTab === "details" ? "0" : "100%"})`,
            }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {activeTab === "details" ? (
              <OutreachDetails formData={formData} updateField={updateField} />
            ) : (
              <ResultAgreement formData={formData} updateField={updateField} />
            )}
          </div>

          <footer className="form-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Outreach Log
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

function OutreachDetails({ formData, updateField }) {
  return (
    <div className="form-grid">
      <div className="form-group">
        <label>📞 Contact Method</label>
        <select
          value={formData.method}
          onChange={(e) => updateField("method", e.target.value)}
          className="form-input"
        >
          <option value="phone">Phone Call</option>
          <option value="email">Email</option>
          <option value="visit">In-Person Visit</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="social">Social Media</option>
        </select>
      </div>

      <div className="form-group">
        <label>👤 Contact Person</label>
        <input
          value={formData.contacted_person_name}
          onChange={(e) => updateField("contacted_person_name", e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>📱 Contact Phone</label>
        <input
          value={formData.contacted_person_phone}
          onChange={(e) =>
            updateField("contacted_person_phone", e.target.value)
          }
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>✉️ Contact Email</label>
        <input
          type="email"
          value={formData.contacted_person_email}
          onChange={(e) =>
            updateField("contacted_person_email", e.target.value)
          }
          className="form-input"
        />
      </div>

      <div className="form-group full-width">
        <label>📝 Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="form-textarea"
          rows="2"
        />
      </div>
    </div>
  );
}

function ResultAgreement({ formData, updateField }) {
  return (
    <div className="form-grid">
      <div className="form-group full-width">
        <label>✅ Result</label>
        <textarea
          value={formData.result}
          onChange={(e) => updateField("result", e.target.value)}
          className="form-textarea"
          rows="2"
        />
      </div>

      <div className="form-group full-width">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="agreed-event"
            checked={formData.is_agreed}
            onChange={(e) => updateField("is_agreed", e.target.checked)}
          />
          <label htmlFor="agreed-event">Mark as Agreed Event</label>
        </div>

        {formData.is_agreed && (
          <div className="agreement-box">
            <AgreementDetails formData={formData} updateField={updateField} />
          </div>
        )}
      </div>
    </div>
  );
}

function AgreementDetails({ formData, updateField }) {
  return (
    <div className="form-grid">
      <div className="form-group">
        <label>📅 Agreed Date</label>
        <input
          type="date"
          value={formData.agreed_date}
          onChange={(e) => updateField("agreed_date", e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>🕌 Event Type</label>
        <select
          value={formData.event_type}
          onChange={(e) => updateField("event_type", e.target.value)}
          className="form-input"
        >
          <option value="">Select Event Type</option>
          <option value="Jummah">Jummah</option>
          <option value="Ramadan">Ramadan</option>
          <option value="Night Program">Night Program</option>
        </select>
      </div>

      <div className="form-group">
        <label>🎤 Khateeb</label>
        <input
          value={formData.event_khateeb}
          onChange={(e) => updateField("event_khateeb", e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>📍 Event Address</label>
        <input
          value={formData.event_address}
          onChange={(e) => updateField("event_address", e.target.value)}
          className="form-input"
        />
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tab-button ${active ? "active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}
