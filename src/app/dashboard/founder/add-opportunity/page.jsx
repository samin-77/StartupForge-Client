"use client";

import { useState } from "react";
import { opportunityAPI, paymentAPI } from "@/lib/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AddOpportunity() {
  const router = useRouter();
  const [form, setForm] = useState({
    role_title: "",
    required_skills: "",
    work_type: "remote",
    commitment_level: "full-time",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPremium, setShowPremium] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await opportunityAPI.create({
        ...form,
        required_skills: form.required_skills.split(",").map((s) => s.trim()),
      });
      toast.success("Opportunity posted!");
      router.push("/dashboard/founder/manage-opportunities");
    } catch (err) {
      if (err.message?.includes("premium")) {
        setShowPremium(true);
      } else {
        toast.error(err.message || "Failed to create opportunity");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePremium = async () => {
    try {
      const res = await paymentAPI.createCheckout();
      window.location.href = res.url;
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Opportunity</h1>

      {showPremium && (
        <motion.div initial={{ opacity: 0, y: -10 }} className="card p-6 mb-6 border-[#f59e0b]">
          <div className="flex items-start gap-4">
            <Sparkles size={24} className="text-[#f59e0b] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Premium Feature</h3>
              <p className="text-sm text-[#94a3b8] mb-4">You&apos;ve used your 3 free opportunities. Upgrade to Premium ($19.99) to post unlimited opportunities.</p>
              <button onClick={handlePremium} className="btn-primary">Get Premium</button>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-[#94a3b8] mb-1 block">Role Title</label>
            <input type="text" value={form.role_title} onChange={(e) => setForm({ ...form, role_title: e.target.value })} className="input-field" placeholder="e.g. Full Stack Developer" required />
          </div>
          <div>
            <label className="text-sm text-[#94a3b8] mb-1 block">Required Skills (comma separated)</label>
            <input type="text" value={form.required_skills} onChange={(e) => setForm({ ...form, required_skills: e.target.value })} className="input-field" placeholder="e.g. React, Node.js, MongoDB" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block">Work Type</label>
              <select value={form.work_type} onChange={(e) => setForm({ ...form, work_type: e.target.value })} className="input-field">
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block">Commitment Level</label>
              <select value={form.commitment_level} onChange={(e) => setForm({ ...form, commitment_level: e.target.value })} className="input-field">
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm text-[#94a3b8] mb-1 block">Application Deadline</label>
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-field" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Posting..." : "Post Opportunity"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
