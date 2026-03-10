import React from "react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {[...Array(totalPages)].map((_, idx) => (
          <li
            key={idx + 1}
            className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(idx + 1)}
            >
              {idx + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
