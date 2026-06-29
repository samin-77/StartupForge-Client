"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      router.push("/dashboard");
      return;
    }
    paymentAPI.success(sessionId).then((res) => {
      setSuccess(res.success);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [sessionId, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-12 text-center max-w-md">
        {loading ? (
          <div className="w-12 h-12 border-2 border-[#334155] border-t-[#6366f1] rounded-full animate-spin mx-auto" />
        ) : success ? (
          <>
            <CheckCircle size={64} className="mx-auto text-[#22c55e] mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-[#94a3b8] mb-6">You now have access to premium features.</p>
            <Link href="/dashboard/founder/add-opportunity" className="btn-primary">Post Opportunity</Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">Payment Pending</h1>
            <p className="text-[#94a3b8] mb-6">Your payment is being processed.</p>
            <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
