import { useState, useRef, useEffect } from "react";
import "../../css/select.css";

const Select = ({ value, options = [], onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={ref}>
      <div className="custom-select-trigger" onClick={() => setOpen((o) => !o)}>
        {value}
        <span className="custom-select-arrow">▾</span>
      </div>

      {open && (
        <div className="custom-select-menu">
          {options.map((opt) => (
            <div
              key={opt}
              className={`custom-select-option ${
                opt === value ? "selected" : ""
              }`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
