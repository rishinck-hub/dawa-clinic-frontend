import React from "react";

export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              <td>
                {onEdit && (
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(row)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
