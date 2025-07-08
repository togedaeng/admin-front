import React, { useState, useRef, useEffect } from "react";

export function Dropdown({ value, onValueChange, children, className = "", ...props }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  let trigger, content;
  React.Children.forEach(children, child => {
    if (child?.type?.displayName === "DropdownTrigger") trigger = child;
    if (child?.type?.displayName === "DropdownContent") content = child;
  });

  const handleToggle = () => {
    console.log('드롭다운 토글:', !open);
    setOpen(!open);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`} {...props}>
      {trigger && React.cloneElement(trigger, { onClick: handleToggle })}
      {open && content && React.cloneElement(content, {
        currentValue: value,
        onValueChange,
        setOpen,
        isOpen: open
      })}
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

export function DropdownContent({ children, currentValue, onValueChange, setOpen, isOpen, ...props }) {
  console.log('DropdownContent 렌더링됨, isOpen:', isOpen);
  console.log('DropdownContent에 전달된 currentValue:', currentValue);

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg min-w-[140px]">
      {React.Children.map(children, child => {
        console.log('DropdownItem 렌더링:', child.props.value);
        return React.cloneElement(child, {
          currentValue,
          onValueChange,
          setOpen
        });
      })}
    </div>
  );
}
DropdownContent.displayName = "DropdownContent";

export function DropdownItem({ children, value: itemValue, onValueChange, setOpen, currentValue, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('DropdownItem 클릭됨:', itemValue);
    console.log('현재 드롭다운 currentValue:', currentValue);
    console.log('클릭된 itemValue:', itemValue);
    onValueChange(itemValue);
    setOpen(false);
  };

  return (
    <button
      type="button"
      className={`w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${currentValue === itemValue ? "font-bold text-blue-600 bg-blue-50" : "text-gray-700"
        }`}
      onClick={handleClick}
      data-value={itemValue}
      {...props}
    >
      {children}
    </button>
  );
}
DropdownItem.displayName = "DropdownItem"; 