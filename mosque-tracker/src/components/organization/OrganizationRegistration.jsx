import { useState } from "react";
import { US_STATES } from "../../assets/ds/us_states";
import "../../assets/css/registration-form.css";

export default function OrganizationRegistration({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    // Organization Info
    name: "",
    type: "nonprofit",
    email: "",
    phone: "",
    website: "",

    // Address
    street: "",
    city: "",
    state: "",
    zip: "",

    // Mission & Description
    tagline: "",
    mission_statement: "",
    description: "",

    // Tax Info
    ein: "",
    tax_exempt_status: "501c3",

    // Admin User
    admin_name: "",
    admin_email: "",
    admin_phone: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Organization name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.type) newErrors.type = "Organization type is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Admin user validation
    if (!formData.admin_name.trim()) {
      newErrors.admin_name = "Admin name is required";
    }
    if (!formData.admin_email.trim()) {
      newErrors.admin_email = "Admin email is required";
    }
    if (formData.admin_email && !emailRegex.test(formData.admin_email)) {
      newErrors.admin_email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://hostitwise.net/qt/api/register_organization.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          result.error || "Registration failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="registration-success">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Registration Submitted!</h2>
          <p>
            Thank you for registering your organization. Your application has
            been submitted and is pending admin approval.
          </p>
          <p>
            You will receive an email notification once your organization has
            been approved. This typically takes 1-2 business days.
          </p>
          <div className="success-actions">
            <button onClick={onBackToLogin} className="btn-primary">
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1>Organization Registration</h1>
        <p>Register your organization to access the platform</p>
        <button onClick={onBackToLogin}>
          <span className="text-primary">← Back to Login</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {/* Organization Information */}
        <section className="form-section">
          <h3>Organization Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>
                Organization Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>
                Organization Type <span className="required">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={errors.type ? "error" : ""}
              >
                <option value="nonprofit">Non-Profit Organization</option>
                <option value="mosque">Mosque/Masjid</option>
                <option value="other">Other</option>
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
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
        </section>

        {/* Address */}
        <section className="form-section">
          <h3>Address</h3>

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
        </section>

        {/* Mission & Description */}
        <section className="form-section">
          <h3>Mission & Description</h3>

          <div className="form-group">
            <label>Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="A short, memorable phrase about your organization"
            />
          </div>

          <div className="form-group">
            <label>Mission Statement</label>
            <textarea
              name="mission_statement"
              value={formData.mission_statement}
              onChange={handleChange}
              rows="3"
              placeholder="Your organization's mission and purpose"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Detailed description of your organization and its work"
            />
          </div>
        </section>

        {/* Tax Information */}
        <section className="form-section">
          <h3>Tax Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>EIN (Employer Identification Number)</label>
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

        {/* Admin User */}
        <section className="form-section">
          <h3>Primary Administrator</h3>
          <p className="section-description">
            This person will be the main contact and administrator for your
            organization.
          </p>

          <div className="form-group">
            <label>
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="admin_name"
              value={formData.admin_name}
              onChange={handleChange}
              className={errors.admin_name ? "error" : ""}
            />
            {errors.admin_name && (
              <span className="error-text">{errors.admin_name}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="admin_email"
                value={formData.admin_email}
                onChange={handleChange}
                className={errors.admin_email ? "error" : ""}
              />
              {errors.admin_email && (
                <span className="error-text">{errors.admin_email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="admin_phone"
                value={formData.admin_phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
          <button type="button" onClick={onBackToLogin} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
