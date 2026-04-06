import React from 'react';

export default function Settings() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Site Title</label>
          <input type="text" defaultValue="PackEdge" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Support Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save Settings
        </button>
      </div>
    </div>
  );
}
