import Header from "./Header";
import Footer from "./Footer";

export default function Layout({
  children,
  user,
  onLogout,
  currentView,
  onNavigate,
}) {
  return (
    <div className="app-shell">
      {user && (
        <Header
          user={user}
          onLogout={onLogout}
          currentView={currentView}
          onNavigate={onNavigate}
        />
      )}
      <main className="app-content">{children}</main>
      {user && <Footer />}
    </div>
  );
}
