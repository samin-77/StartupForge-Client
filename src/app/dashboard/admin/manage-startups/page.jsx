"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { CheckCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStartups = async () => {
    try {
      const res = await adminAPI.getStartups();
      setStartups(res || []);
    } catch {
      setStartups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStartups(); }, []);

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveStartup(id);
      toast.success("Startup approved!");
      fetchStartups();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemove = async (id) => {
    if (!confirm("Remove this startup?")) return;
    try {
      await adminAPI.removeStartup(id);
      toast.success("Startup removed!");
      fetchStartups();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Startups</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#334155]">
              <th className="text-left p-3 text-[#94a3b8] font-medium">Startup</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Founder</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Industry</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Status</th>
              <th className="text-right p-3 text-[#94a3b8] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {startups.map((s, i) => (
              <motion.tr
                key={s._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-[#334155] hover:bg-[#1e293b] transition-colors"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">
                      {s.startup_name?.charAt(0)}
                    </div>
                    <span className="font-medium">{s.startup_name}</span>
                  </div>
                </td>
                <td className="p-3 text-[#94a3b8]">{s.founder_name}</td>
                <td className="p-3 text-[#94a3b8]">{s.industry}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs capitalize ${
                    s.status === "approved" ? "bg-[#22c55e]/10 text-[#22c55e]" :
                    s.status === "rejected" ? "bg-[#ef4444]/10 text-[#ef4444]" :
                    "bg-[#f59e0b]/10 text-[#f59e0b]"
                  }`}>{s.status}</span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex gap-2 justify-end">
                    {s.status !== "approved" && (
                      <button onClick={() => handleApprove(s._id)} className="p-2 rounded-lg bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 transition-colors">
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button onClick={() => handleRemove(s._id)} className="p-2 rounded-lg bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
