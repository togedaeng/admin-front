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
      {trigger && React.cloneElement(trigger, {
        onClick: (e) => {
          if (typeof trigger.props.onClick === 'function') trigger.props.onClick(e);
          setOpen(v => !v);
        },
        ref: triggerRef
      })}
      {open && content && React.cloneElement(content, { value, onValueChange, setOpen })}
    </div>
  );
}

const _DropdownTrigger = ({ children, onClick, ...props }, ref) => (
  <button
    type="button"
    onClick={() => {
        console.log("✅ DropdownTrigger 클릭됨");
        onClick();
      }}
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
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        // 반드시 Dropdown에서 받은 onValueChange를 넘겨야 함
        return React.cloneElement(child, { value, onValueChange, setOpen });
      })}
    </ul>
  );
}
DropdownContent.displayName = "DropdownContent";

export function DropdownItem({ children, value: itemValue, onValueChange, setOpen, value, ...props }) {
  const handleClick = () => {
    if (onValueChange) onValueChange(itemValue); // 부모의 setState 호출
    if (setOpen) setOpen(false);
  };

  return (
    <li
      className={`px-3 py-1 cursor-pointer hover:bg-[#e9e8e8] ${value === itemValue ? "text-black" : "text-black"}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  );
}
DropdownItem.displayName = "DropdownItem";
