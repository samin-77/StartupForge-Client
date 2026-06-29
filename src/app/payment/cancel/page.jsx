import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card p-12 text-center max-w-md">
        <XCircle size={64} className="mx-auto text-[#ef4444] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-[#94a3b8] mb-6">Your payment was cancelled. No charges were made.</p>
        <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
      </div>
    </div>
  );
}
