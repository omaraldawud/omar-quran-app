import { useState } from "react";
import "../assets/css/Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🕌 Mosque Outreach</h1>
          <p>Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="login-footer">
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
