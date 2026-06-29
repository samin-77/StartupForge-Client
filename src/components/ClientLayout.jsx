"use client";

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile") || pathname?.startsWith("/payment");

  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: "#1e293b",
          color: "#f8fafc",
          border: "1px solid #334155",
        },
      }} />
      <Navbar />
      <main className={`flex-1 ${isDashboard ? '' : ''}`}>
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
}
