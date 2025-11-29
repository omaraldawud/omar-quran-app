export default function SurahFilter({ search, setSearch }) {
  return (
    <div>
      <div className="position-relative">
        <input
          type="text"
          className="form-control search-input fw-bolder py-3"
          placeholder="Search Surah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "2px solid #d4af37",
            borderRadius: "10px",
            fontSize: "1.1rem",
            paddingRight: "2.5rem",
            background: "white",
          }}
        />
        <i
          className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-warning fs-5"
          style={{ marginLeft: "-30px" }}
        ></i>
      </div>
    </div>
  );
}
