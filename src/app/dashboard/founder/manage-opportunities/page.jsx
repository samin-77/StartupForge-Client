"use client";

import { useEffect, useState } from "react";
import { opportunityAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { Edit2, Trash2, Save, X, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ManageOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchData = async () => {
    try {
      const res = await opportunityAPI.getMy();
      setOpportunities(res || []);
    } catch {
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const startEdit = (opp) => {
    setEditingId(opp._id);
    setEditForm({
      role_title: opp.role_title,
      required_skills: opp.required_skills.join(", "),
      work_type: opp.work_type,
      commitment_level: opp.commitment_level,
      deadline: opp.deadline.split("T")[0],
    });
  };

  const handleUpdate = async (id) => {
    try {
      await opportunityAPI.update(id, {
        ...editForm,
        required_skills: editForm.required_skills.split(",").map((s) => s.trim()),
      });
      toast.success("Updated!");
      setEditingId(null);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this opportunity?")) return;
    try {
      await opportunityAPI.delete(id);
      toast.success("Deleted!");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Opportunities</h1>
        <Link href="/dashboard/founder/add-opportunity" className="btn-primary text-sm !py-2 flex items-center gap-1">
          <Plus size={16} /> Add New
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-20 text-[#94a3b8]">No opportunities yet</div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <motion.div key={opp._id} initial={{ opacity: 0, y: 10 }} className="card p-6">
              {editingId === opp._id ? (
                <div className="space-y-3">
                  <input type="text" value={editForm.role_title} onChange={(e) => setEditForm({ ...editForm, role_title: e.target.value })} className="input-field" />
                  <input type="text" value={editForm.required_skills} onChange={(e) => setEditForm({ ...editForm, required_skills: e.target.value })} className="input-field" />
                  <div className="grid grid-cols-3 gap-3">
                    <select value={editForm.work_type} onChange={(e) => setEditForm({ ...editForm, work_type: e.target.value })} className="input-field">
                      <option value="remote">Remote</option>
                      <option value="onsite">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    <select value={editForm.commitment_level} onChange={(e) => setEditForm({ ...editForm, commitment_level: e.target.value })} className="input-field">
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                    </select>
                    <input type="date" value={editForm.deadline} onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })} className="input-field" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(opp._id)} className="btn-primary text-sm !py-2 flex items-center gap-1"><Save size={14} /> Save</button>
                    <button onClick={() => setEditingId(null)} className="btn-secondary text-sm !py-2 flex items-center gap-1"><X size={14} /> Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{opp.role_title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">{opp.startup_name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {opp.required_skills?.map((s) => (
                        <span key={s} className="px-2 py-0.5 text-xs rounded bg-[#334155] text-[#94a3b8]">{s}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 text-xs text-[#64748b]">
                      <span className="capitalize">{opp.work_type}</span>
                      <span className="capitalize">{opp.commitment_level}</span>
                      <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => startEdit(opp)} className="p-2 rounded-lg hover:bg-[#334155] text-[#94a3b8] transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(opp._id)} className="p-2 rounded-lg hover:bg-[#ef4444]/10 text-[#ef4444] transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
