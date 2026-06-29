"use client";

import { useEffect, useState } from "react";
import { applicationAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationAPI.getMy().then((res) => setApplications(res || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <div className="text-center py-20 text-[#94a3b8]">No applications yet. Start browsing opportunities!</div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, i) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{app.opportunity_role}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      app.status === "accepted" ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20" :
                      app.status === "rejected" ? "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20" :
                      "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"
                    }`}>{app.status === "accepted" ? <CheckCircle size={12} /> : app.status === "rejected" ? <XCircle size={12} /> : <Clock size={12} />}
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6366f1] mb-2">{app.startup_name}</p>
                  <p className="text-sm text-[#94a3b8] mb-2">{app.motivation}</p>
                  <div className="flex items-center gap-4 text-xs text-[#64748b]">
                    <span>Applied: {new Date(app.applied_at).toLocaleDateString()}</span>
                    {app.portfolio_link && (
                      <a href={app.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-[#0ea5e9] hover:underline flex items-center gap-1">
                        Portfolio <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
