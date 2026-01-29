import Link from "next/link";
import { PageHeader } from "../../../components/layout/page-header";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

const mockExperiences = [
  {
    id: "1",
    company: "Acme Corp",
    role: "Software Engineer",
    difficulty: "MEDIUM" as const,
    readTime: "7 min read",
  },
  {
    id: "2",
    company: "Globex",
    role: "Data Analyst",
    difficulty: "HARD" as const,
    readTime: "10 min read",
  },
  {
    id: "3",
    company: "Innotech",
    role: "Product Manager",
    difficulty: "EASY" as const,
    readTime: "5 min read",
  },
];

export default function InterviewExperiencesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interview Experiences"
        subtitle="Learn from alumni interview journeys across roles and companies."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockExperiences.map((exp) => (
          <Link key={exp.id} href={`/dashboard/interviews/${exp.id}`}>
            <Card className="flex flex-col gap-2 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {exp.role} at {exp.company}
                  </h3>
                  <p className="text-xs text-slate-500">{exp.readTime}</p>
                </div>
                <Badge tone={exp.difficulty === "HARD" ? "danger" : exp.difficulty === "MEDIUM" ? "warning" : "success"}>
                  {exp.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                Click to read the full interview experience.
              </p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
