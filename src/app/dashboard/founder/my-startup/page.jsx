"use client";

import { useEffect, useState } from "react";
import { startupAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function MyStartup() {
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    startup_name: "", logo: "", industry: "", description: "", funding_stage: "", team_size_needed: 1,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    startupAPI.getMy().then((res) => {
      if (res) {
        setStartup(res);
        setForm({
          startup_name: res.startup_name || "",
          logo: res.logo || "",
          industry: res.industry || "",
          description: res.description || "",
          funding_stage: res.funding_stage || "",
          team_size_needed: res.team_size_needed || 1,
        });
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !IMGBB_API_KEY) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: fd });
    const data = await res.json();
    if (data.success) setForm((prev) => ({ ...prev, logo: data.data.url }));
    setUploading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await startupAPI.create(form);
      setStartup(res);
      toast.success("Startup created!");
    } catch (err) {
      toast.error(err.message || "Failed to create startup");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await startupAPI.update(form);
      setStartup(res);
      setEditing(false);
      toast.success("Startup updated!");
    } catch (err) {
      toast.error(err.message || "Failed to update");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete your startup?")) return;
    try {
      await startupAPI.delete();
      setStartup(null);
      toast.success("Startup deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>;

  if (!startup) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Create Your Startup</h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 max-w-2xl">
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Startup Name</label>
                <input type="text" value={form.startup_name} onChange={(e) => setForm({ ...form, startup_name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Industry</label>
                <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="input-field" required>
                  <option value="">Select industry</option>
                  {["Technology", "Healthcare", "Finance", "Education", "E-commerce", "AI/ML", "Blockchain", "Other"].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block">Logo {IMGBB_API_KEY ? "(upload)" : "(URL)"}</label>
              {IMGBB_API_KEY ? (
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="input-field" />
              ) : (
                <input type="text" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} className="input-field" placeholder="https://example.com/logo.png" />
              )}
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field h-24 resize-none" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Funding Stage</label>
                <select value={form.funding_stage} onChange={(e) => setForm({ ...form, funding_stage: e.target.value })} className="input-field" required>
                  <option value="">Select stage</option>
                  {["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Bootstrapped"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Team Size Needed</label>
                <input type="number" min="1" value={form.team_size_needed} onChange={(e) => setForm({ ...form, team_size_needed: Number(e.target.value) })} className="input-field" required />
              </div>
            </div>
            <button type="submit" className="btn-primary">Create Startup</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Startup</h1>
        <div className="flex gap-2">
          <button onClick={() => setEditing(!editing)} className="btn-secondary text-sm !py-2 flex items-center gap-1">
            {editing ? <X size={16} /> : <Edit2 size={16} />} {editing ? "Cancel" : "Edit"}
          </button>
          <button onClick={handleDelete} className="!py-2 px-4 rounded-xl bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 text-sm font-semibold hover:bg-[#ef4444]/20 transition-all flex items-center gap-1">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 max-w-2xl">
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Name</label>
                <input type="text" value={form.startup_name} onChange={(e) => setForm({ ...form, startup_name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Industry</label>
                <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="input-field" required>
                  {["Technology", "Healthcare", "Finance", "Education", "E-commerce", "AI/ML", "Blockchain", "Other"].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field h-24 resize-none" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Funding Stage</label>
                <select value={form.funding_stage} onChange={(e) => setForm({ ...form, funding_stage: e.target.value })} className="input-field">
                  {["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Bootstrapped"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-[#94a3b8] mb-1 block">Team Size</label>
                <input type="number" min="1" value={form.team_size_needed} onChange={(e) => setForm({ ...form, team_size_needed: Number(e.target.value) })} className="input-field" />
              </div>
            </div>
            <button type="submit" className="btn-primary flex items-center gap-1"><Save size={16} /> Save Changes</button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {startup.logo ? (
                <img src={startup.logo} alt={startup.startup_name} className="w-16 h-16 rounded-2xl object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold">
                  {startup.startup_name?.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">{startup.startup_name}</h2>
                <p className="text-[#6366f1]">{startup.industry}</p>
              </div>
            </div>
            <p className="text-[#94a3b8]">{startup.description}</p>
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#0f172a] text-center">
              <div><div className="font-semibold">{startup.funding_stage}</div><div className="text-xs text-[#64748b]">Stage</div></div>
              <div><div className="font-semibold">{startup.team_size_needed}</div><div className="text-xs text-[#64748b]">Team Needed</div></div>
              <div><div className="font-semibold capitalize">{startup.status}</div><div className="text-xs text-[#64748b]">Status</div></div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
