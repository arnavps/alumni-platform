import { PageHeader } from "../../../components/layout/page-header";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

const mockReferrals = [
  {
    id: "1",
    company: "Acme Corp",
    role: "Software Engineer",
    status: "PENDING" as const,
    requester: "Jane Student",
  },
  {
    id: "2",
    company: "Globex",
    role: "Data Analyst",
    status: "APPROVED" as const,
    requester: "Rahul Kumar",
  },
  {
    id: "3",
    company: "Innotech",
    role: "Product Manager",
    status: "DECLINED" as const,
    requester: "Sara Ali",
  },
];

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Referrals"
        subtitle="Track referral requests, their status, and alumni responses."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockReferrals.map((ref) => (
          <Card key={ref.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {ref.role}
                </h3>
                <p className="text-xs text-slate-500">{ref.company}</p>
              </div>
              <Badge tone={ref.status === "APPROVED" ? "success" : ref.status === "PENDING" ? "warning" : "danger"}>
                {ref.status === "PENDING" && "Pending"}
                {ref.status === "APPROVED" && "Approved"}
                {ref.status === "DECLINED" && "Declined"}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">Requested by {ref.requester}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm">Approve</Button>
              <Button variant="secondary" size="sm">
                Provide guidance
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
