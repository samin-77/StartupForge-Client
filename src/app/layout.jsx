import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "StartupForge - Build Your Dream Team",
  description: "Connect founders with talented collaborators to build amazing startups",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0f172a]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
