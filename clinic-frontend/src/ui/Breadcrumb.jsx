import React from "react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-4">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`breadcrumb-item ${
              idx === items.length - 1 ? "active" : ""
            }`}
          >
            {idx === items.length - 1 ? (
              item.label
            ) : (
              <a href={item.link}>{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
