"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Zap, Shield, Search, Briefcase, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { startupAPI, opportunityAPI } from "@/lib/api";
import { Startup, Opportunity } from "@/types";

export default function Home() {
  const [featuredStartups, setFeaturedStartups] = useState([]);
  const [featuredOpportunities, setFeaturedOpportunities] = useState([]);

  useEffect(() => {
    startupAPI.getAll({ limit: 3 }).then((res) => setFeaturedStartups(res.startups || [])).catch(() => {});
    opportunityAPI.getAll({ limit: 3 }).then((res) => setFeaturedOpportunities(res.opportunities || [])).catch(() => {});
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
  };

  return (
    <div>
      {/* Banner Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-transparent to-[#0ea5e9]/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] mb-6"
            >
              <Zap size={14} /> Build Your Dream Team Today
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Where{" "}
              <span className="gradient-text">Founders</span>{" "}
              Meet{" "}
              <span className="gradient-text">Builders</span>
            </h1>
            <p className="text-lg md:text-xl text-[#94a3b8] mb-8 max-w-2xl mx-auto">
              StartupForge connects visionary founders with talented developers, designers, and marketers to build the next generation of startups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?role=founder" className="btn-primary text-lg px-8 py-3">
                I&apos;m a Founder <ArrowRight size={18} className="inline ml-1" />
              </Link>
              <Link href="/register?role=collaborator" className="btn-secondary text-lg px-8 py-3">
                I&apos;m a Collaborator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Rocket, label: "Active Startups", value: "500+" },
            { icon: Users, label: "Talented Collaborators", value: "10,000+" },
            { icon: Briefcase, label: "Open Positions", value: "1,200+" },
            { icon: TrendingUp, label: "Success Rate", value: "85%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="card p-6 text-center"
            >
              <stat.icon className="mx-auto mb-3 text-[#6366f1]" size={28} />
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-[#94a3b8] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Startups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl font-bold">Featured Startups</h2>
            <p className="text-[#94a3b8] mt-2">Discover innovative startups looking for team members</p>
          </div>
          <Link href="/browse-startups" className="btn-secondary text-sm hidden sm:flex">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStartups.map((startup, i) => (
            <motion.div
              key={startup._id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="card p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white text-xl font-bold">
                  {startup.startup_name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{startup.startup_name}</h3>
                  <p className="text-sm text-[#94a3b8]">{startup.industry}</p>
                </div>
              </div>
              <p className="text-sm text-[#94a3b8] mb-4 line-clamp-2">{startup.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6366f1]">by {startup.founder_name}</span>
                <span className="text-[#94a3b8]">Team: {startup.team_size_needed}</span>
              </div>
            </motion.div>
          ))}
          {featuredStartups.length === 0 && (
            <p className="text-[#94a3b8] col-span-3 text-center py-10">No startups yet</p>
          )}
        </div>
        <div className="text-center mt-6 sm:hidden">
          <Link href="/browse-startups" className="btn-secondary text-sm">View All Startups</Link>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl font-bold">Featured Opportunities</h2>
            <p className="text-[#94a3b8] mt-2">Latest openings from innovative startups</p>
          </div>
          <Link href="/opportunities" className="btn-secondary text-sm hidden sm:flex">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp, i) => (
            <motion.div
              key={opp._id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white text-sm font-bold">
                  {opp.role_title?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{opp.role_title}</h3>
                  <p className="text-xs text-[#94a3b8]">{opp.startup_name}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {opp.required_skills?.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-1 text-xs rounded-md bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                <span className="capitalize">{opp.work_type}</span>
                <span>{new Date(opp.deadline).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
          {featuredOpportunities.length === 0 && (
            <p className="text-[#94a3b8] col-span-3 text-center py-10">No opportunities yet</p>
          )}
        </div>
        <div className="text-center mt-6 sm:hidden">
          <Link href="/opportunities" className="btn-secondary text-sm">View All Opportunities</Link>
        </div>
      </section>

      {/* Why Join */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Why Join StartupForge?</h2>
          <p className="text-[#94a3b8] mt-2">The best platform to build and grow your startup team</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: "Find Perfect Matches", desc: "Advanced matching algorithm connects you with the right talent or opportunity based on skills and preferences." },
            { icon: Shield, title: "Secure & Trusted", desc: "Verified profiles, secure messaging, and transparent review system ensure a safe collaboration environment." },
            { icon: Zap, title: "Fast & Efficient", desc: "Streamlined application process, real-time updates, and smart notifications keep you moving forward." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-5">
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-[#94a3b8]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 to-[#0ea5e9]/10" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-[#94a3b8] mb-8 max-w-xl mx-auto">Join thousands of founders and collaborators already building the future.</p>
            <Link href="/register" className="btn-primary text-lg px-10 py-3">
              Get Started Free
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
