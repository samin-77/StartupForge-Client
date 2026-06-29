export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" />
        <p className="text-[#94a3b8] text-sm">Loading...</p>
      </div>
    </div>
  );
}

export function Spinner() {
  return (
    <div className="w-6 h-6 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin" />
  );
}
