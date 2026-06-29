import Link from "next/link";
import { Code2, AtSign, Globe, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e293b] border-t border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">
                SF
              </div>
              <span className="text-xl font-bold gradient-text">StartupForge</span>
            </Link>
            <p className="text-sm text-[#94a3b8]">
              Build your dream startup team. Connect with talented collaborators worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors">
                <Code2 size={18} className="text-[#94a3b8]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors">
                <AtSign size={18} className="text-[#94a3b8]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors">
                <Globe size={18} className="text-[#94a3b8]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors">
                <MessageCircle size={18} className="text-[#94a3b8]" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#94a3b8]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/browse-startups" className="hover:text-white transition-colors">Browse Startups</Link></li>
              <li><Link href="/opportunities" className="hover:text-white transition-colors">Opportunities</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For Founders</h3>
            <ul className="space-y-2 text-sm text-[#94a3b8]">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/founder/my-startup" className="hover:text-white transition-colors">My Startup</Link></li>
              <li><Link href="/dashboard/founder/add-opportunity" className="hover:text-white transition-colors">Post Opportunity</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-[#94a3b8]">
              <li>support@startupforge.com</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#334155] text-center text-sm text-[#64748b]">
          &copy; {new Date().getFullYear()} StartupForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
