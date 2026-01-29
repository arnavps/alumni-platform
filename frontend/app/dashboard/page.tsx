import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { PageHeader } from "../../components/layout/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        subtitle="High-level view of alumni engagement, opportunities, and interactions."
      />
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs font-medium text-slate-500">Active Opportunities</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">--</p>
          <Badge tone="success" className="mt-2">
            Good
          </Badge>
        </Card>
        <Card>
          <p className="text-xs font-medium text-slate-500">Student–Alumni Interactions</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">--</p>
          <Badge tone="warning" className="mt-2">
            Warning
          </Badge>
        </Card>
        <Card>
          <p className="text-xs font-medium text-slate-500">Referral Success Ratio</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">--</p>
          <Badge tone="neutral" className="mt-2">
            Neutral
          </Badge>
        </Card>
      </section>
    </div>
  );
}
