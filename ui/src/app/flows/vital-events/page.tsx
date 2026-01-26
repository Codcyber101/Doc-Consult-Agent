'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const VitalEventsWizard = dynamic(
  () => import('./VitalEventsWizardContent'),
  { ssr: false }
);

export default function VitalEventsWizardPage() {
  return <VitalEventsWizard />;
}
