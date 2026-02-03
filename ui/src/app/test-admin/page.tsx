'use client';

import React from 'react';
import { HumanReviewDashboard } from '@/components/common/HumanReviewDashboard';
import { PolicyAuthoringCanvas } from '@/components/common/PolicyAuthoringCanvas';
import { DraftQueueItem } from '@/components/common/DraftQueueTable';

export default function TestAdminPage() {
    const queueItems: DraftQueueItem[] = [
        {
            id: '1',
            applicant: 'Abebe Bikila',
            type: 'Trade License Renewal',
            submittedAt: '10 mins ago',
            riskScore: 15,
            status: 'pending'
        },
        {
            id: '2',
            applicant: 'Meselech Melkamu',
            type: 'New Business Registration',
            submittedAt: '2 hours ago',
            riskScore: 78,
            status: 'in_review'
        },
        {
            id: '3',
            applicant: 'Haile Gebrselassie',
            type: 'Event Permit',
            submittedAt: '1 day ago',
            riskScore: 45,
            status: 'approved'
        }
    ];

    const stats = {
        totalPending: 42,
        avgRiskScore: 34,
        processedToday: 128
    };

    return (
        <div className="min-h-screen bg-surface p-8 space-y-12">

            <section>
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Component Preview</h2>
                    <h1 className="text-2xl font-black text-slate-900">Human Review Dashboard</h1>
                </div>
                <HumanReviewDashboard
                    queueItems={queueItems}
                    stats={stats}
                    onReviewItem={(id) => console.log('Review', id)}
                />
            </section>

            <section>
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Component Preview</h2>
                    <h1 className="text-2xl font-black text-slate-900">Policy Authoring Canvas</h1>
                </div>
                <div className="h-[600px]">
                    <PolicyAuthoringCanvas
                        initialTitle="Risk Assessment Policy v1"
                        initialDescription="Rules for determining high-risk applications based on sector and location."
                    />
                </div>
            </section>

        </div>
    );
}
