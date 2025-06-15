import React, { useState } from "react";
import './style.css';
import { text } from "stream/consumers";

interface DropdownProps {
  options: string[];
  optionColors?: string[];
  bgColors?: string[];
  textColors?: string[];
  placeholder?: string;
  onSelect?: (selected: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  optionColors = [],
  bgColors = [],
  textColors = [],
  placeholder = "Select an option",
  onSelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  const isPlaceholder = selected === placeholder;

  const selectedIndex = options.indexOf(selected);
  const selectedColor = optionColors[selectedIndex];
  const bgColor = bgColors[selectedIndex];
  const textColor = textColors[selectedIndex];

  return (
    <div className={`custom-dropdown-container ${className}`}>
      <div
  className="custom-dropdown-selected"
  onClick={toggleDropdown}
  style={{
    // color: "rgba(0, 0, 0, 0.85)",
    color: isPlaceholder ? "rgba(0, 0, 0, 0.8)" : `${selectedColor}`,
    // border: isPlaceholder ? "1px solid #ccc" : `2px solid ${selectedColor}`,
    // border: isPlaceholder ? "1px solid #ccc" : `1.5px solid ${borderColor}`,
    border: "0.5px solid rgba(0, 0, 0, 0.8)",
    // border: "1px solid rgba(0, 128, 75, 0.75)",
    // backgroundColor: isPlaceholder
    //   ? "white"
    //   // : "rgba(0, 128, 75, 0.024)",
    //   : `${bgColor}`,
    fontWeight: isPlaceholder ? "normal" : "600",
    fontSize: "0.9rem",
  }}
>
        {selected}
        <i
          className={`fa-chevron fa-solid fa-sm ${
            isOpen ? "fa-chevron-up" : "fa-chevron-down"
          }`}
          style={{ marginLeft: 8 }}
        />
      </div>

      {isOpen && (
        <div className="custom-dropdown-list-wrapper">
          {options.map((option, idx) => (
      <div key={option} className="custom-dropdown-list-item" onClick={() => handleSelect(option)}
            style={{
            // ["--hover-color" as any]: optionColors[idx] || "#f5f5f5",
            ["--hover-text-color" as any]: optionColors?.[idx] || "rgba(0, 0, 0, 0.8)",
            }}
      >
      <div className="custom-dropdown-list-text">{option}</div>
    </div>
    ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;