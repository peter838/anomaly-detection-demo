import { Anomaly } from '@/lib/types';
import { getAnomalyTypeInfo, getSeverityBadge, formatTimeAgo, formatCurrency, formatPercentage } from '@/lib/mockData';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface AnomalyListProps {
  anomalies: Anomaly[];
  limit?: number;
}

export default function AnomalyList({ anomalies, limit }: AnomalyListProps) {
  const displayedAnomalies = limit ? anomalies.slice(0, limit) : anomalies;

  return (
    <div className="space-y-3">
      {displayedAnomalies.map((anomaly) => {
        const typeInfo = getAnomalyTypeInfo(anomaly.type);
        const severity = getSeverityBadge(anomaly.severity);

        return (
          <div
            key={anomaly.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{typeInfo.icon}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${severity.color}`}>
                    {severity.emoji} {severity.text}
                  </span>
                  <span className="text-xs text-gray-500">{formatTimeAgo(anomaly.detected_at)}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                  {anomaly.description}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {anomaly.data.supplier_email || anomaly.data.product_name || 'Unknown source'}
                </p>
              </div>
              <Link
                href={`/anomalies/${anomaly.id}`}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
