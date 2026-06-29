"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Zap, Shield, Search, Briefcase, TrendingUp, MapPin, Clock, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { startupAPI, opportunityAPI } from "@/lib/api";

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
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6366f1]">Discover</span>
            <h2 className="text-3xl font-bold mt-1">Featured Startups</h2>
            <p className="text-[#94a3b8] mt-2">Innovative startups looking for talented collaborators</p>
          </div>
          <Link href="/browse-startups" className="btn-secondary text-sm hidden sm:flex items-center gap-1.5">
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStartups.map((startup, i) => (
            <Link key={startup._id} href={`/startup/${startup._id}`}>
              <motion.div
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                className="card overflow-hidden group cursor-pointer hover:border-[#6366f1]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/5"
              >
                <div className="relative h-36 bg-gradient-to-br from-[#6366f1]/20 via-[#1e293b] to-[#0ea5e9]/20 overflow-hidden">
                  {startup.logo ? (
                    <img src={startup.logo} alt={startup.startup_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[#6366f1]/20">
                        {startup.startup_name?.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30 backdrop-blur-sm">
                      {startup.industry}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-[#6366f1] transition-colors">{startup.startup_name}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#334155] text-[#94a3b8] font-medium">{startup.funding_stage}</span>
                  </div>
                  <p className="text-sm text-[#94a3b8] leading-relaxed line-clamp-2 mb-4">{startup.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#334155]">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/60?u=${startup.founder_email}`}
                        alt={startup.founder_name}
                        className="w-7 h-7 rounded-full"
                      />
                      <span className="text-xs text-[#94a3b8]">{startup.founder_name}</span>
                    </div>
                    <span className="text-xs flex items-center gap-1 text-[#64748b]">
                      <Users size={12} /> {startup.team_size_needed} needed
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          {featuredStartups.length === 0 && (
            <div className="col-span-3 text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-[#1e293b] flex items-center justify-center mx-auto mb-4">
                <Rocket size={28} className="text-[#334155]" />
              </div>
              <p className="text-[#64748b]">No featured startups yet</p>
            </div>
          )}
        </div>
        <div className="text-center mt-8 sm:hidden">
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
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6366f1]">Latest Roles</span>
            <h2 className="text-3xl font-bold mt-1">Featured Opportunities</h2>
            <p className="text-[#94a3b8] mt-2">Top openings from innovative startups</p>
          </div>
          <Link href="/opportunities" className="btn-secondary text-sm hidden sm:flex items-center gap-1.5">
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp, i) => (
            <Link key={opp._id} href={`/opportunity/${opp._id}`}>
              <motion.div
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                className="card p-5 group cursor-pointer hover:border-[#6366f1]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#6366f1]/10">
                      {opp.role_title?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-[#6366f1] transition-colors">{opp.role_title}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <img
                          src={`https://i.pravatar.cc/40?u=${opp.startup_name}`}
                          alt={opp.startup_name}
                          className="w-4 h-4 rounded-full"
                        />
                        <p className="text-xs text-[#94a3b8]">{opp.startup_name}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6366f1]/10 text-[#a5b4fc] border border-[#6366f1]/20 font-medium">{opp.industry}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.required_skills?.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-[11px] rounded-md bg-[#1e293b] text-[#94a3b8] border border-[#334155]">
                      {skill}
                    </span>
                  ))}
                  {opp.required_skills?.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] rounded-md bg-[#1e293b] text-[#64748b] border border-[#334155]">+{opp.required_skills.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#334155]">
                  <div className="flex items-center gap-3 text-[#94a3b8]">
                    <span className="flex items-center gap-1 capitalize"><MapPin size={12} /> {opp.work_type}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(opp.deadline).toLocaleDateString()}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[#64748b] capitalize"><GraduationCap size={12} /> {opp.commitment_level}</span>
                </div>
              </motion.div>
            </Link>
          ))}
          {featuredOpportunities.length === 0 && (
            <div className="col-span-3 text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-[#1e293b] flex items-center justify-center mx-auto mb-4">
                <Briefcase size={28} className="text-[#334155]" />
              </div>
              <p className="text-[#64748b]">No featured opportunities yet</p>
            </div>
          )}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link href="/opportunities" className="btn-secondary text-sm">View All Opportunities</Link>
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Success Stories</h2>
          <p className="text-[#94a3b8] mt-2">Real teams, real results from our community</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { quote: "StartupForge connected me with our CTO within 2 weeks. We've since raised a $3M seed round and scaled to 15 people.", name: "Mia Zhang", role: "Founder, Aethon Labs", img: "https://i.pravatar.cc/100?img=47" },
            { quote: "I left my corporate job to join a startup I found here. Best career decision I've ever made — shipped a product used by 200k people.", name: "Carlos Mendez", role: "Lead Engineer, PulseAI", img: "https://i.pravatar.cc/100?img=12" },
            { quote: "We built our entire design team through StartupForge. The quality of collaborators here is genuinely unmatched.", name: "Aisha Brooks", role: "CEO, TerraForm", img: "https://i.pravatar.cc/100?img=32" },
          ].map((story, i) => (
            <motion.div
              key={story.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="card p-8 relative"
            >
              <div className="text-4xl text-[#6366f1]/20 absolute top-4 left-6">"</div>
              <p className="text-sm text-[#94a3b8] mb-6 relative z-10 leading-relaxed">{story.quote}</p>
              <div className="flex items-center gap-3">
                <img src={story.img} alt={story.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{story.name}</p>
                  <p className="text-xs text-[#64748b]">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
