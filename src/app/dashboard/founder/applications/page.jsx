"use client";

import { useEffect, useState } from "react";
import { applicationAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function FounderApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await applicationAPI.getFounder();
      setApplications(res || []);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await applicationAPI.updateStatus(id, status);
      toast.success(`Application ${status}!`);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Applications</h1>

      {applications.length === 0 ? (
        <div className="text-center py-20 text-[#94a3b8]">No applications yet</div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <motion.div key={app._id} initial={{ opacity: 0, y: 10 }} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{app.applicant_name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      app.status === "accepted" ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20" :
                      app.status === "rejected" ? "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20" :
                      "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"
                    }`}>{app.status === "accepted" ? <CheckCircle size={12} /> : app.status === "rejected" ? <XCircle size={12} /> : <Clock size={12} />}
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6366f1] mb-1">{app.opportunity_role} @ {app.startup_name}</p>
                  <p className="text-sm text-[#94a3b8] mb-2">{app.motivation}</p>
                  {app.portfolio_link && (
                    <a href={app.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0ea5e9] hover:underline">Portfolio</a>
                  )}
                  <p className="text-xs text-[#64748b] mt-2">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                </div>
                {app.status === "pending" && (
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleStatus(app._id, "accepted")} className="p-2 rounded-lg bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 transition-colors"><CheckCircle size={18} /></button>
                    <button onClick={() => handleStatus(app._id, "rejected")} className="p-2 rounded-lg bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors"><XCircle size={18} /></button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
