import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Categories' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e8e8e4] backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-7 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#639922] to-[#3B6D11] flex items-center justify-center text-white font-bold text-sm">
              PE
            </div>
            <span className="font-playfair font-bold text-lg text-[#1a1a1a] group-hover:text-[#639922] transition">
              PackEdge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-xs font-medium transition duration-200 pb-1 ${
                  isActive(link.path)
                    ? 'text-[#639922] font-semibold'
                    : 'text-[#555] hover:text-[#639922]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#639922] rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-medium text-[#3B6D11] hover:text-[#639922] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-xs font-medium bg-[#639922] text-white rounded-full hover:bg-[#3B6D11] transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <span className={`w-6 h-0.5 bg-[#1a1a1a] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#1a1a1a] transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#1a1a1a] transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 border-t border-[#e8e8e4] mt-4">
            <div className="flex flex-col gap-3 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-medium transition px-2 py-2 rounded ${
                    isActive(link.path)
                      ? 'text-[#639922] font-semibold bg-[#EAF3DE]'
                      : 'text-[#555] hover:text-[#639922]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-[#e8e8e4] pt-3 flex gap-2">
              <Link
                to="/login"
                className="flex-1 px-3 py-2 text-xs font-medium text-[#3B6D11] border border-[#639922] rounded-full text-center hover:bg-[#639922] hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 px-3 py-2 text-xs font-medium bg-[#639922] text-white rounded-full text-center hover:bg-[#3B6D11] transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
