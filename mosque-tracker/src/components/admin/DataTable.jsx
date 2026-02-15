import React, { useState, useMemo, useEffect } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
} from "react-icons/fa";

export default function DataTable({
  data = [],
  columns = [],
  actions = [],
  loading = false,
  emptyMessage = "No data available",
  processingId = null,
  pageSize = 10,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const comparison = aVal < bVal ? -1 : 1;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownClick = event.target.closest(".actions-dropdown");
      if (!isDropdownClick) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeDropdown]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="sort-icon" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="sort-icon active" />
    ) : (
      <FaSortDown className="sort-icon active" />
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderCell = (row, column) => {
    if (column.render) return column.render(row);
    return row[column.key] ?? "—";
  };

  const getVisibleActions = (row) =>
    actions.filter((action) =>
      action.condition ? action.condition(row) : true,
    );

  if (loading)
    return (
      <div className="data-table-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );

  if (data.length === 0)
    return (
      <div className="data-table-container">
        <div className="empty-state">
          <p>{emptyMessage}</p>
        </div>
      </div>
    );

  return (
    <div className="data-table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={column.sortable ? "sortable" : ""}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="th-content">
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="actions-column">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => {
              const visibleActions = getVisibleActions(row);
              const isProcessing = processingId === row.id;

              return (
                <tr
                  key={row.id || index}
                  className={isProcessing ? "processing" : ""}
                >
                  {columns.map((column) => (
                    <td key={column.key}>{renderCell(row, column)}</td>
                  ))}
                  {actions.length > 0 && (
                    <td className="actions-cell">
                      <div className="actions-dropdown">
                        <button
                          className="actions-trigger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(
                              activeDropdown === row.id ? null : row.id,
                            );
                          }}
                          disabled={isProcessing}
                        >
                          <FaEllipsisV />
                        </button>
                        {activeDropdown === row.id && (
                          <div className="dropdown-menu">
                            {visibleActions.map((action, idx) => {
                              // Resolve icon - call function if needed, otherwise use directly
                              const IconComponent = action.icon;

                              const label =
                                typeof action.label === "function"
                                  ? action.label(row)
                                  : action.label;

                              const color =
                                typeof action.color === "function"
                                  ? action.color(row)
                                  : action.color;

                              return (
                                <button
                                  key={idx}
                                  className="dropdown-item"
                                  style={{ color }}
                                  disabled={isProcessing}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(row);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {IconComponent && <IconComponent />} {label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="table-pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + pageSize, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>
          <div className="pagination-controls">
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page}>...</span>;
              }
              return null;
            })}
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
