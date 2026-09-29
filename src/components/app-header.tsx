"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AppUser = {
  email: string;
  username: string | null;
  name: string | null;
};

type AppHeaderProps = {
  user: AppUser;
};

export function AppHeader({ user }: AppHeaderProps) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayName = user.name || user.username || user.email;

  const initial = displayName.charAt(0).toUpperCase();

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response) {
        throw new Error("Logout failed");
      }

      router.push("login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 px-5 md:px-8">
      <div className="flex w-full max-w-md items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
        <Search size={17} className="text-zinc-600" />

        <input
          type="text"
          placeholder="Search your knowledge..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
        />

        <kbd className="hidden rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-600 sm:block">
          ⌘ K
        </kbd>
      </div>

      <div className="ml-4 flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2.5 text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
        >
          <Bell size={18} />
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="User profile"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-medium transition hover:bg-zinc-700"
          >
            {initial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
              <div className="border-b border-zinc-800 px-3 py-2">
                <p className="truncate text-sm font-medium text-white">
                  {displayName}
                </p>

                <p className="truncate text-xs text-zinc-600">{user.email}</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white disabled:opacity-50"
              >
                <LogOut size={16} />

                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
