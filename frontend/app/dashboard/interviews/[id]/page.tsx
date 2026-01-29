import { PageHeader } from "../../../../components/layout/page-header";
import { Card } from "../../../../components/ui/card";

export default function InterviewDetailPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Interview Experience: Software Engineer at Acme Corp"
                subtitle="Shared by a verified alumni mentor"
            />

            <Card className="prose prose-sm max-w-none text-slate-700">
                <p>
                    This is a sample interview experience detail page. In a production setup, this
                    would be populated from the backend using the interview experience ID.
                </p>
                <p>
                    Use this space to describe the overall process, rounds, key questions, and tips
                    for future candidates.
                </p>
                <ul>
                    <li>Round 1: Online coding assessment</li>
                    <li>Round 2: Data structures and algorithms</li>
                    <li>Round 3: System design</li>
                    <li>Round 4: Culture fit and behavioral</li>
                </ul>
                <p>
                    Keep the tone constructive, focused on learning, and aligned with the
                    university&apos;s guidance expectations.
                </p>
            </Card>
        </div>
    );
}
