"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import {
  LayoutDashboard, Building2, Briefcase, FileText, Users, User, CreditCard, Menu, X, ShoppingBag,
  BarChart3, CheckSquare, LogOut, ChevronRight,
} from "lucide-react";

const founderLinks = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/founder/my-startup", label: "My Startup", icon: Building2 },
  { href: "/dashboard/founder/add-opportunity", label: "Add Opportunity", icon: Briefcase },
  { href: "/dashboard/founder/manage-opportunities", label: "Manage Opportunities", icon: FileText },
  { href: "/dashboard/founder/applications", label: "Applications", icon: Users },
];

const collaboratorLinks = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/collaborator/browse-opportunities", label: "Browse Opportunities", icon: Briefcase },
  { href: "/dashboard/collaborator/my-applications", label: "My Applications", icon: FileText },
  { href: "/profile", label: "Profile", icon: User },
];

const adminLinks = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: Users },
  { href: "/dashboard/admin/manage-startups", label: "Manage Startups", icon: Building2 },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: CreditCard },
];

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;
  if (!user) return null;

  const links = user.role === "founder" ? founderLinks : user.role === "admin" ? adminLinks : collaboratorLinks;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-16 lg:top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-[#1e293b] border-r border-[#334155] transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-[#334155]">
          <div className="flex items-center gap-3">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-[#94a3b8] capitalize">{user.role}</p>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-12rem)]">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20"
                    : "text-[#94a3b8] hover:text-white hover:bg-[#334155]"
                }`}
              >
                <link.icon size={18} />
                <span>{link.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
          <div className="border-t border-[#334155] my-3" />
          <Link
            href="/profile"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              pathname === "/profile"
                ? "bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20"
                : "text-[#94a3b8] hover:text-white hover:bg-[#334155]"
            }`}
          >
            <User size={18} /> Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-[#334155] bg-[#1e293b]">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-1">
            <Menu size={24} />
          </button>
          <h2 className="text-sm font-semibold capitalize">{user.role} Dashboard</h2>
        </div>
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
