"use client";

import { useEffect, useState } from "react";
import { startupAPI } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Building2, Users } from "lucide-react";

export default function BrowseStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "AI/ML", "Blockchain", "Other"];

  const fetchStartups = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 6 };
      if (search) params.search = search;
      if (industry) params.industry = industry;
      const res = await startupAPI.getAll(params);
      setStartups(res.startups || []);
      setTotalPages(res.totalPages || 1);
    } catch {
      setStartups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, [page, industry]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStartups();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Browse Startups</h1>
        <p className="text-[#94a3b8]">Discover innovative startups looking for team members</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startups..."
            className="input-field pl-10"
          />
        </form>
        <select
          value={industry}
          onChange={(e) => { setIndustry(e.target.value); setPage(1); }}
          className="input-field md:w-48"
        >
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
            {startups.map((startup, i) => (
              <motion.div
                key={startup._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white text-xl font-bold">
                    {startup.startup_name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{startup.startup_name}</h3>
                    <p className="text-sm text-[#94a3b8]">{startup.industry}</p>
                  </div>
                </div>
                <p className="text-sm text-[#94a3b8] mb-4 line-clamp-2 flex-1">{startup.description}</p>
                <div className="flex items-center gap-4 text-sm text-[#64748b] mb-4">
                  <span className="flex items-center gap-1"><Building2 size={14} /> {startup.funding_stage}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {startup.team_size_needed} needed</span>
                </div>
                <Link
                  href={`/startup/${startup._id}`}
                  className="btn-secondary text-sm text-center flex items-center justify-center gap-1"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
            {startups.length === 0 && (
              <p className="text-[#94a3b8] col-span-3 text-center py-20">No startups found</p>
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
