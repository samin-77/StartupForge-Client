"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { userAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { Save, User as UserIcon, Mail, BookOpen, Heart } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/ui/Loading";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

function ProfileContent() {
  const { user, refetchUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", skills: "", bio: "" });

  useEffect(() => {
    userAPI.getProfile().then((res) => {
      if (res) {
        setForm({
          name: res.name || "",
          image: res.image || "",
          skills: res.skills?.join(", ") || "",
          bio: res.bio || "",
        });
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await userAPI.updateProfile({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      toast.success("Profile updated!");
      refetchUser();
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold">
              {form.name?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{form.name || user?.name}</h2>
              <p className="text-sm text-[#94a3b8] capitalize">{user?.role}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block flex items-center gap-1"><UserIcon size={14} /> Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block flex items-center gap-1"><Mail size={14} /> Email</label>
              <input type="email" value={user?.email || ""} className="input-field" disabled />
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block flex items-center gap-1"><Heart size={14} /> Skills (comma separated)</label>
              <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="input-field" placeholder="React, Node.js, UI/UX" />
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1 block flex items-center gap-1"><BookOpen size={14} /> Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="input-field h-24 resize-none" placeholder="Tell us about yourself..." />
            </div>
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
