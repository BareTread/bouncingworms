'use client';

import { Suspense } from 'react';
import EnhancedPortfolio2 from './EnhancedPortfolio2';

export default function ClientWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <EnhancedPortfolio2 />
    </Suspense>
  );
}
