"use client";

import { useEffect, useState } from "react";
import { applicationAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, XCircle, Clock, User } from "lucide-react";

export default function CollaboratorOverview() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationAPI.getMy().then((res) => setApplications(res || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const cards = [
    { icon: Briefcase, label: "Total Applications", value: stats.total, color: "#6366f1" },
    { icon: Clock, label: "Pending", value: stats.pending, color: "#f59e0b" },
    { icon: CheckCircle, label: "Accepted", value: stats.accepted, color: "#22c55e" },
    { icon: XCircle, label: "Rejected", value: stats.rejected, color: "#ef4444" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold">Collaborator Dashboard</h1>
        <p className="text-[#94a3b8] text-sm mt-1">Track your applications and find opportunities</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${card.color}15` }}>
                  <card.icon size={24} style={{ color: card.color }} />
                </div>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="text-sm text-[#94a3b8]">{card.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-[#6366f1]" />
              <h2 className="text-lg font-semibold">Profile Summary</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-[#64748b]">Name:</span>
                <p className="text-white">{user?.name}</p>
              </div>
              <div>
                <span className="text-[#64748b]">Email:</span>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <span className="text-[#64748b]">Role:</span>
                <p className="text-white capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
