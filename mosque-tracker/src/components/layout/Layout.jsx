import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, user, onLogout }) {
  return (
    <div className="app-shell">
      {user && <Header user={user} onLogout={onLogout} />}
      <main className="app-content">{children}</main>
      {user && <Footer />}
    </div>
  );
}
