'use client';

import React, { useState } from 'react';
import { LocalDraftsScreen } from '@/components/common/LocalDraftsScreen';
import { ConflictResolutionDialog } from '@/components/common/ConflictResolutionDialog';
import { Button } from '@/components/common/Button';
import { useSyncState } from '@/components/common/SyncStateIndicator';
import { useToastActions } from '@/components/common/Toast';

export default function TestOfflinePage() {
    const [showConflict, setShowConflict] = useState(false);
    const sync = useSyncState();
    const toast = useToastActions();

    const drafts = [
        {
            id: '1',
            title: 'Trade License Renewal',
            type: 'Trade License',
            lastModified: '2 mins ago',
            progress: 45,
            hasConflict: true
        },
        {
            id: '2',
            title: 'New Kebele ID',
            type: 'Identity',
            lastModified: '2 days ago',
            progress: 90
        }
    ];

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Offline UX Verification</h1>

            <section className="space-y-4">
                <h2 className="text-xl font-bold">Sync State</h2>
                <div className="flex gap-4">
                    <Button onClick={sync.setSyncing}>Simulate Syncing</Button>
                    <Button onClick={sync.setSynced}>Simulate Online/Synced</Button>
                    <Button onClick={sync.setError} variant="destructive">Simulate Error</Button>
                    <Button onClick={sync.addToQueue} variant="secondary">Add to Queue ({sync.queueCount})</Button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold">Local Drafts Screen</h2>
                <div className="border p-4 rounded-xl bg-slate-50">
                    <LocalDraftsScreen
                        drafts={drafts}
                        onResumeDraft={(id) => toast.info(`Resume draft ${id}`)}
                        onDeleteDraft={(id) => toast.error(`Delete draft ${id}`)}
                        onSyncDraft={(id) => setShowConflict(true)}
                    />
                </div>
            </section>

            <ConflictResolutionDialog
                isOpen={showConflict}
                onClose={() => setShowConflict(false)}
                onResolve={(strategy) => {
                    toast.success(`Resolved using ${strategy} version`);
                    setShowConflict(false);
                }}
                localVersion={{
                    lastModified: 'Today, 10:30 AM',
                    description: 'Updated business address to Bole Subcity'
                }}
                remoteVersion={{
                    lastModified: 'Yesterday, 4:15 PM',
                    description: 'Original application submission',
                    author: 'System Admin'
                }}
            />
        </div>
    );
}
