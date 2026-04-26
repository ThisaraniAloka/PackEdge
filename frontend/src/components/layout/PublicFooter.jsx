import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Mission', path: '/about' },
      { label: 'Careers', path: '#' },
    ],
    products: [
      { label: 'All Categories', path: '/categories' },
      { label: 'Customer Reviews', path: '/reviews' },
      { label: 'Pricing', path: '#' },
    ],
    support: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQ', path: '#' },
      { label: 'Shipping Info', path: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
      { label: 'Cookie Policy', path: '#' },
    ],
  };

  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-7 md:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#639922] to-[#3B6D11] flex items-center justify-center text-white font-bold text-sm">
                PE
              </div>
              <span className="font-playfair font-bold text-lg text-white group-hover:text-[#97C459] transition">
                PackEdge
              </span>
            </Link>
            <p className="text-xs text-white text-opacity-60 leading-relaxed mb-4">
              Sustainable packaging solutions for eco-conscious businesses and individuals.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center text-white hover:bg-[#639922] transition"
              >
                f
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center text-white hover:bg-[#639922] transition"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center text-white hover:bg-[#639922] transition"
              >
                in
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-xs text-white text-opacity-60 hover:text-[#97C459] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-xs text-white text-opacity-60 hover:text-[#97C459] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-xs text-white text-opacity-60 hover:text-[#97C459] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.path}
                    className="text-xs text-white text-opacity-60 hover:text-[#97C459] transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-10"></div>

        {/* Bottom Bar */}
        <div className="py-8 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-white text-opacity-50">
            © {currentYear} Creative Packaging (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-white text-opacity-60 hover:text-[#97C459] transition">
              Privacy Policy
            </a>
            <span className="text-white text-opacity-20">•</span>
            <a href="#" className="text-xs text-white text-opacity-60 hover:text-[#97C459] transition">
              Terms of Service
            </a>
            <span className="text-white text-opacity-20">•</span>
            <a href="/contact" className="text-xs text-white text-opacity-60 hover:text-[#97C459] transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
