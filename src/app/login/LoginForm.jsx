"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn } from "lucide-react";

export default function LoginForm() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      await googleLogin(credentialResponse.credential);
      toast.success("Google login successful!");
      router.push("/dashboard");
    } catch {
      toast.error("Google login failed");
    } finally {
      setGoogleLoading(false);
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
            <LogIn size={28} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-[#94a3b8] text-sm mt-1">Sign in to continue to StartupForge</p>
        </div>

        <div className="card p-6 sm:p-8 border border-[#334155]/60">
          <div className="mb-5">
            <div className={`${googleLoading ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google login failed")}
                  theme="outline"
                  size="large"
                  shape="pill"
                  text="continue_with"
                />
              </div>
            </div>
          </div>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1e293b]" /></div>
            <div className="relative flex justify-center"><span className="bg-[#0f172a] px-3 text-xs text-[#64748b]">or sign in with email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative group">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#6366f1] transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10 py-2.5 text-sm bg-[#0f172a] border-[#1e293b] focus:border-[#6366f1]"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative group">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#6366f1] transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10 pr-10 py-2.5 text-sm bg-[#0f172a] border-[#1e293b] focus:border-[#6366f1]"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm font-semibold !mt-4 flex items-center justify-center gap-2">
              {loading ? (
                <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</span>
              ) : (
                <span className="flex items-center gap-2">Sign In <ArrowRight size={16} /></span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#64748b] mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#6366f1] font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
