import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "../styles/DropdownSelect.css";

const DropdownSelect = ({ items = [], placeholder = "Chọn mục", onSelect }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setShowDropdown(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="dropdown-container">
      <Dropdown
        show={showDropdown}
        onToggle={(isOpen) => setShowDropdown(isOpen)}
      >
        <Dropdown.Toggle
          variant="light"
          id="custom-dropdown"
          className="dropdown-toggle"

        >
          {selectedItem || placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-menu custom-scroll"
          popperConfig={{
            modifiers: [{ name: "flip", enabled: false }],
          }}
        >
          {items.map((item, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleSelect(item)}
              className="dropdown-item"
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownSelect;