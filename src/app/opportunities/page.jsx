"use client";

import { useEffect, useState } from "react";
import { opportunityAPI } from "@/lib/api";
import { Opportunity } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Briefcase, MapPin, Clock, Filter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OpportunitiesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const workTypes = ["remote", "onsite", "hybrid"];
  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "AI/ML", "Blockchain", "Other"];

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 6 };
      if (search) params.search = search;
      if (workType) params.work_type = workType;
      if (industry) params.industry = industry;
      const res = await opportunityAPI.getAll(params);
      setOpportunities(res.opportunities || []);
      setTotalPages(res.totalPages || 1);
    } catch {
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [page, workType, industry]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchOpportunities();
  };

  const handleApply = (oppId) => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    if (user.role !== "collaborator") {
      toast.error("Only collaborators can apply");
      return;
    }
    router.push(`/opportunity/${oppId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Browse Opportunities</h1>
        <p className="text-[#94a3b8]">Find your next role in an innovative startup</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role or skills..."
            className="input-field pl-10"
          />
        </form>
        <select value={workType} onChange={(e) => { setWorkType(e.target.value); setPage(1); }} className="input-field md:w-40">
          <option value="">All Types</option>
          {workTypes.map((wt) => (
            <option key={wt} value={wt} className="capitalize">{wt}</option>
          ))}
        </select>
        <select value={industry} onChange={(e) => { setIndustry(e.target.value); setPage(1); }} className="input-field md:w-40">
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, i) => (
              <motion.div
                key={opp._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white text-lg font-bold">
                    {opp.role_title?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{opp.role_title}</h3>
                    <p className="text-sm text-[#6366f1]">{opp.startup_name}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {opp.required_skills?.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs rounded-md bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-4 text-xs text-[#64748b]">
                    <span className="flex items-center gap-1 capitalize"><Briefcase size={14} /> {opp.commitment_level}</span>
                    <span className="flex items-center gap-1 capitalize"><MapPin size={14} /> {opp.work_type}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {new Date(opp.deadline).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleApply(opp._id)}
                    className="btn-primary text-sm w-full flex items-center justify-center gap-1 mt-3"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
            {opportunities.length === 0 && (
              <p className="text-[#94a3b8] col-span-3 text-center py-20">No opportunities found</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    page === i + 1 ? "bg-[#6366f1] text-white" : "bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
