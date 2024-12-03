'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import EnhancedPortfolio2 with loading disabled
const EnhancedPortfolio2 = dynamic(
  () => import('./EnhancedPortfolio2').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-300 to-blue-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

export default function ClientWrapper() {
  return <EnhancedPortfolio2 />;
}
