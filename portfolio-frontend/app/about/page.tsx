export const dynamic = "force-dynamic";

interface Skill {
  id: number;
  name: string;
  category: "Hard Skill" | "Soft Skill" | "Tools";
  icon_svg: string | null;
}

interface Experience {
  id: number;
  title_role: string;
  company_organization: string;
  start_date: string;
  end_date: string | null;
  description: string;
  type: "Pekerjaan" | "Organisasi" | "Asisten Lab";
}

async function getAboutData(): Promise<{ experiences: Experience[]; skills: Skill[] }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  try {
    const [expRes, skillRes] = await Promise.all([
      fetch(`${apiUrl}/api/experiences`, { cache: "no-store" }),
      fetch(`${apiUrl}/api/skills`, { cache: "no-store" }),
    ]);

    if (!expRes.ok || !skillRes.ok) {
      throw new Error("Failed to fetch data");
    }

    return {
      experiences: await expRes.json(),
      skills: await skillRes.json(),
    };
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return { experiences: [], skills: [] };
  }
}

function formatDate(dateStr: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
}

export default async function AboutPage() {
  const { experiences, skills } = await getAboutData();

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const skillCategories: Array<"Hard Skill" | "Soft Skill" | "Tools"> = [
    "Hard Skill",
    "Soft Skill",
    "Tools",
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Tentang Saya
        </h1>
        <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Sebagai Fullstack Developer, saya menyukai tantangan teknis dalam mengintegrasikan berbagai macam
          arsitektur modern untuk menghadirkan user experience yang efisien, handal, dan cepat.
        </p>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-3">
        {/* Timeline Pengalaman */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            Riwayat & Pengalaman
          </h2>

          {experiences.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">Belum ada riwayat pengalaman.</p>
          ) : (
            <div className="relative border-l border-zinc-200 pl-6 dark:border-zinc-800 space-y-12">
              {experiences.map((exp) => {
                // Determine color mapping for experience types
                const badgeColor =
                  exp.type === "Pekerjaan"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : exp.type === "Asisten Lab"
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400";

                return (
                  <div key={exp.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColor}`}>
                        {exp.type}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : "Sekarang"}
                      </span>
                    </div>

                    <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-white">
                      {exp.title_role}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {exp.company_organization}
                    </p>

                    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line leading-6">
                      {exp.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Keahlian / Skills */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 pb-3 dark:border-zinc-800">
            Keahlian & Tools
          </h2>

          <div className="space-y-10">
            {skillCategories.map((category) => {
              const categorySkills = skillsByCategory[category] || [];
              if (categorySkills.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    {category}s
                  </h3>
                  <div className="grid gap-4">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-white p-3 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/35"
                      >
                        {skill.icon_svg ? (
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-2"
                            dangerouslySetInnerHTML={{ __html: skill.icon_svg }}
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 font-bold text-xs dark:bg-zinc-800">
                            {skill.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
