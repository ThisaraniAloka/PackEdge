import React from 'react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const change = (p) => {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  return (
    <div className="flex gap-2 justify-center items-center mt-10">

      {/* Prev */}
      <button
        onClick={() => change(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-4 py-2 rounded-md border transition text-sm
          ${
            currentPage <= 1
              ? 'opacity-40 cursor-not-allowed pointer-events-none'
              : 'hover:bg-gray-100'
          }`}
      >
        ‹ Prev
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => change(p)}
          className={`px-4 py-2 rounded-md border text-sm transition min-w-[42px]
            ${
              p === currentPage
                ? 'bg-[#639922] text-white font-semibold shadow-md'
                : 'hover:bg-gray-100'
            }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => change(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded-md border transition text-sm
          ${
            currentPage >= totalPages
              ? 'opacity-40 cursor-not-allowed pointer-events-none'
              : 'hover:bg-gray-100'
          }`}
      >
        Next ›
      </button>
    </div>
  );
}
