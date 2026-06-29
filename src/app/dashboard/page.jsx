"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "founder") router.replace("/dashboard/founder/overview");
      else if (user.role === "collaborator") router.replace("/dashboard/collaborator/overview");
      else if (user.role === "admin") router.replace("/dashboard/admin/overview");
    }
  }, [user, loading, router]);

  return null;
}
