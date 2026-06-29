import Link from "next/link";

export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="text-8xl font-bold gradient-text">404</div>
      <p className="text-xl text-[#94a3b8] text-center">
        {message || "Page not found"}
      </p>
      <Link href="/" className="btn-primary">
        Back Home
      </Link>
    </div>
  );
}
