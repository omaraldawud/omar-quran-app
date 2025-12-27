export default function SurahFilters({ filters, setFilters, juzList = [] }) {
  const resetFilters = () => {
    setFilters({
      type: "all",
      order: "default",
      verses: "all",
      juz: "all",
    });
  };

  const hasActiveFilters =
    filters.type !== "all" ||
    filters.order !== "default" ||
    filters.verses !== "all" ||
    filters.juz !== "all";

  return (
    <div className="surah-filters mb-4 p-3 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-success mb-0">Filter Surahs</h5>
        {hasActiveFilters && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={resetFilters}
          >
            <i className="bi bi-x-circle me-1"></i> Remove Filters
          </button>
        )}
      </div>

      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label fw-bold text-success">
            Revelation Type
          </label>
          <select
            className="form-select border-success"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="all">All Surahs</option>
            <option value="meccan">Meccan</option>
            <option value="medinan">Medinan</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold text-success">Sort By</label>
          <select
            className="form-select border-success"
            value={filters.order}
            onChange={(e) => setFilters({ ...filters, order: e.target.value })}
          >
            <option value="default">Default Order</option>
            <option value="revelation">Revelation Order</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold text-success">Length</label>
          <select
            className="form-select border-success"
            value={filters.verses}
            onChange={(e) => setFilters({ ...filters, verses: e.target.value })}
          >
            <option value="all">All Lengths</option>
            <option value="short">Short (1-50 verses)</option>
            <option value="medium">Medium (51-100 verses)</option>
            <option value="long">Long (100+ verses)</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold text-success">Juz</label>
          <select
            className="form-select border-success"
            value={filters.juz}
            onChange={(e) => setFilters({ ...filters, juz: e.target.value })}
          >
            <option value="all">All Juz</option>
            {juzList.map((j) => (
              <option key={j.index} value={j.index}>
                {j.index}. {j.start.name} - {j.end.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
