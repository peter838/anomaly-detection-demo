import { generateMockAnomalies } from '@/lib/mockData';
import AnomalyList from '@/components/AnomalyList';
import { ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';

export default function AnomaliesPage() {
  const anomalies = generateMockAnomalies();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Anomalies</h1>
                <p className="text-sm text-gray-500">{anomalies.length} total</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter: All ▼
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnomalyList anomalies={anomalies} />
      </main>
    </div>
  );
}
