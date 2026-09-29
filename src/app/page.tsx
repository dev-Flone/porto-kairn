import { ArrowRight, Brain, Search, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Organize your knowledge",
    description:
      "Keep notes, ideas, projects, and everything you're learning in one place.",
  },
  {
    icon: Search,
    title: "Find anything instantly",
    description:
      "Search across your entire knowledge base without digging through folders.",
  },
  {
    icon: Zap,
    title: "Stay in flow",
    description:
      "Capture ideas quickly and turn them into organized knowledge.",
  },
  {
    icon: Shield,
    title: "Your data, your space",
    description:
      "A private workspace designed around your own knowledge and workflow.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-semibold tracking-tight">
          Kairn<span className="text-zinc-500">.</span>
        </div>

        <div className="hidden items-center gap-8 text-zinc-400 md:flex text-sm">
          <a href="#feature" className="transition hover:text-white">
            Feature
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
        </div>

        <button className="rounded-full border border-zinc-700 px-5 py-2 text-sm transition hover:bg-zinc-900">
          Sign in
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-28 pt-24 text-center md:pt-28">
        <div className="mb-6 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-400">
          Your knowledge. Your system.
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Build a second brain
          <span className="block text-zinc-500">that actually works.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Kairn helps you capture ideas, organize knowledge, manage projects,
          and turn what you learn into something useful.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-900">
            Get started
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button className="rounded-full border border-zinc-700 px-6 py-3 font-medium text-white transition hover:bg-zinc-900">
            Explore Kairn
          </button>
        </div>
      </section>

      {/* Preview */}
      <section className="mx-auto max-w-2xl px-6">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-4">
            <div className="h-3 w-3 rounded-full bg-zinc-700"></div>
            <div className="h-3 w-3 rounded-full bg-zinc-700"></div>
            <div className="h-3 w-3 rounded-full bg-zinc-700"></div>
          </div>

          <div className="grid min-h-[420px] grid-cols-[180px_1fr]">
            <aside className="border-r border-zinc-800 p-5">
              <div className="mb-8 text-sm font-semibold">Kairn</div>

              <div className="px-3 py-2">Dashboard</div>
              <div className="px-3 py-2">Notes</div>
              <div className="px-3 py-2">Projects</div>
              <div className="px-3 py-2">Tasks</div>
            </aside>

            <div className="p-8">
              <p className="text-sm text-zinc-500">Good evening</p>
              <h2 className="mt-2 text-3xl font-semibold">Welcome back</h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["128 Notes", "7 Projects", "24 Tasks"].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                  >
                    <div className="text-lg font-medium">{item}</div>
                    <div className="mt-2 text-sm text-zinc-500">
                      Update recently
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="text-sm font-medium">Recent notes</div>

                <div className="mt-5 space-y-4">
                  {[
                    "Understandding Javascript Event Loop",
                    "PostgreSQL Database Design",
                    "Discord Music Bot Architecture",
                  ].map((note) => (
                    <div
                      key={note}
                      className="border-b border-zinc-900 pb-4 text-sm text-zinc-400 last:border-0"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="feautre" className="mx-auto max-w-6xl px-6 py-32">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-zinc-500">FEATURES</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Everything you need to build your own knowledge system.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 transition hover:border-zinc-700"
              >
                <Icon size={22} className="text-zinc-300" />
                <h3 className="mt-6 text-lg font-medium">{feature.title}</h3>
                <p className="mt-3 leading-7 text-zinc-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-zinc-600">
          <span>© 2026 Kairn</span>
          <span>Build for curious minds.</span>
        </div>
      </footer>
    </main>
  );
}
