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

async function getProjects(category?: string): Promise<Project[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  try {
    const url = category
      ? `${apiUrl}/api/projects?category=${encodeURIComponent(category)}`
      : `${apiUrl}/api/projects`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || "";
  const projects = await getProjects(activeCategory);

  const categories = [
    { name: "Semua", value: "" },
    { name: "Web Dev", value: "Web Development" },
    { name: "UI/UX Design", value: "UI/UX Design" },
    { name: "Cybersecurity", value: "Cybersecurity" },
    { name: "Networking", value: "Networking" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Katalog Karya & Proyek
        </h1>
        <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
          Koleksi aplikasi, desain, dan dokumentasi teknis yang telah saya kerjakan.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 justify-center sm:justify-start border-b border-zinc-200 pb-5 dark:border-zinc-800">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <Link
              key={cat.name}
              href={cat.value ? `/projects?category=${encodeURIComponent(cat.value)}` : "/projects"}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="mt-16 text-center text-zinc-500 dark:text-zinc-400">
          Tidak ada proyek ditemukan dalam kategori ini.
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            >
              <div>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {project.category}
                </span>
                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-500 transition-colors">
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
                  Detail Proyek
                </span>
                <div className="flex gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-600 dark:hover:text-zinc-200"
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
    </div>
  );
}
