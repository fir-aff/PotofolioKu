import Link from "next/link";

export const dynamic = "force-dynamic";

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  content: string;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
}

async function getFeaturedProjects(): Promise<Project[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${apiUrl}/api/projects?featured=true`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <div className="flex flex-col gap-16 py-12 sm:py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Hi, Saya Senior Fullstack Developer
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
          Membangun aplikasi web performa tinggi yang skalabel, aman, dan indah secara visual dengan arsitektur modern Headless CMS.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/projects"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
          >
            Lihat Portofolio
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white hover:underline"
          >
            Tentang Saya <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Highlight Karya & Proyek
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Semua Proyek <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="mt-8 text-center text-zinc-500 dark:text-zinc-400">
            Tidak ada proyek utama yang ditemukan.
          </div>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:shadow-2xl/40"
              >
                <div className="flex-1">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                    {project.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      <span className="absolute inset-0" />
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                    {project.short_description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-zinc-400 z-10">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                    Baca selengkapnya
                  </span>
                  <div className="flex gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-zinc-600 dark:hover:text-zinc-200"
                        title="GitHub Repository"
                      >
                        GitHub
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-zinc-600 dark:hover:text-zinc-200"
                        title="Live Demo"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
