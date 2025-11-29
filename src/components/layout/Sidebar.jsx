import "@/assets/css/layout.css";

export default function Sidebar({ page, setPage, menuItems }) {
  return (
    <aside className="sidebar">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`sidebar-btn ${page === item.id ? "active" : ""}`}
          onClick={() => setPage(item.id)}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}
