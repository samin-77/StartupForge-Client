import Link from "next/link";

export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-4">
      <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="40" width="160" height="120" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
        <rect x="80" y="60" width="120" height="8" rx="4" fill="#6366f1"/>
        <rect x="80" y="76" width="80" height="6" rx="3" fill="#334155"/>
        <rect x="80" y="90" width="60" height="6" rx="3" fill="#334155"/>
        <circle cx="140" cy="130" r="20" fill="none" stroke="#334155" strokeWidth="2"/>
        <path d="M130 130L150 130" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
        <path d="M140 120L140 140" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
        <text x="140" y="110" textAnchor="middle" fill="#6366f1" fontSize="48" fontWeight="bold" fontFamily="monospace">404</text>
        <path d="M30 100L55 70" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M30 100L55 130" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M250 100L225 70" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M250 100L225 130" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      </svg>
      <p className="text-xl text-[#94a3b8] text-center">
        {message || "Page not found"}
      </p>
      <p className="text-sm text-[#64748b] text-center -mt-4">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back Home
      </Link>
    </div>
  );
}
