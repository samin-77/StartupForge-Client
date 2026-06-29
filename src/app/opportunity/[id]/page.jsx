"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { opportunityAPI, applicationAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/ui/Loading";

export default function OpportunityDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = params.id;
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState("");
  const [motivation, setMotivation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      opportunityAPI.getById(id).then((res) => setOpportunity(res)).catch(() => {}).finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    if (user.role !== "collaborator") {
      toast.error("Only collaborators can apply");
      return;
    }
    setSubmitting(true);
    try {
      await applicationAPI.apply({
        opportunity_id: id,
        portfolio_link: portfolio,
        motivation,
      });
      toast.success("Application submitted!");
      router.push("/dashboard/collaborator/my-applications");
    } catch (err) {
      toast.error(err.message || "Application failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!opportunity) return <div className="text-center py-20 text-[#94a3b8]">Opportunity not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/opportunities" className="inline-flex items-center gap-1 text-sm text-[#94a3b8] hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Opportunities
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <div className="card p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {opportunity.role_title?.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{opportunity.role_title}</h1>
                <p className="text-[#6366f1]">{opportunity.startup_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-[#0f172a]">
              <div className="text-center">
                <Briefcase size={18} className="mx-auto mb-1 text-[#6366f1]" />
                <div className="text-sm font-semibold capitalize">{opportunity.commitment_level}</div>
                <div className="text-xs text-[#64748b]">Commitment</div>
              </div>
              <div className="text-center">
                <MapPin size={18} className="mx-auto mb-1 text-[#6366f1]" />
                <div className="text-sm font-semibold capitalize">{opportunity.work_type}</div>
                <div className="text-xs text-[#64748b]">Work Type</div>
              </div>
              <div className="text-center">
                <Clock size={18} className="mx-auto mb-1 text-[#6366f1]" />
                <div className="text-sm font-semibold">{new Date(opportunity.deadline).toLocaleDateString()}</div>
                <div className="text-xs text-[#64748b]">Deadline</div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {opportunity.required_skills?.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Industry</h2>
              <span className="px-3 py-1.5 text-sm rounded-lg bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20">
                {opportunity.industry}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Apply for this Role</h2>
            {user?.role === "collaborator" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-[#94a3b8] mb-1 block">Portfolio Link</label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="input-field"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#94a3b8] mb-1 block">Motivation Message</label>
                  <textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="input-field h-32 resize-none"
                    placeholder="Why are you a good fit?"
                    required
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
                  {submitting ? "Submitting..." : "Submit Application"} <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#94a3b8] text-sm mb-4">Login as a collaborator to apply</p>
                <Link href="/login" className="btn-primary text-sm">Login</Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
