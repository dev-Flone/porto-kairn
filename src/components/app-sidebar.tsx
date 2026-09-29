"use client";

import {
  CheckSquare,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
} from "lucide-react";

type AppUser = {
  email: string;
  username: string | null;
  name: string | null;
};

type AppSidebarProps = {
  user: AppUser;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
];

export function AppSidebar({ user }: AppSidebarProps) {
  const displayName = user.name || user.username || user.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 md:flex md:flex-col">
      <div className="flex h-20 items-center px-6">
        <span className="text-xl font-semibold tracking-tight">
          Kairn<span className="text-zinc-600">.</span>
        </span>
      </div>

      <nav className="flex-1 px-4">
        <p className="px-3 pb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200"
              >
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </div>

        <p className="mt-10 px-3 pb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
          System
        </p>

        <a
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200"
        >
          <Settings size={18} />
          Settings
        </a>
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-medium">
            {initial}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{displayName}</p>

            <p className="truncate text-xs text-zinc-600">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
