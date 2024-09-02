import React, { useState, useRef, useEffect } from 'react';

interface DropdownOptionProps {
    label: string,
    itemClick: () => void
}

interface DropdownProps {
  options: DropdownOptionProps[];
  label?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const dropdownClasses = `block ${className}`;

  return (
    <div ref={selectRef} className={dropdownClasses}>
      <div className="relative w-full inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-4 py-3 w-full ${isOpen ? "bg-semibrightgrey" : "bg-gray-100 rounded-md"} flex gap-4 rounded-2.5`}
        >
          <span className={`w-full text-sm font-bold focus:outline-none text-midgrey`}>{label}</span>
        </button>
        {isOpen && (
          <ul className="absolute top-full z-10 w-66 left-0 p-2.5 bg-gray-100 shadow-custom2 rounded-md mt-2 py-1 max-h-100 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.label}
                className="flex items-center gap-x-3.5 rounded-lg cursor-pointer px-4 py-2 text-midgrey font-semibold text-sm text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              >
                <span onClick={option.itemClick}>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
