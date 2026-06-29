"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { User } from "@/types";
import { motion } from "framer-motion";
import { Shield, ShieldOff } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      setUsers(res || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggleBlock = async (id) => {
    try {
      await adminAPI.toggleBlock(id);
      toast.success("User status updated!");
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#334155]">
              <th className="text-left p-3 text-[#94a3b8] font-medium">User</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Email</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Role</th>
              <th className="text-left p-3 text-[#94a3b8] font-medium">Status</th>
              <th className="text-right p-3 text-[#94a3b8] font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-[#334155] hover:bg-[#1e293b] transition-colors"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="p-3 text-[#94a3b8]">{user.email}</td>
                <td className="p-3"><span className="capitalize px-2 py-0.5 rounded text-xs bg-[#6366f1]/10 text-[#6366f1]">{user.role}</span></td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${user.isBlocked ? "bg-[#ef4444]/10 text-[#ef4444]" : "bg-[#22c55e]/10 text-[#22c55e]"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleToggleBlock(user._id)}
                    className={`p-2 rounded-lg transition-colors ${user.isBlocked ? "bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20" : "bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20"}`}
                  >
                    {user.isBlocked ? <Shield size={16} /> : <ShieldOff size={16} />}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
