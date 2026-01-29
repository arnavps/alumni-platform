import { PageHeader } from "../../../components/layout/page-header";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

const mockMentors = [
  {
    id: "1",
    name: "Ananya Singh",
    role: "Senior Software Engineer at Acme Corp",
    availability: "Open to monthly sessions",
  },
  {
    id: "2",
    name: "Rohan Gupta",
    role: "Data Scientist at Globex",
    availability: "Limited weekend slots",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Product Manager at Innotech",
    availability: "Open to project-based mentorship",
  },
];

export default function MentorshipPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentorship"
        subtitle="Discover alumni mentors and request structured guidance."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockMentors.map((mentor) => (
          <Card key={mentor.id} className="flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{mentor.name}</h3>
              <p className="text-xs text-slate-500">{mentor.role}</p>
            </div>
            <Badge tone="success">{mentor.availability}</Badge>
            <div className="mt-2 flex justify-end">
              <Button size="sm">Request mentorship</Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
