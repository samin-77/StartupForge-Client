"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Image as ImageIcon } from "lucide-react";

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-[#94a3b8] text-sm mt-2">Join StartupForge today</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#94a3b8] mb-1.5 block">Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field pl-10" placeholder="John Doe" required />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field pl-10" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1.5 block flex items-center gap-1.5"><ImageIcon size={14} /> Profile Image</label>
              {IMGBB_API_KEY ? (
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none">
                      <ImageIcon size={18} />
                    </div>
                    <label className={`input-field flex items-center gap-2 pl-10 cursor-pointer ${uploading ? 'opacity-60' : ''}`}>
                      <span className="text-sm text-[#64748b]">{form.image ? 'Change image' : 'Choose a file'}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                  {form.image && (
                    <img src={form.image} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-[#334155]" />
                  )}
                  {uploading && <span className="text-xs text-[#6366f1] whitespace-nowrap">Uploading...</span>}
                </div>
              ) : (
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                  <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field pl-10" placeholder="https://example.com/avatar.jpg" />
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field pl-10 pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-[#64748b] mt-1">Min 6 chars, 1 uppercase, 1 lowercase</p>
            </div>
            <div>
              <label className="text-sm text-[#94a3b8] mb-1.5 block">Role</label>
              <div className="grid grid-cols-2 gap-3">
                {["founder", "collaborator"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setForm({ ...form, role })}
                    className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                      form.role === role ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]" : "border-[#334155] text-[#94a3b8] hover:border-[#6366f1]"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">{loading ? "Creating Account..." : "Create Account"}</button>
          </form>
          <p className="text-center text-sm text-[#94a3b8] mt-6">
            Already have an account? <Link href="/login" className="text-[#6366f1] hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
