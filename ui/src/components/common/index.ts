/**
 * GOVASSIST ETHIOPIA — COMPONENT LIBRARY
 * 
 * Re-exports all common components for convenient imports:
 * import { Button, Card, GlassCard } from '@/components/common';
 */

// ============================================================================
// ATOMIC COMPONENTS
// ============================================================================

export { Button, buttonVariants, buttonSizes } from './Button';
export { Badge, badgeVariants, badgeSizes } from './Badge';
export { Input } from './Input';
export { Card, CardHeader, CardBody, CardFooter, cardVariants } from './Card';
export { GlassCard, GlassCardLight, GlassCardMedium, GlassCardHeavy } from './GlassCard';
export {
    SkeletonLoader,
    SkeletonAvatar,
    SkeletonButton,
    SkeletonCard,
    SkeletonServiceTile,
    SkeletonActivityItem
} from './SkeletonLoader';
export { ToastProvider, useToast, useToastActions } from './Toast';
export {
    AnimatedCounter,
    CurrencyCounter,
    PercentCounter,
    HoursCounter,
    DaysCounter,
    StatDisplay
} from './AnimatedCounter';

// ============================================================================
// COMPOSITE COMPONENTS
// ============================================================================

export {
    WizardStepShell,
    WizardStepCentered,
    WizardStepForm,
    WizardStepFull
} from './WizardStepShell';
export { ReadinessScorePanel } from './ReadinessScorePanel';
export { ProcedureChecklistCard, ProcedureChecklist } from './ProcedureChecklistCard';
export { StatusTracker } from './StatusTracker';
export { ConsentScreen } from './ConsentScreen';
export { SyncStateIndicator, useSyncState } from './SyncStateIndicator';
export { LocalDraftsScreen } from './LocalDraftsScreen';
export { ConflictResolutionDialog } from './ConflictResolutionDialog';
export { PolicyAuthoringCanvas } from './PolicyAuthoringCanvas';
export { DraftQueueTable } from './DraftQueueTable';
export { HumanReviewDashboard } from './HumanReviewDashboard';

// ============================================================================
// EXISTING COMPONENTS
// ============================================================================

export { Navbar } from './Navbar';
export { ServiceTile } from './ServiceTile';
export { ProcessTimeline } from './ProcessTimeline';
export { WizardProgress } from './WizardProgress';
export { LanguageSwitcher } from './LanguageSwitcher';
export { SyncStatus } from './SyncStatus';
export { ActivityItem } from './ActivityItem';
