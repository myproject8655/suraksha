"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="text-primary h-8 w-8" />
            <span className="text-xl font-bold text-primary">
              Cyber Suraksha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/resources"
              className="font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link href="/report">
              <Button className="btn-primary">Report Complaint</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/resources"
                className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/report"
                className="px-4 py-2 font-medium text-white bg-primary hover:bg-primary/90 rounded-md text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Report Complaint
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
