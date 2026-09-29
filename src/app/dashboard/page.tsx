import { CheckSquare, FileText, FolderKanban, Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/prisma/db";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const displayName = user.name || user.username || user.email;

  const [userNotes, userProjects, userTasks] = await Promise.all([
    db.orm.public.Note.where({ userId: user.id }).all(),
    db.orm.public.Project.where({ userId: user.id }).all(),
    db.orm.public.Task.where({ userId: user.id }).all(),
  ]);

  const stats = [
    {
      title: "Notes",
      value: userNotes.length,
      change: "Total notes",
      icon: FileText,
    },
    {
      title: "Projects",
      value: userProjects.length,
      change: "Total projects",
      icon: FolderKanban,
    },
    {
      title: "Tasks",
      value: userTasks.length,
      change: `${
        userTasks.filter((task) => task.status === "DONE").length
      } completed`,
      icon: CheckSquare,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-zinc-600">Saturday, September 20</p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Good evening, {displayName}.
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Here's what's happening in your workspace.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          <Plus size={17} />
          New note
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{stat.title}</p>

                <Icon size={18} className="text-zinc-600" />
              </div>

              <p className="mt-4 text-3xl font-semibold">{stat.value}</p>

              <p className="mt-1 text-xs text-zinc-600">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <h2 className="font-medium">Recent notes</h2>

              <p className="mt-1 text-xs text-zinc-600">
                Your latest knowledge
              </p>
            </div>

            <button
              type="button"
              className="text-xs text-zinc-500 transition hover:text-white"
            >
              View all
            </button>
          </div>

          <div>
            {userNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                className="flex w-full items-center justify-between border-b border-zinc-900 px-5 py-4 text-left transition last:border-0 hover:bg-zinc-900"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                    <FileText size={16} className="text-zinc-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {note.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {note.content || "No Content"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <h2 className="font-medium">Today's tasks</h2>

              <p className="mt-1 text-xs text-zinc-600">Keep moving forward</p>
            </div>

            <CheckSquare size={17} className="text-zinc-600" />
          </div>

          <div className="space-y-1 p-3">
            {userTasks.map((task) => (
              <button
                key={task.id}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
              >
                <span
                  className={`h-4 w-4 rounded border ${
                    task.status === "DONE"
                      ? "border-zinc-500 bg-zinc-700"
                      : "border-zinc-700"
                  }`}
                />

                <span
                  className={
                    task.status === "DONE" ? "text-zinc-600 line-through" : ""
                  }
                >
                  {task.title}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-zinc-800 p-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 py-2 text-xs text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
            >
              <Plus size={14} />
              Add task
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
