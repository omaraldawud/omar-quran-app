import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function UserDrawer({ user, organizations, mosques, onClose, onSave }) {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    role: "organization_admin",
    organization_id: "",
    associated_mosque_id: "",
    password: "",
    confirm_password: "",
    is_active: 1,
    email_verified: 0,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        user_name: user.user_name || "",
        user_email: user.user_email || "",
        user_phone: user.user_phone || "",
        role: user.role || "organization_admin",
        organization_id: user.organization_id || "",
        associated_mosque_id: user.associated_mosque_id || "",
        password: "", // Never pre-fill password
        confirm_password: "",
        is_active: user.is_active !== undefined ? user.is_active : 1,
        email_verified: user.email_verified !== undefined ? user.email_verified : 0,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Name is required";
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = "Invalid email format";
    }

    if (!formData.user_phone.trim()) {
      newErrors.user_phone = "Phone is required";
    }

    // Password validation (only for new users or if password is being changed)
    if (!user || formData.password) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
      }
    }

    // Role-specific validation
    if (formData.role === "organization_admin" && !formData.organization_id) {
      newErrors.organization_id = "Organization is required for organization admin";
    }

    if (formData.role === "mosque_admin" && !formData.associated_mosque_id) {
      newErrors.associated_mosque_id = "Mosque is required for mosque admin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);
    try {
      // Prepare data for submission
      const submitData = { ...formData };
      
      // Remove password fields if not being changed
      if (user && !formData.password) {
        delete submitData.password;
        delete submitData.confirm_password;
      }

      // Remove confirm_password as it's not needed in the backend
      delete submitData.confirm_password;

      // Convert IDs to null if empty
      if (!submitData.organization_id) submitData.organization_id = null;
      if (!submitData.associated_mosque_id) submitData.associated_mosque_id = null;

      await onSave(submitData);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
  };

  // Filter organizations and mosques based on role
  const roleRequiresOrganization = ["organization_admin"].includes(formData.role);
  const roleRequiresMosque = ["mosque_admin"].includes(formData.role);

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer drawer-medium">
        <div className="drawer-header">
          <h2>{user ? "Edit User" : "Create User"}</h2>
          <button className="drawer-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-content">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label htmlFor="user_name">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className={errors.user_name ? "error" : ""}
              />
              {errors.user_name && (
                <span className="error-message">{errors.user_name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="user_email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                className={errors.user_email ? "error" : ""}
              />
              {errors.user_email && (
                <span className="error-message">{errors.user_email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="user_phone">
                Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="user_phone"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                className={errors.user_phone ? "error" : ""}
              />
              {errors.user_phone && (
                <span className="error-message">{errors.user_phone}</span>
              )}
            </div>
          </div>

          {/* Role & Assignments */}
          <div className="form-section">
            <h3>Role & Assignments</h3>

            <div className="form-group">
              <label htmlFor="role">
                Role <span className="required">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="system_admin">System Admin</option>
                <option value="organization_admin">Organization Admin</option>
                <option value="mosque_admin">Mosque Admin</option>
              </select>
            </div>

            {roleRequiresOrganization && (
              <div className="form-group">
                <label htmlFor="organization_id">
                  Organization <span className="required">*</span>
                </label>
                <select
                  id="organization_id"
                  name="organization_id"
                  value={formData.organization_id}
                  onChange={handleChange}
                  className={errors.organization_id ? "error" : ""}
                >
                  <option value="">Select Organization</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
                {errors.organization_id && (
                  <span className="error-message">{errors.organization_id}</span>
                )}
              </div>
            )}

            {roleRequiresMosque && (
              <div className="form-group">
                <label htmlFor="associated_mosque_id">
                  Mosque <span className="required">*</span>
                </label>
                <select
                  id="associated_mosque_id"
                  name="associated_mosque_id"
                  value={formData.associated_mosque_id}
                  onChange={handleChange}
                  className={errors.associated_mosque_id ? "error" : ""}
                >
                  <option value="">Select Mosque</option>
                  {mosques.map((mosque) => (
                    <option key={mosque.id} value={mosque.id}>
                      {mosque.name} - {mosque.city}, {mosque.state}
                    </option>
                  ))}
                </select>
                {errors.associated_mosque_id && (
                  <span className="error-message">{errors.associated_mosque_id}</span>
                )}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="form-section">
            <h3>{user ? "Change Password (Optional)" : "Password"}</h3>

            <div className="form-group">
              <label htmlFor="password">
                Password {!user && <span className="required">*</span>}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder={user ? "Leave blank to keep current password" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">
                Confirm Password {!user && <span className="required">*</span>}
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className={errors.confirm_password ? "error" : ""}
              />
              {errors.confirm_password && (
                <span className="error-message">{errors.confirm_password}</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="form-section">
            <h3>Status</h3>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active === 1}
                onChange={handleChange}
              />
              <label htmlFor="is_active">Active User</label>
            </div>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="email_verified"
                name="email_verified"
                checked={formData.email_verified === 1}
                onChange={handleChange}
              />
              <label htmlFor="email_verified">Email Verified</label>
            </div>
          </div>

          <div className="drawer-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
