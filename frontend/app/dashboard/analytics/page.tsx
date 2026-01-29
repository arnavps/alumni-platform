import { PageHeader } from "../../../components/layout/page-header";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="High-level engagement metrics across alumni, students, and opportunities."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs font-medium text-slate-500">Verified Alumni</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">128</p>
          <Badge tone="success" className="mt-2">
            Growing
          </Badge>
        </Card>
        <Card>
          <p className="text-xs font-medium text-slate-500">Active Opportunities</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">36</p>
          <Badge tone="neutral" className="mt-2">
            Stable
          </Badge>
        </Card>
        <Card>
          <p className="text-xs font-medium text-slate-500">Referral Success Ratio</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">42%</p>
          <Badge tone="warning" className="mt-2">
            Room to improve
          </Badge>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-xs font-medium text-slate-500">Student–Alumni Interactions</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Referrals</span>
              <span>60%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-3/5 rounded-full bg-primary" />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Mentorship sessions</span>
              <span>35%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-2/5 rounded-full bg-orange-300" />
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-medium text-slate-500">Popular Domains</p>
          <div className="mt-4 space-y-3 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>Software Engineering</span>
              <span>45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data &amp; AI</span>
              <span>30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Product &amp; Design</span>
              <span>15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Other</span>
              <span>10%</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
