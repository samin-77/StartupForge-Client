import Link from "next/link";

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
              <a href="https://www.facebook.com/ishfak.mahbub.samin" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#94a3b8]"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/icepiper._.77/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#94a3b8]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/ishfak-samin-dev/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#94a3b8]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
