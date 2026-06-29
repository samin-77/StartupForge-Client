"use client";

import { useEffect, useState } from "react";
import { opportunityAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { Briefcase, Users, CheckCircle, TrendingUp } from "lucide-react";

export default function FounderOverview() {
  const [stats, setStats] = useState({ totalOpportunities: 0, totalApplications: 0, acceptedMembers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    opportunityAPI.getStats().then((res) => setStats(res)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: Briefcase, label: "Total Opportunities", value: stats.totalOpportunities, color: "#6366f1" },
    { icon: Users, label: "Total Applications", value: stats.totalApplications, color: "#0ea5e9" },
    { icon: CheckCircle, label: "Accepted Members", value: stats.acceptedMembers, color: "#22c55e" },
    { icon: TrendingUp, label: "Success Rate", value: stats.totalApplications > 0 ? `${Math.round((stats.acceptedMembers / stats.totalApplications) * 100)}%` : "0%", color: "#f59e0b" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold">Founder Dashboard</h1>
        <p className="text-[#94a3b8] text-sm mt-1">Manage your startup and opportunities</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                  <card.icon size={24} style={{ color: card.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="text-sm text-[#94a3b8]">{card.label}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
