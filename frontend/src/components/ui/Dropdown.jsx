import React from 'react';

export default function Dropdown({ options, onSelect, placeholder = 'Select...' }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border rounded-lg bg-white text-left flex justify-between items-center"
      >
        {selected?.label || placeholder}
        <span className="text-gray-500">▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 border rounded-lg bg-white shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
