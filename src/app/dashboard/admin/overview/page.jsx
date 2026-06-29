"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { Users, Building2, Briefcase, DollarSign } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStartups: 0, totalOpportunities: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getOverview().then((res) => setStats(res)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: Users, label: "Total Users", value: stats.totalUsers, color: "#6366f1" },
    { icon: Building2, label: "Total Startups", value: stats.totalStartups, color: "#0ea5e9" },
    { icon: Briefcase, label: "Total Opportunities", value: stats.totalOpportunities, color: "#22c55e" },
    { icon: DollarSign, label: "Total Revenue", value: `$${stats.totalRevenue}`, color: "#f59e0b" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-[#94a3b8] text-sm mt-1">Platform overview and management</p>
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
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${card.color}15` }}>
                <card.icon size={24} style={{ color: card.color }} />
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
