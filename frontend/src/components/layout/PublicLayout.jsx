import React from 'react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
