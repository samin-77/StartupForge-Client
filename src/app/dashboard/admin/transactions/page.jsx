"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { motion } from "framer-motion";

export default function Transactions() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getTransactions().then((res) => setPayments(res || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#334155]">
              <th className="text-left p-3 text-[#94a3b8] font-medium">User</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Email</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Amount</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Status</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-[#334155] hover:bg-[#1e293b] transition-colors"
              >
                <td className="p-3 font-medium">{p.user_name}</td>
                <td className="p-3 text-[#94a3b8]">{p.user_email}</td>
                <td className="p-3">${p.amount}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs capitalize ${
                    p.payment_status === "succeeded" ? "bg-[#22c55e]/10 text-[#22c55e]" :
                    p.payment_status === "failed" ? "bg-[#ef4444]/10 text-[#ef4444]" :
                    "bg-[#f59e0b]/10 text-[#f59e0b]"
                  }`}>{p.payment_status}</span>
                </td>
                <td className="p-3 text-[#94a3b8]">{new Date(p.paid_at).toLocaleDateString()}</td>
              </motion.tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={5} className="text-center p-10 text-[#94a3b8]">No transactions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
