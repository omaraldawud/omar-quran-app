import { useState, useEffect } from "react";
import { US_STATES } from "../../assets/ds/us_states";
import "../../assets/css/organization-profile.css";

export default function OrganizationProfile({ organizationId }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "nonprofit",
    email: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    logo_url: "",
    tagline: "",
    mission_statement: "",
    description: "",
    talking_points: [],
    elevator_pitch: "",
    outreach_goals: "",
    brochure_url: "",
    presentation_url: "",
    donation_link: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
    linkedin_url: "",
    youtube_url: "",
    ein: "",
    tax_exempt_status: "",
    primary_color: "#28a745",
    secondary_color: "#007bff",
  });

  const [talkingPointInput, setTalkingPointInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("basic");

  useEffect(() => {
    fetchOrganizationData();
  }, [organizationId]);

  const fetchOrganizationData = async () => {
    try {
      const response = await fetch(
        `http://localhost/api/organization_profile.php?id=${organizationId}`,
      );
      const data = await response.json();

      if (response.ok) {
        setFormData({
          ...data,
          talking_points: data.talking_points || [],
        });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
      setMessage("Failed to load organization data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTalkingPoint = () => {
    if (talkingPointInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        talking_points: [...prev.talking_points, talkingPointInput.trim()],
      }));
      setTalkingPointInput("");
    }
  };

  const handleRemoveTalkingPoint = (index) => {
    setFormData((prev) => ({
      ...prev,
      talking_points: prev.talking_points.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost/api/organization_profile.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("❌ Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading organization profile...</div>;
  }

  return (
    <div className="org-profile-container">
      <div className="profile-header">
        <h1 className="primary_color">Organization Profile</h1>
        <p>Manage your organization's information and settings</p>
      </div>

      {message && (
        <div
          className={`message ${message.includes("❌") ? "error" : "success"}`}
        >
          {message}
        </div>
      )}

      <div className="profile-nav">
        <button
          className={activeSection === "basic" ? "active" : ""}
          onClick={() => setActiveSection("basic")}
        >
          Basic Info
        </button>
        <button
          className={activeSection === "mission" ? "active" : ""}
          onClick={() => setActiveSection("mission")}
        >
          Mission & Messaging
        </button>
        <button
          className={activeSection === "resources" ? "active" : ""}
          onClick={() => setActiveSection("resources")}
        >
          Resources & Links
        </button>
        <button
          className={activeSection === "social" ? "active" : ""}
          onClick={() => setActiveSection("social")}
        >
          Social Media
        </button>
        <button
          className={activeSection === "branding" ? "active" : ""}
          onClick={() => setActiveSection("branding")}
        >
          Branding
        </button>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Basic Information */}
        {activeSection === "basic" && (
          <section className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label>Organization Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Organization Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="nonprofit">Non-Profit Organization</option>
                  <option value="mosque">Mosque/Masjid</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {US_STATES.map((s) => (
                    <option key={s.abbreviation} value={s.abbreviation}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>EIN</label>
                <input
                  type="text"
                  name="ein"
                  value={formData.ein}
                  onChange={handleChange}
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div className="form-group">
                <label>Tax-Exempt Status</label>
                <select
                  name="tax_exempt_status"
                  value={formData.tax_exempt_status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="501c3">501(c)(3)</option>
                  <option value="other">Other</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* Mission & Messaging */}
        {activeSection === "mission" && (
          <section className="form-section">
            <h2>Mission & Messaging</h2>

            <div className="form-group">
              <label>Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="A short, memorable phrase"
              />
            </div>

            <div className="form-group">
              <label>Mission Statement</label>
              <textarea
                name="mission_statement"
                value={formData.mission_statement}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Elevator Pitch</label>
              <textarea
                name="elevator_pitch"
                value={formData.elevator_pitch}
                onChange={handleChange}
                rows="3"
                placeholder="A brief, compelling summary of your organization"
              />
            </div>

            <div className="form-group">
              <label>Talking Points</label>
              <div className="talking-points-input">
                <input
                  type="text"
                  value={talkingPointInput}
                  onChange={(e) => setTalkingPointInput(e.target.value)}
                  placeholder="Add a key talking point"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTalkingPoint();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTalkingPoint}
                  className="btn-add"
                >
                  Add
                </button>
              </div>
              <ul className="talking-points-list">
                {formData.talking_points.map((point, index) => (
                  <li key={index}>
                    {point}
                    <button
                      type="button"
                      onClick={() => handleRemoveTalkingPoint(index)}
                      className="btn-remove"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group">
              <label>Outreach Goals</label>
              <textarea
                name="outreach_goals"
                value={formData.outreach_goals}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </section>
        )}

        {/* Resources & Links */}
        {activeSection === "resources" && (
          <section className="form-section">
            <h2>Resources & Links</h2>

            <div className="form-group">
              <label>Brochure URL</label>
              <input
                type="url"
                name="brochure_url"
                value={formData.brochure_url}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>

            <div className="form-group">
              <label>Presentation URL</label>
              <input
                type="url"
                name="presentation_url"
                value={formData.presentation_url}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>

            <div className="form-group">
              <label>Donation Link</label>
              <input
                type="url"
                name="donation_link"
                value={formData.donation_link}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>
          </section>
        )}

        {/* Social Media */}
        {activeSection === "social" && (
          <section className="form-section">
            <h2>Social Media</h2>

            <div className="form-group">
              <label>📘 Facebook</label>
              <input
                type="url"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="form-group">
              <label>📷 Instagram</label>
              <input
                type="url"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="form-group">
              <label>🐦 Twitter</label>
              <input
                type="url"
                name="twitter_url"
                value={formData.twitter_url}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
              />
            </div>

            <div className="form-group">
              <label>💼 LinkedIn</label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <div className="form-group">
              <label>📺 YouTube</label>
              <input
                type="url"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
              />
            </div>
          </section>
        )}

        {/* Branding */}
        {activeSection === "branding" && (
          <section className="form-section">
            <h2>Branding</h2>

            <div className="form-group">
              <label>Logo URL</label>
              <input
                type="url"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
                placeholder="https://"
              />
              {formData.logo_url && (
                <div className="logo-preview">
                  <img src={formData.logo_url} alt="Organization Logo" />
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Primary Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={formData.primary_color}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        primary_color: e.target.value,
                      }))
                    }
                    placeholder="#28a745"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Secondary Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={formData.secondary_color}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        secondary_color: e.target.value,
                      }))
                    }
                    placeholder="#007bff"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? "Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
