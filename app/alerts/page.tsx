import { generateMockAnomalies } from '@/lib/mockData';
import AlertFeed from '@/components/AlertFeed';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AlertsPage() {
  const anomalies = generateMockAnomalies();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alerts Feed</h1>
              <p className="text-sm text-gray-500">Real-time anomaly alerts</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AlertFeed anomalies={anomalies} />
      </main>
    </div>
  );
}
