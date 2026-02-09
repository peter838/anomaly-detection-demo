import { generateMockAnomalies } from '@/lib/mockData';
import SeverityCard from '@/components/SeverityCard';
import AnomalyChart from '@/components/AnomalyChart';
import AnomalyList from '@/components/AnomalyList';
import { AlertCircle, Bell } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const anomalies = generateMockAnomalies();

  // Calculate stats
  const criticalCount = anomalies.filter(a => a.severity === 'critical').length;
  const highCount = anomalies.filter(a => a.severity === 'high').length;
  const mediumCount = anomalies.filter(a => a.severity === 'medium').length;

  // Calculate daily changes (mock)
  const criticalChange = 2;
  const highChange = 5;
  const mediumChange = 8;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Anomaly Detection</h1>
                <p className="text-sm text-gray-500">Monitor unusual patterns in RFQs and quotes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {criticalCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SeverityCard
              emoji="🔴"
              label="Critical"
              count={criticalCount}
              dailyChange={criticalChange}
              color="bg-red-500"
            />
            <SeverityCard
              emoji="🟡"
              label="High"
              count={highCount}
              dailyChange={highChange}
              color="bg-amber-500"
            />
            <SeverityCard
              emoji="🟢"
              label="Medium"
              count={mediumCount}
              dailyChange={mediumChange}
              color="bg-green-500"
            />
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Anomalies by Type (Last 30 Days)
            </h2>
            <AnomalyChart anomalies={anomalies} />
          </div>

          {/* Recent Anomalies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Anomalies
              </h2>
              <Link
                href="/anomalies"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <AnomalyList anomalies={anomalies} limit={5} />
          </div>
        </div>
      </main>
    </div>
  );
}
