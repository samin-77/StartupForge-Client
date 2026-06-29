"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/browse-startups", label: "Browse Startups" },
    ...(user?.role !== "founder" ? [{ href: "/opportunities", label: "Browse Opportunities" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">
              SF
            </div>
            <span className="text-xl font-bold gradient-text">StartupForge</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#94a3b8] hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#1e293b] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-white">{user.name}</span>
                      <ChevronDown size={14} className="text-[#94a3b8]" />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-[#334155] rounded-xl shadow-xl overflow-hidden"
                        >
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-[#94a3b8] hover:text-white hover:bg-[#334155] transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <LayoutDashboard size={16} /> Dashboard
                          </Link>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-[#94a3b8] hover:text-white hover:bg-[#334155] transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <User size={16} /> Profile
                          </Link>
                          <button
                            onClick={() => { setDropdownOpen(false); logout(); }}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-[#ef4444] hover:bg-[#334155] transition-colors w-full"
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                      Login
                    </Link>
                    <Link href="/register" className="btn-primary text-sm !py-2">
                      Get Started
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#334155]"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#94a3b8] hover:text-white transition-colors text-sm py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" className="block text-white text-sm py-2" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link href="/profile" className="block text-white text-sm py-2" onClick={() => setMobileOpen(false)}>Profile</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="block text-[#ef4444] text-sm py-2">Logout</button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link href="/login" className="btn-secondary text-sm !py-2 text-center flex-1" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link href="/register" className="btn-primary text-sm !py-2 text-center flex-1" onClick={() => setMobileOpen(false)}>Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
