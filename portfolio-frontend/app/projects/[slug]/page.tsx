import { notFound } from "next/navigation";
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

async function getProjectDetail(slug: string): Promise<Project | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${apiUrl}/api/projects/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch project");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching project detail:", error);
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProjectDetail(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          &larr; Kembali ke Proyek
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
          {project.category}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
          {project.short_description}
        </p>

        {/* Action Links */}
        <div className="mt-6 flex flex-wrap gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
            >
              GitHub Repository
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Demo Langsung
            </a>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="prose prose-zinc max-w-none dark:prose-invert mt-8">
        <div
          className="space-y-6 text-zinc-800 dark:text-zinc-200 leading-8"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </main>
    </article>
  );
}
