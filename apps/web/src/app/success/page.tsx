import { Suspense } from 'react';
import SuccessContent from './success-content';

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white to-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="mb-6 text-6xl">⏳</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading...</h1>
            </div>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
