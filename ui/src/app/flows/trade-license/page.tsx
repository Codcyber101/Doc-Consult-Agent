'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TradeLicenseWizard = dynamic(
  () => import('./TradeLicenseWizardContent'),
  { ssr: false }
);

export default function TradeLicenseWizardPage() {
  return <TradeLicenseWizard />;
}