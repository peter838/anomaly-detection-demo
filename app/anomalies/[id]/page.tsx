import { generateMockAnomalies } from '@/lib/mockData';
import AnomalyDetail from '@/components/AnomalyDetail';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function AnomalyDetailPage({ params }: { params: { id: string } }) {
  const anomalies = generateMockAnomalies();
  const anomaly = anomalies.find(a => a.id === params.id);

  if (!anomaly) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/anomalies"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Anomaly Details</h1>
              <p className="text-sm text-gray-500">{anomaly.id.slice(0, 8)}...</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnomalyDetail anomaly={anomaly} />
      </main>
    </div>
  );
}
