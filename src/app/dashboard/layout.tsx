import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <AppSidebar user={user} />

      <main className="min-w-0 flex-1">
        <AppHeader user={user} />

        {children}
      </main>
    </div>
  );
}
