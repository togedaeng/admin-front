import React, { useState, useRef, useEffect } from "react";

export function Dropdown({ value, onValueChange, children, className = "", ...props }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  let trigger, content;
  React.Children.forEach(children, child => {
    if (child?.type?.displayName === "DropdownTrigger") trigger = child;
    if (child?.type?.displayName === "DropdownContent") content = child;
  });

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      {trigger && React.cloneElement(trigger, { onClick: () => setOpen(v => !v), ref: triggerRef })}
      {open && content && React.cloneElement(content, { value, onValueChange, setOpen })}
    </div>
  );
}

const _DropdownTrigger = ({ children, onClick, ...props }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="flex items-center justify-center"
    {...props}
  >
    {children}
  </button>
);
export const DropdownTrigger = React.forwardRef(_DropdownTrigger);
DropdownTrigger.displayName = "DropdownTrigger";

export function DropdownContent({ children, value, onValueChange, setOpen, ...props }) {
  return (
    <ul
      className="absolute z-10 mt-1 w-28 bg-white border rounded shadow-lg"
      {...props}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, { value, onValueChange, setOpen })
      )}
    </ul>
  );
}
DropdownContent.displayName = "DropdownContent";

export function DropdownItem({ children, value: itemValue, onValueChange, setOpen, value, ...props }) {
  return (
    <li
      className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${value === itemValue ? "font-bold text-blue-600" : ""}`}
      onClick={() => {
        onValueChange(itemValue);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </li>
  );
}
DropdownItem.displayName = "DropdownItem"; 