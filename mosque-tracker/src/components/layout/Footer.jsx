export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Mosque Outreach System</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/help">Help & Support</a>
        </div>
      </div>
    </footer>
  );
}
