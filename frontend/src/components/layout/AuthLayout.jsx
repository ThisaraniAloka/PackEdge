import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-green-800 items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">PackEdge</h1>
          <p className="text-xl text-green-100">Sustainable Packaging Solutions</p>
        </div>
      </div>
    </div>
  );
}
