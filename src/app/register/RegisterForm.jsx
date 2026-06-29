"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Image as ImageIcon, Rocket, Users, Upload } from "lucide-react";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "collaborator";

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    role: defaultRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!IMGBB_API_KEY) { toast.error("Image upload requires imgbb API key"); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.data.url }));
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed");
      }
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(form.password)) {
      toast.error("Password must be 6+ chars with upper & lowercase");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#0ea5e9]/5" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#6366f1]/20"
          >
            <Users size={28} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-[#94a3b8] text-sm mt-1">Join StartupForge and start building</p>
        </div>

        <div className="card p-6 sm:p-8 border border-[#334155]/60">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#94a3b8] tracking-wide uppercase mb-2 block">I want to join as</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "founder", label: "Founder", icon: Rocket, desc: "Post opportunities" },
                  { value: "collaborator", label: "Collaborator", icon: Users, desc: "Find opportunities" },
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: role.value })}
                    className={`relative p-3 sm:p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      form.role === role.value
                        ? "border-[#6366f1] bg-[#6366f1]/10"
                        : "border-[#1e293b] bg-[#0f172a] hover:border-[#334155]"
                    }`}
                  >
                    <role.icon size={20} className={form.role === role.value ? "text-[#6366f1]" : "text-[#64748b]"} />
                    <p className={`text-sm font-semibold mt-1.5 ${form.role === role.value ? "text-[#6366f1]" : "text-white"}`}>{role.label}</p>
                    <p className="text-[10px] text-[#64748b] mt-0.5">{role.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1e293b]" /></div>
              <div className="relative flex justify-center"><span className="bg-[#0f172a] px-3 text-xs text-[#64748b]">Account Details</span></div>
            </div>

            <div className="space-y-3">
              <div className="relative group">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#6366f1] transition-colors" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field pl-10 py-2.5 text-sm bg-[#0f172a] border-[#1e293b] focus:border-[#6366f1]" placeholder="Full name" required />
              </div>
              <div className="relative group">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#6366f1] transition-colors" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field pl-10 py-2.5 text-sm bg-[#0f172a] border-[#1e293b] focus:border-[#6366f1]" placeholder="Email address" required />
              </div>
              <div className="relative group">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#6366f1] transition-colors" />
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field pl-10 pr-10 py-2.5 text-sm bg-[#0f172a] border-[#1e293b] focus:border-[#6366f1]" placeholder="Password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-[#64748b] mt-0.5">Min 6 characters, 1 uppercase & 1 lowercase letter</p>
            </div>

            <div>
              <label className="text-xs font-medium text-[#94a3b8] tracking-wide uppercase mb-2 block flex items-center gap-1.5"><ImageIcon size={12} /> Profile Image</label>
              {IMGBB_API_KEY ? (
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <label className="flex items-center gap-2.5 input-field py-2.5 cursor-pointer bg-[#0f172a] border-[#1e293b] border-dashed hover:border-[#6366f1]/50 transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                        <Upload size={14} className="text-[#6366f1]" />
                      </div>
                      <span className="text-xs text-[#64748b]">{form.image ? "Change photo" : "Upload photo"}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                  {form.image && <img src={form.image} alt="" className="w-10 h-10 rounded-xl object-cover border border-[#334155]" />}
                  {uploading && <span className="text-xs text-[#6366f1]">Uploading...</span>}
                </div>
              ) : (
                <div className="relative group">
                  <ImageIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#6366f1] transition-colors" />
                  <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field pl-10 py-2.5 text-sm bg-[#0f172a] border-[#1e293b] focus:border-[#6366f1]" placeholder="https://example.com/avatar.jpg" />
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm font-semibold mt-1">
              {loading ? (
                <span className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</span>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs text-[#64748b] mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-[#6366f1] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
