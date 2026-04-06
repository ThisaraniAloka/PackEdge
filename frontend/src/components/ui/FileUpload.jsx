import React from 'react';

export default function FileUpload({ onFileSelect, accept = 'image/*' }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-600 transition"
    >
      <p className="text-gray-600">Drag & drop your file here or click to select</p>
      <input
        type="file"
        accept={accept}
        onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer text-green-600 font-semibold">
        Choose File
      </label>
    </div>
  );
}
