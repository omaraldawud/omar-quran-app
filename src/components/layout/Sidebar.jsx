import "@/assets/css/layout.css";

export default function Sidebar({
  page,
  setPage,
  menuItems,
  juzList,
  juzNames,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section p-2">
        <h6 className="text-uppercase fw-bold">Juz</h6>

        <select
          className="form-select form-select-sm"
          onChange={(e) => setPage(`juz-${e.target.value}`)}
        >
          <option value="">Select Juz</option>

          {juzList?.map((juz) => (
            <option key={juz.id} value={juz.id}>
              {juzNames[juz.juz_number]} (Juz {juz.juz_number})
            </option>
          ))}
        </select>
      </div>

      {/* existing menu items remain unchanged */}
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
