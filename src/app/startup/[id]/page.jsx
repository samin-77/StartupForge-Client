"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { startupAPI, opportunityAPI } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Users, Calendar, MapPin, Clock } from "lucide-react";
import Loading from "@/components/ui/Loading";

export default function StartupDetails() {
  const params = useParams();
  const id = params.id;
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      startupAPI.getById(id).then((res) => setStartup(res)).catch(() => {}).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Loading />;
  if (!startup) return <div className="text-center py-20 text-[#94a3b8]">Startup not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/browse-startups" className="inline-flex items-center gap-1 text-sm text-[#94a3b8] hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Startups
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
            {startup.logo ? (
              <img src={startup.logo} alt={startup.startup_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full gradient-bg flex items-center justify-center text-white text-3xl font-bold">
                {startup.startup_name?.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{startup.startup_name}</h1>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">{startup.industry}</span>
              <span className="px-3 py-1 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20">{startup.funding_stage}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 rounded-xl bg-[#0f172a]">
          <div className="text-center">
            <Building2 size={20} className="mx-auto mb-1 text-[#6366f1]" />
            <div className="text-sm font-semibold">{startup.funding_stage}</div>
            <div className="text-xs text-[#64748b]">Funding Stage</div>
          </div>
          <div className="text-center">
            <Users size={20} className="mx-auto mb-1 text-[#6366f1]" />
            <div className="text-sm font-semibold">{startup.team_size_needed}</div>
            <div className="text-xs text-[#64748b]">Team Needed</div>
          </div>
          <div className="text-center">
            <Calendar size={20} className="mx-auto mb-1 text-[#6366f1]" />
            <div className="text-sm font-semibold">{new Date(startup.createdAt).toLocaleDateString()}</div>
            <div className="text-xs text-[#64748b]">Founded</div>
          </div>
          <div className="text-center">
            <Clock size={20} className="mx-auto mb-1 text-[#6366f1]" />
            <div className="text-sm font-semibold capitalize">{startup.status}</div>
            <div className="text-xs text-[#64748b]">Status</div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <p className="text-[#94a3b8] leading-relaxed">{startup.description}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-[#334155] flex items-center justify-between">
          <p className="text-sm text-[#94a3b8]">Founder: <span className="text-white">{startup.founder_name}</span></p>
          <Link href="/opportunities" className="btn-primary text-sm">View Opportunities</Link>
        </div>
      </motion.div>
    </div>
  );
}
