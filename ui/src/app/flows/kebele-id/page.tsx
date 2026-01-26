'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const KebeleIDWizard = dynamic(
  () => import('./KebeleIDWizardContent'),
  { ssr: false }
);

export default function KebeleIDWizardPage() {
  return <KebeleIDWizard />;
}
