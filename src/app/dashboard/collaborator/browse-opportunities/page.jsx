"use client";

import { useEffect, useState } from "react";
import { opportunityAPI, applicationAPI } from "@/lib/api";
import { Opportunity } from "@/types";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CollaboratorBrowseOpportunities() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [applying, setApplying] = useState(null);
  const [showApply, setShowApply] = useState(null);
  const [portfolio, setPortfolio] = useState("");
  const [motivation, setMotivation] = useState("");

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

  useEffect(() => { fetchOpportunities(); }, [page, workType, industry]);

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchOpportunities(); };

  const handleApply = async (oppId) => {
    setApplying(oppId);
    try {
      await applicationAPI.apply({ opportunity_id: oppId, portfolio_link: portfolio, motivation });
      toast.success("Applied!");
      setShowApply(null);
      setPortfolio("");
      setMotivation("");
    } catch (err) {
      toast.error(err.message || "Failed to apply");
    } finally {
      setApplying(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Opportunities</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by role or skills..." className="input-field pl-10" />
        </form>
        <select value={workType} onChange={(e) => { setWorkType(e.target.value); setPage(1); }} className="input-field md:w-36">
          <option value="">All Types</option>
          {["remote", "onsite", "hybrid"].map((wt) => (<option key={wt} value={wt} className="capitalize">{wt}</option>))}
        </select>
        <select value={industry} onChange={(e) => { setIndustry(e.target.value); setPage(1); }} className="input-field md:w-44">
          <option value="">All Industries</option>
          {["Technology", "Healthcare", "Finance", "Education", "E-commerce", "AI/ML", "Blockchain", "Sustainability", "Design", "Marketing"].map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <motion.div key={opp._id} initial={{ opacity: 0, y: 10 }} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{opp.role_title}</h3>
                    <p className="text-sm text-[#6366f1]">{opp.startup_name}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {opp.required_skills?.slice(0, 4).map((s) => (
                    <span key={s} className="px-2 py-0.5 text-xs rounded bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">{s}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-xs text-[#64748b] mb-3">
                  <span className="flex items-center gap-1 capitalize"><Briefcase size={12} /> {opp.commitment_level}</span>
                  <span className="flex items-center gap-1 capitalize"><MapPin size={12} /> {opp.work_type}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {new Date(opp.deadline).toLocaleDateString()}</span>
                </div>

                {showApply === opp._id ? (
                  <div className="space-y-2 mt-3 pt-3 border-t border-[#334155]">
                    <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Portfolio URL" className="input-field text-sm" />
                    <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} placeholder="Why are you a good fit?" className="input-field text-sm h-20 resize-none" required />
                    <div className="flex gap-2">
                      <button onClick={() => handleApply(opp._id)} disabled={applying === opp._id} className="btn-primary text-sm !py-1.5 flex items-center gap-1">
                        {applying === opp._id ? "Applying..." : "Submit"} <Send size={14} />
                      </button>
                      <button onClick={() => setShowApply(null)} className="btn-secondary text-sm !py-1.5">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowApply(opp._id)} className="btn-primary text-sm w-full !py-2">Apply Now</button>
                )}
              </motion.div>
            ))}
            {opportunities.length === 0 && <p className="text-[#94a3b8] col-span-2 text-center py-20">No opportunities found</p>}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${page === i + 1 ? "bg-[#6366f1] text-white" : "bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155]"}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
