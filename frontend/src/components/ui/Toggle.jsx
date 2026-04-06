import React from 'react';

export default function Toggle({ checked, onChange, label }) {
  return (
    <div className="flex items-center gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition ${
          checked ? 'bg-green-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
