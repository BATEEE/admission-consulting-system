import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/DataTable.css";
import { IoEllipsisVertical } from "react-icons/io5";

const DataTable = ({
  data,
  columns,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openIndex !== null &&
        dropdownRefs.current[openIndex] &&
        !dropdownRefs.current[openIndex].contains(event.target)
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openIndex]);

  return (
    <div className="container mt-4 p-4 rounded" style={{ maxWidth: "100%" }}>
      <table className="table align-middle">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ color: "#A6A6A6", borderBottom: "2px solid #ddd" }}>
                {col.header}
              </th>
            ))}
            <th style={{ color: "#A6A6A6", borderBottom: "2px solid #ddd" }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.email || idx} className="align-middle">
              {columns.map((col) => (
                <td key={col.key} style={{ color: "#424242", fontWeight: 500 }}>{col.render ? col.render(item) : item[col.key]}</td>
              ))}
              <td>
                <div
                  className="dropdown"
                  ref={(el) => (dropdownRefs.current[idx] = el)}
                >
                  <button
                    className="btn btn-link p-0"
                    type="button"
                    onClick={() => toggleDropdown(idx)}
                    style={{ fontSize: 20 }}
                  >
                    <IoEllipsisVertical size={20} />
                  </button>
                  <ul
                    className={`dropdown-menu${openIndex === idx ? " show" : ""}`}
                    style={{ minWidth: "100px" }}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          onEdit && onEdit(item);
                          setOpenIndex(null);
                        }}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => {
                          onDelete && onDelete(item);
                          setOpenIndex(null);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 2)}>
              &larr;
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(i)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage)}>
              &rarr;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;
